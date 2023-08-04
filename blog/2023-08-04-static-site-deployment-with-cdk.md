---
slug: static-site-deployment-with-cdk
title: Simple Static Site Deployment to AWS with CDK
authors: johnathan
tags: [docusaurus]
---

## What is CDK?

CDK is a tool for deploying infrastructure to AWS. It allows you to write code that will be translated into CloudFormation templates and used to deploy your infrastructure.

## What will we be deploying?

A static React application (Video Player code shared via Module Federation). It will be deployed to S3 and served via CloudFront.

## Install the CDK CLI:

```bash
pnpm install -g aws-cdk
```

If successful then running `cdk --version` will return a version number.

## Initialise CDK in your project

Use the `cdk init` command, to create a CDK project. This needs to be run in an empty directory.

Create a subdirectory in your project to keep CDK code separate from application code.

```bash
mkdir cdk && cd cdk
cdk init app --language typescript
```

**lib/cdk-stack.ts** is where your CDK application’s main stack is defined. This is the file we’ll be spending most of our time in.

**bin/cdk.ts** is the entrypoint of the CDK application. It will load the stack defined in lib/cdk-stack.ts.

## Add your account details

Update bin/cdk.ts with your account details.

Add your account ID and region to the stack name, tags are optional:

```typescript
#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CdkStack } from "../lib/cdk-stack";

const environment = process.env.ENVIRONMENT || "development";

const shortEnvironment =
  process.env.ENVIRONMENT === "production" ? "prod" : "dev";

const app = new cdk.App();
const stackName = `video-player-module-${shortEnvironment}`;

new CdkStack(app, "CdkStack", {
  stackName,
  description: "Video Player Module Stack",
  env: {
    account: "your-account-id",
    region: "eu-central-1",
  },
  tags: {
    context: "video-player",
    service: "module",
    environment,
  },
});
```

## Add an S3 Bucket to the Stack

In `lib/cdk-stack.ts` add the following code:

```typescript
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const originBucket = new s3.Bucket(this, "video-player-module-dev", {
      bucketName: "video-player-module-dev",
    });
  }
}
```

## Synthesising the CDK app

When CDK apps are executed, they produce (or “synthesize”) an AWS CloudFormation template for each stack defined in your application.

To synthesize a CDK app, use the `cdk synth` command to create a CloudFormation template in the `cdk.out` directory.

```bash
cdk synth
```

`cdk deploy` actually synthesises the app before deploying, so you don't need to run `synth` before deploying, but it can be useful .

## Bootstrapping

Bootstrapping is the process of provisioning resources for CDK itself, including an Amazon S3 bucket for storing files and IAM roles that grant permissions needed to perform deployments.

**This only needs to be done once for your account and region.**

```bash
cdk bootstrap
```

## Deploying

```bash
cdk deploy
```

After deployment, you should see the new Stack in the [AWS CloudFormation console](https://console.aws.amazon.com/cloudformation/home). And the new Bucket in the [AWS S3 console](https://s3.console.aws.amazon.com/s3/home).

## Deploy the built application files

Now that we have a bucket to deploy to, we can deploy our application files.

The application build output is in the `dist` directory in the root of the project. We copy the contents of this directory to the S3 bucket by adding an S3 Bucket Deployment to the stack:

```typescript
new s3Deployment.BucketDeployment(this, "video-player-module-s3-deployment", {
  sources: [s3Deployment.Source.asset("../dist")],
  destinationBucket: originBucket,
});
```

## Add a CloudFront Distribution

We need to add a CloudFront distribution to serve the files from the S3 bucket.

```typescript
const originBucket = new s3.Bucket(this, "video-player-module-dev", {
  bucketName: "video-player-module-dev",
});

const distribution = new cloudfront.Distribution(this, "Distribution", {
  defaultBehaviour: { origin: new origins.S3Origin(originBucket) },
});

new s3Deployment.BucketDeployment(this, "video-player-module-s3-deployment", {
  sources: [s3Deployment.Source.asset("../dist")],
  destinationBucket: originBucket,
  distribution,
  distributionPaths: ["/*"],
});

const certificate = certificateManager.Certificate.fromCertificateArn(
  this,
  `certificate-lookup`,
  "arn:aws:acm:us-east-1:your-id:certificate/id"
);

new cloudfront.Distribution(this, "video-player-module-distribution", {
  defaultBehaviour: {
    origin: new cloudfrontOrigins.S3Origin(originBucket),
  },
  comment: "Video Player Module Distribution",
  defaultRootObject: "index.html",
  certificate,
  domainNames: ["video.your-site.com"],
});
```

You should now be able to access your application at the domain you specified.
