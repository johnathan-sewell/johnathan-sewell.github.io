---
slug: module-federation
title: Module Federation
authors: johnathan
tags: [docusaurus]
---

## Module Federation

Create a Vite project:

```bash
pnpm create vite video-player-module --template react
```

Check that it works:

```bash
cd video-player-module
pnpm install
pnpm run dev
```

Set the correct Node version:

```bash
echo v18.16.0 > .nvmrc
nvm use
```

Install the Vite module federation plugin:

```bash
pnpm add @originjs/vite-plugin-federation -D
```

Fix the port so that we can point a host application here:

```json
"scripts": {
    "dev": "vite --port 5001 --strictPort",
},
```

Add a .prettierrc file:

```json
{
  "tabWidth": 2,
  "useTabs": false
}
```

Create a VideoPlayer component:

```jsx
import { useState } from "react";

function VideoPlayer() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </>
  );
}

export default VideoPlayer;
```

## Configure the remote module for sharing

Add this to vite.config.js:

```js
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "video_player_module",
      filename: "remoteEntry.js", // file name for the manifest file, defaults to remoteEntry.js
      exposes: {
        "./VideoPlayer": "./src/VideoPlayer",
      },
      shared: ["react", "react-dom"], //  share react and react-dom from the host
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
```

With Vite it is necessary to run the build and then the preview command to serve the module:

```bash
pnpm build && pnpm preview
```

You should be able to find a remoteEntry.js file at `http://localhost:3000/assets/remoteEntry.js`;

## Create a host application

Inside your Vite projects vite.config.js:

Import the federation plugin:

```js
import federation from "@originjs/vite-plugin-federation";
```

Add the plugin to the plugins array:

```js
plugins: [
  federation({
    name: "portal",
    remotes: {
      videoPlayerModule: "http://localhost:3000/assets/remoteEntry.js",
    },
    shared: ["react", "react-dom"],
  }),
];
```
