"use strict";(self.webpackChunkjohnathan_sewell=self.webpackChunkjohnathan_sewell||[]).push([[911],{1141:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>c,default:()=>d,frontMatter:()=>a,metadata:()=>s,toc:()=>l});var r=n(3274),i=n(4824);const a={slug:"vite-project-setup",title:"Vite Project Setup",authors:"johnathan"},c=void 0,s={permalink:"/vite-project-setup",source:"@site/blog/2023-08-25-new-vite-project-setup/index.md",title:"Vite Project Setup",description:"My preferred setup for a new Vite project.",date:"2023-08-25T00:00:00.000Z",formattedDate:"August 25, 2023",tags:[],readingTime:.525,hasTruncateMarker:!0,authors:[{name:"Johnathan Sewell",url:"https://github.com/johnathan-sewell",imageURL:"https://avatars.githubusercontent.com/u/286782?v=4",key:"johnathan"}],frontMatter:{slug:"vite-project-setup",title:"Vite Project Setup",authors:"johnathan"},unlisted:!1,prevItem:{title:"Intersection Observer for Simple Transitions",permalink:"/intersection-observer-transitions"},nextItem:{title:"Simple Static Site Deployment to AWS with CDK",permalink:"/static-site-deployment-with-cdk"}},o={authorsImageUrls:[void 0]},l=[{value:"Create a new project and directory:",id:"create-a-new-project-and-directory",level:4},{value:"Set the correct Node version:",id:"set-the-correct-node-version",level:4},{value:"Prettier",id:"prettier",level:4},{value:"PNPM",id:"pnpm",level:4},{value:"Commitizen",id:"commitizen",level:4}];function p(e){const t={code:"code",h4:"h4",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.p,{children:"My preferred setup for a new Vite project."}),"\n",(0,r.jsx)(t.h4,{id:"create-a-new-project-and-directory",children:"Create a new project and directory:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"pnpm create vite my-project\ncd my-project\n"})}),"\n",(0,r.jsx)(t.h4,{id:"set-the-correct-node-version",children:"Set the correct Node version:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"echo 18.17.1 > .nvmrc && nvm use\n"})}),"\n",(0,r.jsx)(t.p,{children:"Check that it runs locally:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"cd my-project\npnpm install\npnpm run dev\n"})}),"\n",(0,r.jsx)(t.h4,{id:"prettier",children:"Prettier"}),"\n",(0,r.jsx)(t.p,{children:"Add a .prettierrc file:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"echo {} > .prettierrc\n"})}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-json",children:'{\n  "tabWidth": 2,\n  "useTabs": false,\n  "printWidth": 120\n}\n'})}),"\n",(0,r.jsx)(t.h4,{id:"pnpm",children:"PNPM"}),"\n",(0,r.jsx)(t.p,{children:"Only allow PNPM, in package.json:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-json",children:'{\n  "scripts": {\n    "preinstall": "npx only-allow pnpm"\n  }\n}\n'})}),"\n",(0,r.jsx)(t.h4,{id:"commitizen",children:"Commitizen"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"commitizen init cz-conventional-changelog --pnpm --save-dev --save-exact\n"})})]})}function d(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}},4824:(e,t,n)=>{n.d(t,{R:()=>c,x:()=>s});var r=n(9474);const i={},a=r.createContext(i);function c(e){const t=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),r.createElement(a.Provider,{value:t},e.children)}}}]);