---
slug: split-imports-with-jscodeshift-codemods
title: Split imports with jscodeshift codemods
authors: johnathan
tags:
  - codemods
  - jscodeshift
---

As part of an incremental refactor I needed to split all import statements for a component library into multiple import statements to make find/replace on imports easy. This is a codemod to automate this process.


<!-- truncate -->

## Jscodeshift Codemod to split imports

```ts
import { FileInfo, API } from "jscodeshift";

export default function splitImports(file: FileInfo, { jscodeshift: j }: API) {
  const root = j(file.source);

  const importDeclarations = root.find(j.ImportDeclaration, {
    source: {
      value: "@blastorg/portal-pattern-library",
    },
  });

  // if more than 1 specifier, split them into separate import declarations
  importDeclarations.forEach((nodePath) => {
    const { node: importDeclaration } = nodePath;

    // if there is only one specifier, do nothing
    if (importDeclaration.specifiers?.length === 1) {
      return;
    }

    importDeclaration.specifiers?.forEach((specifier) => {
      if (specifier.type !== "ImportSpecifier") return;

      const newImportDeclaration = j.importDeclaration(
        [
          j.importSpecifier(
            j.identifier(specifier.imported.name),
            j.identifier(specifier.local.name)
          ),
        ],
        j.literal("@blastorg/portal-pattern-library")
      );

      j(nodePath).insertAfter(newImportDeclaration);
    });

    // remove the original importDeclaration
    j(nodePath).remove();
  });

  return root.toSource();
}

```

Testing is done with Jest and jscodeshift.

```ts
// splitImports.spec.ts
import { jest } from "@jest/globals";

jest.autoMockOff();

const defineTest = require("jscodeshift/dist/testUtils").defineTest;

defineTest(__dirname, "splitImports", null, "splitImports", {
  parser: "ts",
});
```

The test input and expected output are stored in `__testfixtures__` directories:

```ts
// __testfixtures__/splitImports.input.ts
import {
  Link as LinkButton,
  colors,
  breakpoints,
  toRem,
} from "@blastorg/portal-pattern-library";
import { CheckboxField } from "@blastorg/portal-pattern-library";
```

```ts
// __testfixtures__/splitImports.output.ts
import { toRem } from "@blastorg/portal-pattern-library";
import { breakpoints } from "@blastorg/portal-pattern-library";
import { colors } from "@blastorg/portal-pattern-library";
import { Link as LinkButton } from "@blastorg/portal-pattern-library";
import { CheckboxField } from "@blastorg/portal-pattern-library";

```

The tests can be run with the following script in `package.json`:

```bash
"test": "jest"
```

The codemod can be run against a codebase with a script in `package.json`:

```bash
 "transform:splitImports": "jscodeshift ~/code/my-project/src -t ./splitImports.ts --parser tsx --extensions js,jsx,ts,tsx --ignore-pattern '*.d.ts'",
```



