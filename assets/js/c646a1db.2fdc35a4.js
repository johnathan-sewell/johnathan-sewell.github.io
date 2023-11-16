"use strict";(self.webpackChunkjohnathan_sewell=self.webpackChunkjohnathan_sewell||[]).push([[771],{9613:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var o=n(9496);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=o.createContext({}),u=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=u(e.components);return o.createElement(s.Provider,{value:t},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},h=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=u(n),h=a,m=d["".concat(s,".").concat(h)]||d[h]||c[h]||r;return n?o.createElement(m,i(i({ref:t},p),{},{components:n})):o.createElement(m,i({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[d]="string"==typeof e?e:a,i[1]=l;for(var u=2;u<r;u++)i[u]=n[u];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}h.displayName="MDXCreateElement"},121:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>c,frontMatter:()=>r,metadata:()=>l,toc:()=>u});var o=n(7605),a=(n(9496),n(9613));const r={slug:"module-federation",title:"Module Federation",authors:"johnathan",tags:["docusaurus"]},i=void 0,l={permalink:"/module-federation",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2023-08-02-module-federation.md",source:"@site/blog/2023-08-02-module-federation.md",title:"Module Federation",description:"What is Module Federation?",date:"2023-08-02T00:00:00.000Z",formattedDate:"August 2, 2023",tags:[{label:"docusaurus",permalink:"/tags/docusaurus"}],readingTime:2.985,hasTruncateMarker:!1,authors:[{name:"Johnathan Sewell",title:"Software Engineer",url:"https://github.com/johnathan-sewell",imageURL:"https://avatars.githubusercontent.com/u/286782?v=4",key:"johnathan"}],frontMatter:{slug:"module-federation",title:"Module Federation",authors:"johnathan",tags:["docusaurus"]},prevItem:{title:"Simple Static Site Deployment to AWS with CDK",permalink:"/static-site-deployment-with-cdk"},nextItem:{title:"Building a Quality Selector for HLS.js in React",permalink:"/hls-quality-selector"}},s={authorsImageUrls:[void 0]},u=[{value:"What is Module Federation?",id:"what-is-module-federation",level:2},{value:"Why use Module Federation?",id:"why-use-module-federation",level:2},{value:"Create a Project for the Remote Module",id:"create-a-project-for-the-remote-module",level:2},{value:"Create a Vite project",id:"create-a-vite-project",level:4},{value:"Install the Vite module federation plugin",id:"install-the-vite-module-federation-plugin",level:4},{value:"Fix the port",id:"fix-the-port",level:4},{value:"Create a VideoPlayer component",id:"create-a-videoplayer-component",level:4},{value:"Configure the Vite module federation plugin",id:"configure-the-vite-module-federation-plugin",level:4},{value:"Let&#39;s check that worked...",id:"lets-check-that-worked",level:4},{value:"Configure the Host Application",id:"configure-the-host-application",level:2},{value:"Install the Vite module federation plugin",id:"install-the-vite-module-federation-plugin-1",level:4},{value:"Configure the plugin",id:"configure-the-plugin",level:4},{value:"Import the remote Component into the Host Application",id:"import-the-remote-component-into-the-host-application",level:4},{value:"Add declaration file",id:"add-declaration-file",level:4},{value:"Run the Host Application",id:"run-the-host-application",level:4}],p={toc:u},d="wrapper";function c(e){let{components:t,...r}=e;return(0,a.kt)(d,(0,o.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"what-is-module-federation"},"What is Module Federation?"),(0,a.kt)("p",null,"Module Federation is a way to share code between applications. It is a feature of Webpack 5 and is also available as a plugin for Vite."),(0,a.kt)("h2",{id:"why-use-module-federation"},"Why use Module Federation?"),(0,a.kt)("p",null,"Module Federation allows you to share code between applications. This can be useful if you have a component library that you want to share between applications. It can also be useful if you want to share a single component between applications."),(0,a.kt)("p",null,"This has benefits over an npm module, including the ability to share state between applications and the ability to share code without publishing to npm."),(0,a.kt)("h2",{id:"create-a-project-for-the-remote-module"},"Create a Project for the Remote Module"),(0,a.kt)("p",null,"I'm using a video player as an example here."),(0,a.kt)("h4",{id:"create-a-vite-project"},"Create a Vite project"),(0,a.kt)("p",null,"Foolow these steps to ",(0,a.kt)("a",{parentName:"p",href:"/vite-project-setup"},"setup a new Vite project")),(0,a.kt)("h4",{id:"install-the-vite-module-federation-plugin"},"Install the Vite module federation plugin"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"pnpm add @originjs/vite-plugin-federation -D\n")),(0,a.kt)("h4",{id:"fix-the-port"},"Fix the port"),(0,a.kt)("p",null,"This is so that we can point a host application here."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'"scripts": {\n    "dev": "vite --port 5001 --strictPort",\n},\n')),(0,a.kt)("h4",{id:"create-a-videoplayer-component"},"Create a VideoPlayer component"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},'import { useState } from "react";\n\nfunction VideoPlayer({ src }) {\n  const [count, setCount] = useState(0);\n\n  return (\n    <>\n      <h1>Video Player Module</h1>\n      <div>\n        <video width="250" autoPlay muted>\n          <source src={src} type="video/webm" />\n        </video>\n      </div>\n\n      <button onClick={() => setCount((count) => count + 1)}>\n        count is {count}\n      </button>\n    </>\n  );\n}\n\nexport default VideoPlayer;\n')),(0,a.kt)("h4",{id:"configure-the-vite-module-federation-plugin"},"Configure the Vite module federation plugin"),(0,a.kt)("p",null,"Add the configuration to the plugins array of ",(0,a.kt)("inlineCode",{parentName:"p"},"vite.config.js"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'import { defineConfig } from "vite";\nimport react from "@vitejs/plugin-react";\nimport basicSsl from "@vitejs/plugin-basic-ssl";\nimport federation from "@originjs/vite-plugin-federation";\n\n// https://vitejs.dev/config/\nexport default defineConfig({\n  server: {\n    port: 3000,\n    https: true,\n  },\n  plugins: [\n    react(),\n    /* install for local SSL*/\n    /* pnpm add @vitejs/plugin-basic-ssl -D */\n    basicSsl(),\n    federation({\n      name: "video_player_module",\n      // file name for the manifest file, defaults to remoteEntry.js\n      filename: "remoteEntry.js",\n      exposes: {\n        // expose each component you want to share\n        // path to the component: name of the component\n        "./VideoPlayer": "./src/VideoPlayer",\n      },\n      //  share react and react-dom from the host\n      shared: ["react", "react-dom"],\n    }),\n  ],\n  build: {\n    outDir: "dist",\n    modulePreload: false,\n    target: "esnext",\n    minify: false,\n    cssCodeSplit: false,\n  },\n});\n')),(0,a.kt)("h4",{id:"lets-check-that-worked"},"Let's check that worked..."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"pnpm build && pnpm preview\n")),(0,a.kt)("p",null,'Then browse to "https://localhost:5001/assets/remoteEntry.js" and you should see a manifest file.'),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Manifest",src:n(163).Z,width:"2950",height:"530"})),(0,a.kt)("p",null,"It's important to note you need to run ",(0,a.kt)("inlineCode",{parentName:"p"},"pnpm build")," to generate the manifest file."),(0,a.kt)("h2",{id:"configure-the-host-application"},"Configure the Host Application"),(0,a.kt)("h4",{id:"install-the-vite-module-federation-plugin-1"},"Install the Vite module federation plugin"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"pnpm add @originjs/vite-plugin-federation -D\n")),(0,a.kt)("h4",{id:"configure-the-plugin"},"Configure the plugin"),(0,a.kt)("p",null,"Configure the plugin in ",(0,a.kt)("inlineCode",{parentName:"p"},"vite.config.js")," by adding the plugin to the plugins array:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'import federation from "@originjs/vite-plugin-federation";\n\nexport default defineConfig({\n  plugins: [\n    react(),\n    basicSsl() /* local SSL */,\n    federation({\n      name: "host",\n      remotes: {\n        videoPlayerModule: "https://localhost:5001/assets/remoteEntry.js",\n      },\n      shared: ["react", "react-dom"], //  share react and react-dom from the host\n    }),\n  ],\n  // ... rest of your config\n});\n')),(0,a.kt)("h4",{id:"import-the-remote-component-into-the-host-application"},"Import the remote Component into the Host Application"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},'import { useState } from "react";\n// eslint-disable-next-line import/no-unresolved\nimport VideoPlayer from "videoPlayerModule/VideoPlayer"; // can use React.lazy here\n\nexport default function ModuleFederationPage() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <>\n      <h1>Module Federation Host</h1>\n      <button onClick={() => setCount((count) => count + 1)}>\n        count is {count}\n      </button>\n      <VideoPlayer src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" />\n    </>\n  );\n}\n')),(0,a.kt)("h4",{id:"add-declaration-file"},"Add declaration file"),(0,a.kt)("p",null,"For TypeScript, you need to add a declaration file to the host application (declarations.d.ts):"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'declare module "videoPlayerModule/VideoPlayer" {\n  const VideoPlayer: React.ComponentType<{ src: string }>;\n  export default VideoPlayer;\n}\n')),(0,a.kt)("h4",{id:"run-the-host-application"},"Run the Host Application"),(0,a.kt)("p",null,"Run the host application and see the remote component working in the host application."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"pnpm start\n")),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"End result",src:n(7170).Z,width:"1196",height:"718"})))}c.isMDXComponent=!0},7170:(e,t,n)=>{n.d(t,{Z:()=>o});const o=n.p+"assets/images/end-result-ddfdc57eb7a6280b6c69492254f323a1.png"},163:(e,t,n)=>{n.d(t,{Z:()=>o});const o=n.p+"assets/images/manifest-3024e344c03d4050d6bd18cfb9efc217.png"}}]);