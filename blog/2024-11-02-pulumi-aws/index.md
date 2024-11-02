---
slug: pulumi AWS
title: Pulumi & AWS
authors: johnathan
tags:
  - AWS
  - Pulumi
  - Infrastructure as Code
---

Trying out Pulumi with AWS. Pulumi is an open-source infrastructure as code tool that allows you to manage cloud infrastructure using TypeScript. Following the [Pulumi Quickstart](https://www.pulumi.com/docs/get-started/aws/begin/) guide, it's easy to deploy a simple static website to an S3 bucket.

<!-- truncate -->

# Setup

Install Pulumi with Homebrew:

```bash
brew install pulumi/tap/pulumi
```

You need to have have previously installed and configured the AWS CLI, Pulumi will respect and use your configuration settings.

Use Pulumi in local mode (no Pulumi Cloud account required):

```
pulumi login --local
```

Create a new Pulumi project with an example template:

```bash
mkdir quickstart && cd quickstart
pulumi new aws-typescript
```

Deploy the stack:

```bash
pulumi up
```

Simple Static S3 Website

Add and html file to the project directory:

```html
<html>
  <body>
    <h1>Hello, Pulumi!</h1>
  </body>
</html>
```

And the Pulumi code:

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const bucket = new aws.s3.Bucket("my-bucket", {
  bucket: "johnathan-test-bucket",
  website: {
    indexDocument: "index.html",
  },
});

const ownershipControls = new aws.s3.BucketOwnershipControls(
  "ownership-controls",
  {
    bucket: bucket.id,
    rule: {
      objectOwnership: "ObjectWriter",
    },
  }
);

const publicAccessBlock = new aws.s3.BucketPublicAccessBlock(
  "public-access-block",
  {
    bucket: bucket.id,
    blockPublicAcls: false,
  }
);

const bucketObject = new aws.s3.BucketObject(
  "index.html",
  {
    bucket: bucket.id,
    source: new pulumi.asset.FileAsset("./index.html"),
    contentType: "text/html",
    acl: "public-read",
  },
  { dependsOn: [publicAccessBlock, ownershipControls] }
);

export const bucketName = bucket.id;
export const bucketEndpoint = pulumi.interpolate`http://${bucket.websiteEndpoint}`;
```

Deploy the stack:

```bash
pulumi up
```

# Cleanup

Take down the infrastructure:

```bash
pulumi destroy
```

Remove the stack configuration from Pulumi:

```bash
pulumi stack rm
```
