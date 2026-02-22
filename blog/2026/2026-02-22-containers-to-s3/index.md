---
slug: spa-site-containers-to-s3
title: Moving a SPA Site from Containers to S3
authors: johnathan
tags:
  - AWS
  - Kubernetes
  - S3
  - React
  - ChunkLoadError
  - Lazy Loading
  - SPA
---

Why a SPA site was moved from containers to S3.

This application is hosted in a containerized environment which suffers from 404 errors when loading assets, "ChunkLoadError" errors when lazy loading, and prevents us from fully rolling out lazy loading strategies (to speed up the loading of the application).


<!-- truncate -->

## Why Containers break the Application


The application is essentially a static site served by nginx, multiple containers run simultaneously to handle traffic and provide redundancy.

### 1. User visits a page during a deployment

**The Problem**: When a new version is deployed to the Kubernetes cluster, there is a window where a user can visit the site and request an asset that is no longer available in the new container.

```
    BROWSER                LOAD BALANCER                CONTAINER
       |                         |                          |
 (1) GET /  -------------------->|                          |
       |<--------------- [ Returns v1 HTML ] ---------------|
       |                         |                          |
       |                         |                (2) [ REDEPLOY v2 ]
       |                         |                (v1 files not available)
       |                         |                          |
 (3) GET /chunk.v1.js ---------->|                          |
       |                         |                          |
       |                         |               "I only have chunk.v2.js!"
 (4)   |<------------------ 404 ERROR ----------------------|
       |                         |                          |
 (5) Application crashes
```

**The Result**: The app hits a dead end. Since the v1 chunk is gone, the app crashes, and the user is forced to perform a hard refresh and attempt to load the application from scratch.


### 2. User initiates an lazy-loaded feature during a deployment

**The Problem**: When a user is mid-session and hits a lazy-loaded feature that fails, their state is often wiped upon the required hard-refresh.

```
  BROWSER                        LOAD BALANCER                   CONTAINER
     |                                 |                             |
  1. User loads page                   |                             |
     |                                 |                             |
     |                         RELEASE DEPLOYED                      |
     |                         v1 assets removed                     |
     |                                 |                             |
  2. User initiates action             |                             |
     |                                 |                             |
     |------ GET lazy-chunk.v1.js ---->|                             |
     |                                 |--- GET lazy-chunk.v2.js --->|
     |                                 |                             |
     |                                 |<--------- 404 ERROR --------|
     |<--------- 404 ERROR ------------|     ("Only have v2 files!") |
     |                                 |                             |
  3. LOAD FAILED                       |                             |
  Action Failed                        |                             |
```

**The Result**: The user's action fails, and they are forced to perform a hard refresh and attempt to load the application from scratch.

### Why this matters

This isn't just a technical annoyance; it's a UX blocker.

**Data Loss**: If a user is halfway through a workflow and hits a lazy-loaded route that fails, their state is often wiped upon the required hard-refresh.

**Scaling Inhibitor**: Because lazy loading is unreliable, massive, monolithic JavaScript bundles are shipped to ensure the user has everything upfront.

**Reliability**: Logging showed that this was hitting dozens of users per release, (and would grow linearly with visitor traffic).

## The Solution: S3 Additive Releases

The solution is an additive release strategy that treats assets as immutable and the index.html entry point as a version switch.

### The Strategy: Additive & Versioned
Instead of overwriting the entire bucket, treat the S3 bucket as a semi-permanent historical archive of application's versions.

**Immutable Assets**: All JS, CSS, and images are synced using the additive strategy. Don't delete old assets, only add new ones.  Fingerprinting assets with a unique hash ensures that updated assets do not overwrite old assets. If a user is on v1.0, their browser can still fetch v1.0 chunks even after v2.0 is live.

**The Versioned Entry Point**: Don't deploy to index.html at the root. Instead, upload to `/releases/<VERSION>/index.html`.

**Traefik as the Switchboard**: Use Traefik Middleware as a "routing pointer." To release, simply update the middleware to point to the new version’s specific index.html path. This also allows quick rollbacks to a previous version if needed.

### The Deployment Workflow
**CI Build (GitHub Actions)**: Compiles the React app and generates unique hashes for all chunks.

**S3 Sync**: Uploads assets to the environment bucket, placing the index.html into a version-specific folder.

**Release Sync**: Developers trigger an update to the Traefik Middleware configuration via GitOps.

**Instant Rollback**: If something breaks, rolling back is as simple as pointing the Traefik Middleware back to the previous version’s index.html path.

### The Result

1. Active users are not affected by deployments.
2. Lazy-loaded features are not affected by deployments.
3. Lazy-loading strategies can be rolled out.


### The "Cache-Control" Strategy
Moving to S3 means telling the browser (and CDN) how to cache files.

**Immutable Assets**: Since the JS/CSS files are fingerprinted (e.g., main.8f2d3.js), set a long-lived cache header: Cache-Control: public, max-age=31536000, immutable.

**The Entry Point**: Conversely, the index.html must never be cached, or the user will never request the new version.

### The "Cleanup" Problem
While S3 storage is cheap, it’s not free, and having 5,000 versions of an application will eventually add up.

Use S3 Lifecycle Rules or scheduled jobs to automatically delete files that are older than 30 days. This keeps the bucket clean while still giving users a massive window of safety during long sessions.

### Traefik configuration

**S3 Backend**: Uses a Kubernetes ExternalName service to route traffic directly to the AWS S3 regional endpoint.

**Ingress Routers**:
- Static Assets (/assets): High-priority routing. These are fetched directly. Since assets are fingerprinted, Traefik simply facilitates the pass-through.
- The SPA Entry Point (/): The lowest priority "catch-all" router. It ensures that any deep link (like /dashboard) doesn't return a 404 but instead serves the index.html.

**Switchboard Middleware**: Points the root path to a version-specific folder (e.g., /releases/v1.0.0/index.html) for atomic updates.

**Header Middlewares**: Injects the required S3 Host headers and enforces no-store caching for the HTML entry point.

**Compression Middleware**: Centrally handles Gzip/Brotli compression for all assets served from the S3 bucket.

**S3 Host Header Middleware**: Injects the required S3 Host header so S3 can route the request to the correct bucket.