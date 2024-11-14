---
slug: aws-lambda-cron-trigger
title: Trigger an AWS Lambda with a cron schedule
authors: johnathan
tags:
  - AWS
  - Lambda
  - CDK
  - Infrastructure as Code
---

Assuming you have already setup a lambda, adding a cron trigger to a only takes a few more lines of CDK code.

<!-- truncate -->

```javascript
import * as cdk from "aws-cdk-lib";
import * as events from "aws-cdk-lib/aws-events";
import * as eventTargets from "aws-cdk-lib/aws-events-targets";

const eventRule = new events.Rule(this, "tenMinuteRule", {
  schedule: events.Schedule.rate(cdk.Duration.minutes(10)),
});

eventRule.addTarget(new eventTargets.LambdaFunction(this.lambdaFunction));
```
