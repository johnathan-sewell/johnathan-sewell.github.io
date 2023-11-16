---
slug: vite-project-setup
title: Vite Project Setup
authors: johnathan
tags: [docusaurus]
---

#### Create a new project and directory:

```bash
pnpm create vite my-project
cd my-project
```

#### Set the correct Node version:

```bash
echo 18.17.1 > .nvmrc && nvm use
```

Check that it runs locally:

```bash
cd my-project
pnpm install
pnpm run dev
```

#### Prettier

Add a .prettierrc file:

```bash
echo {} > .prettierrc
```

```json
{
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 120
}
```

#### PNPM

Only allow PNPM, in package.json:

```json
{
  "scripts": {
    "preinstall": "npx only-allow pnpm"
  }
}
```

#### Commitizen

```bash
commitizen init cz-conventional-changelog --pnpm --save-dev --save-exact
```
