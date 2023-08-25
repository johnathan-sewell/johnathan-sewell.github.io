---
slug: static-site-deployment-with-cdk
title: Simple Static Site Deployment to AWS with CDK
authors: johnathan
tags: [cdk aws]
---

## What is CDK?

CDK is a tool for deploying infrastructure to AWS. It allows you to write code that will be translated into CloudFormation templates and used to deploy your infrastructure.

## What will we be deploying?

A static React application, deployed to S3 and served via CloudFront.

## Install the CDK CLI:

```bash
pnpm install -g aws-cdk
```

If successful then running `cdk --version` will return a version number.

## Project setup

- Create an .nvmrc file `echo 18.17.1 > .nvmrc && nvm use`
- Create a .prettierrc file `echo {} > .prettierrc`
- Initialise pnpm `pnpm init`

## Initialise CDK in your project

Use the `cdk init` command, to create a CDK project. **This needs to be run in an empty directory.**

Create a subdirectory in your project to keep CDK code separate from application code.

```bash
mkdir cdk && cd cdk
cdk init app --language typescript
```

**lib/cdk-stack.ts** is where your CDK application’s main stack is defined. This is the file we’ll be spending most of our time in.

**bin/cdk.ts** is the entrypoint of the CDK application. It will load the stack defined in lib/cdk-stack.ts.

## Add your account details

Create a config file that can read environment variables set during deployment (a Github Workflow) or from a local .env file in cdk/config.ts.

You need to install `zod` and `dotenv`.

`pnpm i zod`

`pnpm i -D dotenv`

<details>
<summary>Expand Code</summary>

```typescript
import { z } from "zod";
require("dotenv").config({ path: `.env.local`, override: true });

const envVarsSchema = z.object({
  AWS_ACCOUNT: z.string().default("YOUR ACCOUNT ID"),
  AWS_REGION: z.string().default("eu-central-1"),
  ENVIRONMENT: z.enum(["local", "development", "production"]),
});

export type ApiEnvironment = z.input<typeof envVarsSchema>;

const envVars = envVarsSchema.safeParse(process.env);
if (!envVars.success) {
  // eslint-disable-next-line no-console
  console.error("There is an error with your environment variables.");
  throw envVars.error;
}

export const config = {
  environment: envVars.data.ENVIRONMENT,
  project: {
    context: "website" as const,
    name: "frontend" as const,
  },
  shortEnvironment:
    envVars.data.ENVIRONMENT === "production"
      ? ("prod" as const)
      : ("dev" as const),
  aws: {
    account: envVars.data.AWS_ACCOUNT,
    region: envVars.data.AWS_REGION,
  },
};
```

</details>

Update bin/cdk.ts with your account details.

<details>
<summary>Expand Code</summary>

```typescript
#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CdkStack } from "../lib/cdk-stack";
import { config } from "../config";

const app = new cdk.App();
const projectName = `${config.project.context}-${config.project.name}`;
const stackName = `${projectName}-${config.shortEnvironment}`;

new CdkStack(app, stackName, {
  stackName,
  tags: {
    context: config.project.context,
    service: config.project.name,
    environment: config.environment,
  },
  env: {
    account: config.aws.account,
    region: config.aws.region,
  },
});
```

</details>

Add local environment variables in `cdk/.env.local`:

```bash
ENVIRONMENT=development
```

`echo ENVIRONMENT=development > cdk/.env.local`

## Add an S3 Bucket to the Stack

In `lib/cdk-stack.ts` add the following code:

<details>
<summary>Expand Code</summary>

```typescript
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import { config } from "../config";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const projectName = `${config.project.context}-${config.project.name}`;

    new s3.Bucket(this, `${projectName}-${config.shortEnvironment}`, {
      bucketName: `${projectName}-${config.shortEnvironment}`,
    });
  }
}
```

</details>

## Synthesising the CDK app

When CDK apps are executed, they produce (or “synthesize”) an AWS CloudFormation template for each stack defined in your application.

To synthesize a CDK app, use the `cdk synth` command to create a CloudFormation template in the `cdk.out` directory.

```bash
( cd cdk && cdk synth )
```

`cdk deploy` actually synthesises the app before deploying, so you don't need to run `synth` before deploying, but it can be useful .

## Bootstrapping

Bootstrapping is the process of provisioning resources for CDK itself, including an Amazon S3 bucket for storing files and IAM roles that grant permissions needed to perform deployments.

**This only needs to be done once for your account and region.**

```bash
( cd cdk && cdk bootstrap )
```

## Deploying

```bash
( cd cdk && cdk deploy )
```

After deployment, you should see the new Stack in the [AWS CloudFormation console](https://console.aws.amazon.com/cloudformation/home). And the new Bucket in the [AWS S3 console](https://s3.console.aws.amazon.com/s3/home).

Add these to package.json:

```json
"scripts": {
  "cdk:synth": "( cd cdk && cdk synth )",
  "cdk:deploy": "( cd cdk && cdk deploy )",
}
```

## Deploy the built application files

Now that we have a bucket to deploy to, we can deploy our application files.

Assume we have application build output is in the `dist` directory in the root of the project. We copy the contents of this directory to the S3 bucket by adding an S3 Bucket Deployment to the stack:

```typescript
new s3Deployment.BucketDeployment(
  this,
  `${projectName}-${config.shortEnvironment}-s3-deployment`,
  {
    sources: [s3Deployment.Source.asset("../dist")],
    destinationBucket: originBucket,
  }
);
```

## Add a CloudFront Distribution

We need to add a CloudFront distribution to serve the files from the S3 bucket.

```typescript
new cloudfront.Distribution(
  this,
  `${projectName}-${config.shortEnvironment}-distribution}`,
  {
    defaultBehavior: {
      origin: new cloudfrontOrigins.S3Origin(originBucket),
    },
    comment: `${projectName}-${config.shortEnvironment}`,
    defaultRootObject: "index.html",
  }
);
```

Once deployed you should have a Cloudfront distribution serving your website files.

![End Result](/img/static-site-deployment-with-cdk/end-result.png)

The complete stack code:

```typescript
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as cloudfrontOrigins from "aws-cdk-lib/aws-cloudfront-origins";
import * as s3Deployment from "aws-cdk-lib/aws-s3-deployment";
import * as s3 from "aws-cdk-lib/aws-s3";
import { config } from "../config";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const projectName = `${config.project.context}-${config.project.name}`;

    const originBucket = new s3.Bucket(
      this,
      `${projectName}-${config.shortEnvironment}`,
      {
        bucketName: `${projectName}-${config.shortEnvironment}`,
      }
    );

    new s3Deployment.BucketDeployment(
      this,
      `${projectName}-${config.shortEnvironment}-s3-deployment`,
      {
        sources: [s3Deployment.Source.asset("../dist")],
        destinationBucket: originBucket,
      }
    );

    new cloudfront.Distribution(
      this,
      `${projectName}-${config.shortEnvironment}-distribution}`,
      {
        defaultBehavior: {
          origin: new cloudfrontOrigins.S3Origin(originBucket),
        },
        comment: `${projectName}-${config.shortEnvironment}`,
        defaultRootObject: "index.html",
      }
    );
  }
}
```

## To clean up and remove the stacks

Use `destroy`

```
cdk destroy
```
