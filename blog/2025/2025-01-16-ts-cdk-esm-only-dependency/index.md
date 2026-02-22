---
slug: ts-cdk-esm-only-dependency
title: TypeScript error - The current file is a CommonJS module
authors: johnathan
tags:
  - ESM
  - TypeScript
---

Investigation of error "TS1479: The current file is a CommonJS module" when importing an ESM-only module in a TypeScript file.

<!-- truncate -->

## Problem

Importing a ESM-only module in a TypeScript file:

```
import { gotScraping } from "got-scraping";
```

The TypeScript compiler throws an error:

```shell
error TS1479: The current file is a CommonJS module whose imports will produce 'require' calls; however, the referenced file is an ECMAScript module and cannot be imported with 'require'. Consider writing a dynamic 'import("got-scraping")' call instead.
  To convert this file to an ECMAScript module, change its file extension to '.mts', or add the field `"type": "module"` to '/code/collector/package.json'.

3 import { gotScraping } from "got-scraping";
                              ~~~~~~~~~~~~~~
```

This doesn't seem to make sense because the current file is a TypeScript file, not a CommonJS module. But the error message is correct in that, by default, Node.js projects use the CommonJS module system. This means that unless you explicitly configure your project to use ES modules, Node.js will treat your files as CommonJS modules.

In a TypeScript project, you can specify the module system in the tsconfig.json file. If you don't specify it, TypeScript will follow the default behavior of Node.js, which is CommonJS.

### Set "moduleResolution" to "bundler"

Rather than convert the project to use ES modules, we can set the module resolution to "bundler" in the tsconfig.json file.

```json
// tsconfig.json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "Bundler"
  }
}
```

> bundler: Node.js v12 introduced some new module resolution features for importing npm packages—the "exports" and "imports" fields of package.json—and many bundlers adopted those features without also adopting the stricter rules for ESM imports. This module resolution mode provides a base algorithm for code targeting a bundler. It supports package.json "exports" and "imports" by default, but can be configured to ignore them. It requires setting module to esnext.
> https://www.typescriptlang.org/docs/handbook/modules/theory.html#module-resolution
