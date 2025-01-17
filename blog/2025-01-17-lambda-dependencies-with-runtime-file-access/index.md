---
slug: lambda-dependencies-with-runtime-file-access
title: Lambda Dependencies with Runtime File Access
authors: johnathan
tags:
  - AWS
  - Lambda
  - CDK
  - ESM
  - esbuild
  - TypeScript
---

This is an investigation into a Lambda function that uses the got-scraping module, and ESM-only NPM module which, which reads .json files from the filesystem at runtime.

<!-- truncate -->

## The Error

Lambda Node.js functions with dependencies that access files at runtime can be problematic when bundling and deploying to a lambda. In this case using AWS [CDK NodejsFunction construct](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda_nodejs.NodejsFunction.html).

The construct bundles the Lambda function code and its dependencies into a single JavaScript file via esbuild. You can see this after running `cdk synth` and inspecting the generated `cdk.out/asset.<hash>/index.js` file.

To begin, my Lambda function is failing with the following error:

> no such file or directory, open '/var/task/data_files/headers-order.json'

```
2025-01-17T10:40:59.120Z	undefined	ERROR	Uncaught Exception 	{
    "errorType": "Error",
    "errorMessage": "ENOENT: no such file or directory, open '/var/task/data_files/headers-order.json'",
    "code": "ENOENT",
    "errno": -2,
    "syscall": "open",
    "path": "/var/task/data_files/headers-order.json",
    "stack": [
        "Error: ENOENT: no such file or directory, open '/var/task/data_files/headers-order.json'",
        "    at Object.openSync (node:fs:561:18)",
        "    at readFileSync (node:fs:445:35)",
        "    at new HeaderGenerator2 (/var/task/index.js:141748:62)",
        "    at Object.<anonymous> (/var/task/index.js:178359:17)",
        "    at Module._compile (node:internal/modules/cjs/loader:1546:14)",
        "    at Object..js (node:internal/modules/cjs/loader:1689:10)",
        "    at Module.load (node:internal/modules/cjs/loader:1318:32)",
        "    at Function._load (node:internal/modules/cjs/loader:1128:12)",
        "    at TracingChannel.traceSync (node:diagnostics_channel:315:14)",
        "    at wrapModuleLoad (node:internal/modules/cjs/loader:218:24)",
        "    at Module.<anonymous> (node:internal/modules/cjs/loader:1340:12)",
        "    at Module.patchedRequire (/opt/nodejs/node_modules/require-in-the-middle/index.js:217:27)",
        "    at Hook._require.Module.require (/opt/nodejs/node_modules/require-in-the-middle/index.js:142:27)",
        "    at require (node:internal/modules/helpers:141:16)",
        "    at _tryRequireFile (file:///var/runtime/index.mjs:1002:37)",
        "    at _tryRequire (file:///var/runtime/index.mjs:1052:25)",
        "    at _loadUserApp (file:///var/runtime/index.mjs:1081:22)",
        "    at UserFunction.js.module.exports.load (file:///var/runtime/index.mjs:1119:27)",
        "    at start (file:///var/runtime/index.mjs:1282:42)",
        "    at file:///var/runtime/index.mjs:1288:7",
        "    at ModuleJob.run (node:internal/modules/esm/module_job:268:25)",
        "    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:543:26)",
        "    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:116:5)"
    ]
}
```

Directory `/var/task` is the lambda function's working directory where our code bundle lives inside the Lambda container.

In the bundle, the got-scraping module has a dependency that is attempting to read a file from the filesystem:

```js
this.headersOrder = JSON.parse(
  (0, fs_1.readFileSync)(
    `${__dirname}/data_files/headers-order.json`
  ).toString()
);
```

This doesn't work because CDK has bundled the code into a single JavaScript file, and did not bundle or copy any addition (.json) files.

Esbuild explicitly states that it doesn't support "\_\_dirname".

> There are many node-specific features that esbuild doesn't support while bundling such as \_\_dirname, import.meta.url, fs.readFileSync, and \*.node native binary modules
> https://esbuild.github.io/getting-started/#bundling-for-node

## The First Fix

To attempt fix this, configure CDK to install the got-scraping module as an npm package, and not bundle it, allowing the .json file to be present in the Lambda container in the node_modules directory.

```ts
// LambdaStack.ts
this.lambdaFunction = new lambdaNode.NodejsFunction(this, functionName, {
  bundling: {
    nodeModules: ["got-scraping"], // Install the got-scraping module as an npm package
    ...
  },
  ...
});
```

## The Next Error

However this doesn't work because the got-scraping module is [an ESM-only module](https://github.com/apify/got-scraping/releases/tag/v4.0.0), and the Lambda bundle is attempting to import it as a CommonJS module since the bundle is using CommonJS.

```
2025-01-16T10:19:19.266Z	undefined	ERROR	Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: No "exports" main defined in /var/task/node_modules/got-scraping/package.json
    at exportsNotFound (node:internal/modules/esm/resolve:302:10)
    at packageExportsResolve (node:internal/modules/esm/resolve:592:13)
    at resolveExports (node:internal/modules/cjs/loader:640:36)
    at Function._findPath (node:internal/modules/cjs/loader:748:31)
    at Function._resolveFilename (node:internal/modules/cjs/loader:1235:27)
    at Function._load (node:internal/modules/cjs/loader:1075:27)
    at TracingChannel.traceSync (node:diagnostics_channel:315:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:218:24)
    at Module.<anonymous> (node:internal/modules/cjs/loader:1340:12)
    at Module.patchedRequire (/opt/nodejs/node_modules/require-in-the-middle/index.js:194:34)
    at Hook._require.Module.require (/opt/nodejs/node_modules/require-in-the-middle/index.js:142:27)
    at require (node:internal/modules/helpers:141:16)
    at Object.<anonymous> (/var/task/index.js:157186:27)
    at Module._compile (node:internal/modules/cjs/loader:1546:14)
    at Object..js (node:internal/modules/cjs/loader:1689:10)
    at Module.load (node:internal/modules/cjs/loader:1318:32)
    at Function._load (node:internal/modules/cjs/loader:1128:12)
    at TracingChannel.traceSync (node:diagnostics_channel:315:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:218:24)
    at Module.<anonymous> (node:internal/modules/cjs/loader:1340:12)
    at Module.patchedRequire (/opt/nodejs/node_modules/require-in-the-middle/index.js:217:27)
    at Hook._require.Module.require (/opt/nodejs/node_modules/require-in-the-middle/index.js:142:27)
    at require (node:internal/modules/helpers:141:16)
    at _tryRequireFile (file:///var/runtime/index.mjs:1002:37)
    at _tryRequire (file:///var/runtime/index.mjs:1052:25)
    at _loadUserApp (file:///var/runtime/index.mjs:1081:22)
    at UserFunction.js.module.exports.load (file:///var/runtime/index.mjs:1119:27)
    at start (file:///var/runtime/index.mjs:1282:42)
    at file:///var/runtime/index.mjs:1288:7
    at ModuleJob.run (node:internal/modules/esm/module_job:268:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:543:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:116:5) {
  code: 'ERR_PACKAGE_PATH_NOT_EXPORTED'
}
```

This can be reproduced locally:

```shell
pnpm exec rimraf cdk.out
pnpm exec dotenv -- cdk synth --no-staging
pnpm exec dotenv -- node cdk.out/asset.69acf7d6f5161d6047f2088f7671f91d8f0115231f8128e68f4dbfdb8b69b2e7/index.js
```

Next step, bundle the Lambda function as an ESM module:

```ts
// LambdaStack.ts
this.lambdaFunction = new lambdaNode.NodejsFunction(this, functionName, {
  bundling: {
    nodeModules: ["got-scraping"],
    format: lambdaNode.OutputFormat.ESM, // Bundle as an ESM module
    ...
  },
  ...
});
```

This gets the Lambda function past that error, but the bundle is still not working correctly:

```shell
file:///code/collector/cdk.out/asset.03e433fee3dc8d59a235fcba200387981c0ae65545c7750299c8ce7d2e7dde7d/index.mjs:11
  throw Error('Dynamic require of "' + x + '" is not supported');
        ^

Error: Dynamic require of "stream" is not supported
    at file:///code/collector/cdk.out/asset.03e433fee3dc8d59a235fcba200387981c0ae65545c7750299c8ce7d2e7dde7d/index.mjs:11:9
    at node_modules/.pnpm/node-fetch@2.7.0/node_modules/node-fetch/lib/index.js (file:///code/collector/cdk.out/asset.03e433fee3dc8d59a235fcba200387981c0ae65545c7750299c8ce7d2e7dde7d/index.mjs:2343:34)
    at __require2 (file:///code/collector/cdk.out/asset.03e433fee3dc8d59a235fcba200387981c0ae65545c7750299c8ce7d2e7dde7d/index.mjs:17:50)
    at file:///code/collector/cdk.out/asset.03e433fee3dc8d59a235fcba200387981c0ae65545c7750299c8ce7d2e7dde7d/index.mjs:136617:25
    at ModuleJob.run (node:internal/modules/esm/module_job:268:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:543:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:116:5)
```

This is an error from esbuild related to converting CommonJS to ESM.
More details in this issue: https://github.com/evanw/esbuild/issues/1927

Use the `banner` option to add a require function to the ESM module:

```ts
// LambdaStack.ts
this.lambdaFunction = new lambdaNode.NodejsFunction(this, functionName, {
  bundling: {
    nodeModules: ["got-scraping"],
    format: lambdaNode.OutputFormat.ESM,
    banner: "import { createRequire } from 'module';const require = createRequire(import.meta.url)", // adds require function to ESM module
    ...
  },
  ...
});
```

The banner snippet is inserted of the code bundle and is used to import CommonJS modules in an ES module context, `createRequire` is a function provided by Node.js that allows you to create a require function in an ES module.

This is particularly useful when you are working in an ES module and need to import a CommonJS module, as ES modules do not have a built-in require function.

After this change, the Lambda function is working as expected.

## Possible Alternatives

Move away from the CDK construct and use the [AWS Lambda construct](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.Function.html) directly, with a different bundling mechanism.

## Useful Links

https://esbuild.github.io/getting-started/#bundling-for-node

https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda_nodejs.NodejsFunction.html

https://www.typescriptlang.org/docs/handbook/modules/theory.html#scripts-and-modules-in-javascript
