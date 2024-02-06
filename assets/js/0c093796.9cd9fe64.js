"use strict";(self.webpackChunkjohnathan_sewell=self.webpackChunkjohnathan_sewell||[]).push([[65],{9613:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var r=n(9496);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),u=c(n),d=i,m=u["".concat(l,".").concat(d)]||u[d]||h[d]||o;return n?r.createElement(m,s(s({ref:t},p),{},{components:n})):r.createElement(m,s({ref:t},p))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,s=new Array(o);s[0]=d;var a={};for(var l in t)hasOwnProperty.call(t,l)&&(a[l]=t[l]);a.originalType=e,a[u]="string"==typeof e?e:i,s[1]=a;for(var c=2;c<o;c++)s[c]=n[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6327:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>h,frontMatter:()=>o,metadata:()=>a,toc:()=>c});var r=n(7605),i=(n(9496),n(9613));const o={slug:"intersection-observer-transitions",title:"Intersection Observer for Simple Transitions",authors:"johnathan",tags:["intersection observer"]},s=void 0,a={permalink:"/intersection-observer-transitions",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2023-11-20-intersection-observer-transitions.md",source:"@site/blog/2023-11-20-intersection-observer-transitions.md",title:"Intersection Observer for Simple Transitions",description:"Intersection Observer for Simple Transition",date:"2023-11-20T00:00:00.000Z",formattedDate:"November 20, 2023",tags:[{label:"intersection observer",permalink:"/tags/intersection-observer"}],readingTime:1.955,hasTruncateMarker:!1,authors:[{name:"Johnathan Sewell",title:"Software Engineer",url:"https://github.com/johnathan-sewell",imageURL:"https://avatars.githubusercontent.com/u/286782?v=4",key:"johnathan"}],frontMatter:{slug:"intersection-observer-transitions",title:"Intersection Observer for Simple Transitions",authors:"johnathan",tags:["intersection observer"]},prevItem:{title:"React Compound Component for shared layout",permalink:"/compound-component-for-shared-layout"},nextItem:{title:"Vite Project Setup",permalink:"/vite-project-setup"}},l={authorsImageUrls:[void 0]},c=[{value:"Intersection Observer for Simple Transition",id:"intersection-observer-for-simple-transition",level:3},{value:"The Intersection Observer",id:"the-intersection-observer",level:4},{value:"Intersection Observer for Header Opacity",id:"intersection-observer-for-header-opacity",level:4}],p={toc:c},u="wrapper";function h(e){let{components:t,...o}=e;return(0,i.kt)(u,(0,r.Z)({},p,o,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h3",{id:"intersection-observer-for-simple-transition"},"Intersection Observer for Simple Transition"),(0,i.kt)("p",null,"Given a ",(0,i.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/CSS/position#sticky"},'"sticky"')," header which must transition from opaque to transparent when the user scrolls the page content up, we can use the ",(0,i.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API"},"Intersection Observer API")," to trigger the transition."),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Sticky header fading as content is scrolled up",src:n(5604).Z,width:"1528",height:"1186"})),(0,i.kt)("h4",{id:"the-intersection-observer"},"The Intersection Observer"),(0,i.kt)("p",null,"The Intersection Observer is given a target element and triggers a callback when the target element is visible in the viewport. The primary use case is for lazy loading images and ads, as well as for infinite scrolling."),(0,i.kt)("p",null,"Intersection observer is a performant alternative to listening for scroll events, because it offloads the work to the browser. The browser will optimize the work by batching the callbacks and throttling the events."),(0,i.kt)("h4",{id:"intersection-observer-for-header-opacity"},"Intersection Observer for Header Opacity"),(0,i.kt)("p",null,'In our case, we create a hidden div overlay on the header (our intersection "target") and trigger the callback when that target div is being scrolled up and exiting the viewport.'),(0,i.kt)("p",null,"I'm using ",(0,i.kt)("inlineCode",{parentName:"p"},"useIntersectionObserver")," from ",(0,i.kt)("a",{parentName:"p",href:"https://usehooks-ts.com/react-hook/use-intersection-observer"},"usehooks-ts")," which simplifies using the Intersection Observer API in React."),(0,i.kt)("p",null,"The returned ",(0,i.kt)("inlineCode",{parentName:"p"},"entry")," object from the hook contains the ",(0,i.kt)("inlineCode",{parentName:"p"},"intersectionRatio")," which is a value between 0 and 1, where 0 is the target is not visible and 1 is the target is fully visible. We can use this value to set the opacity of the header."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'import { useIntersectionObserver } from "usehooks-ts";\nimport { useRef } from "react";\n\nexport const App = () => {\n  const ref = useRef<HTMLDivElement>(null);\n\n  const entry = useIntersectionObserver(ref, {\n    root: null,\n    threshold: Array.from({ length: 100 }).map((_, i) => i / 100), // calls back at 1% intersections [0, 0.01, 0.02, ... 0.99, 1]\n    rootMargin: "0px",\n  });\n\n  return (\n    <div>\n      <header\n        style={{\n          opacity: entry?.intersectionRatio,\n          backgroundColor: "#81a9ff",\n          color: "#fff",\n          height: "200px",\n          position: "sticky",\n          display: "flex",\n          justifyContent: "center",\n          alignItems: "center",\n          top: 0,\n          zIndex: -1,\n        }}\n      >\n        Header\n      </header>\n\n      <div\n        ref={ref}\n        style={{\n          height: "200px",\n          position: "absolute",\n          top: 0,\n          width: "100%",\n          color: "#000",\n          border: "2px solid #000",\n        }}\n      >\n        Intersection Target (Hidden)\n      </div>\n\n      {Array.from({ length: 10 }).map((_, idx) => (\n        <p style={{ padding: "60px" }} key={idx}>\n          Lorum ipsum dolor sit amet, consectetur adipiscing elit. Donec eu\n          semper nunc. Sed euismod, nisl quis lacinia ultricies, nunc libero\n          tincidunt nunc, quis aliquam nunc nisl quis nunc. Donec vitae nisl\n          eget nunc ultricies aliquam.\n        </p>\n      ))}\n    </div>\n  );\n};\n')),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Screenshot with hidden element",src:n(3573).Z,width:"1442",height:"932"})),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Screenshot 2 with hidden element",src:n(4124).Z,width:"1448",height:"948"})),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://stackblitz-starters-saun4d.stackblitz.io/"},"Run this on StackBlitz")))}h.isMDXComponent=!0},3573:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/Screenshot1-7e9d6eeaed704aba3ebe96e430f30f06.png"},4124:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/Screenshot2-683379504d6386becbfa9831f6af33b1.png"},5604:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/images/scroll-transition-a6e24f169cc1d44b3c22ae50e53f86b2.gif"}}]);