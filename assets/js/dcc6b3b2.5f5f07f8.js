"use strict";(self.webpackChunkjohnathan_sewell=self.webpackChunkjohnathan_sewell||[]).push([[914],{835:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>d,frontMatter:()=>s,metadata:()=>a,toc:()=>l});var r=t(3274),i=t(4824);const s={slug:"intersection-observer-transitions",title:"Intersection Observer for Simple Transitions",authors:"johnathan"},o=void 0,a={permalink:"/intersection-observer-transitions",source:"@site/blog/2023-11-20-intersection-observer-transitions/index.md",title:"Intersection Observer for Simple Transitions",description:"Using the Intersection Observer API to trigger transitions.",date:"2023-11-20T00:00:00.000Z",tags:[],readingTime:2.01,hasTruncateMarker:!0,authors:[{name:"Johnathan Sewell",url:"https://github.com/johnathan-sewell",imageURL:"https://avatars.githubusercontent.com/u/286782?v=4",key:"johnathan"}],frontMatter:{slug:"intersection-observer-transitions",title:"Intersection Observer for Simple Transitions",authors:"johnathan"},unlisted:!1,prevItem:{title:"React Compound Component Pattern",permalink:"/compound-component"},nextItem:{title:"Vite Project Setup",permalink:"/vite-project-setup"}},c={authorsImageUrls:[void 0]},l=[{value:"Intersection Observer for Simple Transition",id:"intersection-observer-for-simple-transition",level:3},{value:"The Intersection Observer",id:"the-intersection-observer",level:4},{value:"Intersection Observer for Header Opacity",id:"intersection-observer-for-header-opacity",level:4}];function h(e){const n={a:"a",code:"code",h3:"h3",h4:"h4",img:"img",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.p,{children:"Using the Intersection Observer API to trigger transitions."}),"\n",(0,r.jsx)(n.h3,{id:"intersection-observer-for-simple-transition",children:"Intersection Observer for Simple Transition"}),"\n",(0,r.jsxs)(n.p,{children:["Given a ",(0,r.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/position#sticky",children:'"sticky"'})," header which must transition from opaque to transparent when the user scrolls the page content up, we can use the ",(0,r.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API",children:"Intersection Observer API"})," to trigger the transition."]}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{alt:"Sticky header fading as content is scrolled up",src:t(537).A+"",width:"1528",height:"1186"})}),"\n",(0,r.jsx)(n.h4,{id:"the-intersection-observer",children:"The Intersection Observer"}),"\n",(0,r.jsx)(n.p,{children:"The Intersection Observer is given a target element and triggers a callback when the target element is visible in the viewport. The primary use case is for lazy loading images and ads, as well as for infinite scrolling."}),"\n",(0,r.jsx)(n.p,{children:"Intersection observer is a performant alternative to listening for scroll events, because it offloads the work to the browser. The browser will optimize the work by batching the callbacks and throttling the events."}),"\n",(0,r.jsx)(n.h4,{id:"intersection-observer-for-header-opacity",children:"Intersection Observer for Header Opacity"}),"\n",(0,r.jsx)(n.p,{children:'In our case, we create a hidden div overlay on the header (our intersection "target") and trigger the callback when that target div is being scrolled up and exiting the viewport.'}),"\n",(0,r.jsxs)(n.p,{children:["I'm using ",(0,r.jsx)(n.code,{children:"useIntersectionObserver"})," from ",(0,r.jsx)(n.a,{href:"https://usehooks-ts.com/react-hook/use-intersection-observer",children:"usehooks-ts"})," which simplifies using the Intersection Observer API in React."]}),"\n",(0,r.jsxs)(n.p,{children:["The returned ",(0,r.jsx)(n.code,{children:"entry"})," object from the hook contains the ",(0,r.jsx)(n.code,{children:"intersectionRatio"})," which is a value between 0 and 1, where 0 is the target is not visible and 1 is the target is fully visible. We can use this value to set the opacity of the header."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:'import { useIntersectionObserver } from "usehooks-ts";\nimport { useRef } from "react";\n\nexport const App = () => {\n  const ref = useRef<HTMLDivElement>(null);\n\n  const entry = useIntersectionObserver(ref, {\n    root: null,\n    threshold: Array.from({ length: 100 }).map((_, i) => i / 100), // calls back at 1% intersections [0, 0.01, 0.02, ... 0.99, 1]\n    rootMargin: "0px",\n  });\n\n  return (\n    <div>\n      <header\n        style={{\n          opacity: entry?.intersectionRatio,\n          backgroundColor: "#81a9ff",\n          color: "#fff",\n          height: "200px",\n          position: "sticky",\n          display: "flex",\n          justifyContent: "center",\n          alignItems: "center",\n          top: 0,\n          zIndex: -1,\n        }}\n      >\n        Header\n      </header>\n\n      <div\n        ref={ref}\n        style={{\n          height: "200px",\n          position: "absolute",\n          top: 0,\n          width: "100%",\n          color: "#000",\n          border: "2px solid #000",\n        }}\n      >\n        Intersection Target (Hidden)\n      </div>\n\n      {Array.from({ length: 10 }).map((_, idx) => (\n        <p style={{ padding: "60px" }} key={idx}>\n          Lorum ipsum dolor sit amet, consectetur adipiscing elit. Donec eu\n          semper nunc. Sed euismod, nisl quis lacinia ultricies, nunc libero\n          tincidunt nunc, quis aliquam nunc nisl quis nunc. Donec vitae nisl\n          eget nunc ultricies aliquam.\n        </p>\n      ))}\n    </div>\n  );\n};\n'})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{alt:"Screenshot with hidden element",src:t(6250).A+"",width:"1442",height:"932"})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.img,{alt:"Screenshot 2 with hidden element",src:t(6833).A+"",width:"1448",height:"948"})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://stackblitz-starters-saun4d.stackblitz.io/",children:"Run this on StackBlitz"})})]})}function d(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},6250:(e,n,t)=>{t.d(n,{A:()=>r});const r=t.p+"assets/images/Screenshot1-7e9d6eeaed704aba3ebe96e430f30f06.png"},6833:(e,n,t)=>{t.d(n,{A:()=>r});const r=t.p+"assets/images/Screenshot2-683379504d6386becbfa9831f6af33b1.png"},537:(e,n,t)=>{t.d(n,{A:()=>r});const r=t.p+"assets/images/scroll-transition-a6e24f169cc1d44b3c22ae50e53f86b2.gif"},4824:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>a});var r=t(9474);const i={},s=r.createContext(i);function o(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);