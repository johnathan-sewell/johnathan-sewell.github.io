---
slug: pulumi AWS lambda
title: Deploy an AWS Lambda with Pulumi
authors: johnathan
tags:
  - AWS
  - Lambda
  - Pulumi
  - Infrastructure as Code
---

Steps to get a simple "Hello, World!" Lambda up and running in AWS using Pulumi.

<!-- truncate -->

# Handler file

Just using JavaScript for this example. Create a file called `handler.js` in /app:

```javascript
exports.handler = async (event) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello World, from a Pulumi deployed Lambda"),
  };
  return response;
};
```

AWS CDK can transpile TypeScript to JavaScript, but Pulumi does not. So we need to use JavaScript for the Lambda handler, or use a build step to transpile the TypeScript.

# The Pulumi code

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as path from "path";

// Configure IAM so that the AWS Lambda can be run.
const lambdaRole = new aws.iam.Role("lambda-role", {
  assumeRolePolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Action: "sts:AssumeRole",
        Principal: {
          Service: "lambda.amazonaws.com",
        },
        Effect: "Allow",
      },
    ],
  },
});

new aws.iam.RolePolicyAttachment("role-policy-attachment", {
  role: lambdaRole,
  policyArn: aws.iam.ManagedPolicies.AWSLambdaExecute,
});

// Define Lambda function
const backendLambda = new aws.lambda.Function("lambda", {
  runtime: "nodejs20.x",
  role: lambdaRole.arn,
  handler: "handler.handler",
  // Upload the code for the Lambda from the "./app" directory
  // including the "handler.cjs" file.
  code: new pulumi.asset.AssetArchive({
    ".": new pulumi.asset.FileArchive(path.resolve(__dirname, "./app")),
  }),
});

// Define Lambda URL with no authentication
const lambdaUrl = new aws.lambda.FunctionUrl("lambda-url", {
  functionName: backendLambda.name,
  authorizationType: "NONE",
});

// Export the URL
export const lambdaURL = lambdaUrl.functionUrl;
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
