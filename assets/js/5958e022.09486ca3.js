"use strict";(self.webpackChunkjohnathan_sewell=self.webpackChunkjohnathan_sewell||[]).push([[4891],{9613:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>h});var r=n(9496);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var a=r.createContext({}),c=function(e){var t=r.useContext(a),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(a.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,s=e.originalType,a=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),d=c(n),f=o,h=d["".concat(a,".").concat(f)]||d[f]||u[f]||s;return n?r.createElement(h,l(l({ref:t},p),{},{components:n})):r.createElement(h,l({ref:t},p))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var s=n.length,l=new Array(s);l[0]=f;var i={};for(var a in t)hasOwnProperty.call(t,a)&&(i[a]=t[a]);i.originalType=e,i[d]="string"==typeof e?e:o,l[1]=i;for(var c=2;c<s;c++)l[c]=n[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},4272:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>a,contentTitle:()=>l,default:()=>u,frontMatter:()=>s,metadata:()=>i,toc:()=>c});var r=n(7605),o=(n(9496),n(9613));const s={slug:"using-intersection-observer-scroll-shadows",title:"Using Intersection Observer to Create Scroll Shadows",authors:"johnathan",tags:["react","intersection-observer"]},l=void 0,i={permalink:"/using-intersection-observer-scroll-shadows",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2024-02-09-using-intersection-observer-scroll-shadows.md",source:"@site/blog/2024-02-09-using-intersection-observer-scroll-shadows.md",title:"Using Intersection Observer to Create Scroll Shadows",description:"Using Intersection Observer to Create Scroll Shadows",date:"2024-02-09T00:00:00.000Z",formattedDate:"February 9, 2024",tags:[{label:"react",permalink:"/tags/react"},{label:"intersection-observer",permalink:"/tags/intersection-observer"}],readingTime:2.025,hasTruncateMarker:!1,authors:[{name:"Johnathan Sewell",title:"Software Engineer",url:"https://github.com/johnathan-sewell",imageURL:"https://avatars.githubusercontent.com/u/286782?v=4",key:"johnathan"}],frontMatter:{slug:"using-intersection-observer-scroll-shadows",title:"Using Intersection Observer to Create Scroll Shadows",authors:"johnathan",tags:["react","intersection-observer"]},prevItem:{title:"Logging in the Frontend API layer",permalink:"/logging-frontend-api-layer"},nextItem:{title:"React Compound Component Pattern",permalink:"/compound-component"}},a={authorsImageUrls:[void 0]},c=[{value:"Using Intersection Observer to Create Scroll Shadows",id:"using-intersection-observer-to-create-scroll-shadows",level:3},{value:"Intersection Observer",id:"intersection-observer",level:4},{value:"A Component with Scroll Shadows",id:"a-component-with-scroll-shadows",level:4}],p={toc:c},d="wrapper";function u(e){let{components:t,...s}=e;return(0,o.kt)(d,(0,r.Z)({},p,s,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h3",{id:"using-intersection-observer-to-create-scroll-shadows"},"Using Intersection Observer to Create Scroll Shadows"),(0,o.kt)("h4",{id:"intersection-observer"},"Intersection Observer"),(0,o.kt)("p",null,"The ",(0,o.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API"},"Intersection Observer API")," provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element."),(0,o.kt)("h4",{id:"a-component-with-scroll-shadows"},"A Component with Scroll Shadows"),(0,o.kt)("p",null,"Here's a simple scrollable component."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'export function Timeline() {\n  return (\n    <>\n      <div className="relative">\n        <div className="timeline-hidden-scrollbars relative flex gap-[6px] overflow-x-auto rounded-[3px] border border-solid border-timeline-border bg-timeline-background-100 p-1">\n          {Array.from({ length: 15 }).map((_, index) => (\n            <div\n              key={index}\n              className="h-[30px] min-w-[30px] rounded-[2px] bg-yellow-300"\n            ></div>\n          ))}\n        </div>\n      </div>\n    </>\n  );\n}\n')),(0,o.kt)("p",null,"Link to video: ",(0,o.kt)("a",{target:"_blank",href:n(858).Z},"Simple component without scroll shadows")),(0,o.kt)("p",null,"And with the Intersection Observer API we can create a shadow effect when the component is scrolled."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import { useScrollObservers } from "./hooks/useScrollObservers";\n\nconst ScrollShadowLeft = () => (\n  <svg\n    xmlns="http://www.w3.org/2000/svg"\n    width="35"\n    height="36"\n    viewBox="0 0 35 36"\n    className="absolute left-px z-10 h-full min-w-[30px]"\n  >\n    <path d="M0 36L35 36L35 0L0 0L0 36Z" fill="url(#g0)" />\n    <defs>\n      <linearGradient\n        id="g0"\n        x1="0"\n        y1="13.9592"\n        x2="35"\n        y2="13.9592"\n        gradientUnits="userSpaceOnUse"\n      >\n        <stop offset="0.109375" stopColor="#1F0C19" />\n        <stop offset="0.494792" stopColor="#1F0C19" stopOpacity="0.9" />\n        <stop offset="1" stopColor="#1F0C19" stopOpacity="0" />\n      </linearGradient>\n    </defs>\n  </svg>\n);\n\nconst ScrollShadowRight = () => (\n  <svg\n    xmlns="http://www.w3.org/2000/svg"\n    width="35"\n    height="36"\n    viewBox="0 0 35 36"\n    className="absolute right-px top-0 z-10 h-full min-w-[30px] rotate-180"\n  >\n    <path d="M0 36L35 36L35 0L0 0L0 36Z" fill="url(#g1)" />\n    <defs>\n      <linearGradient\n        id="g1"\n        x1="0"\n        y1="13.9592"\n        x2="35"\n        y2="13.9592"\n        gradientUnits="userSpaceOnUse"\n      >\n        <stop offset="0.109375" stopColor="#1F0C19" />\n        <stop offset="0.494792" stopColor="#1F0C19" stopOpacity="0.9" />\n        <stop offset="1" stopColor="#1F0C19" stopOpacity="0" />\n      </linearGradient>\n    </defs>\n  </svg>\n);\n\nexport function Timeline() {\n  const {\n    rootRef,\n    leftScrollRef,\n    rightScrollRef,\n    isScrolledLeft,\n    isScrolledRight,\n  } = useScrollObservers();\n\n  return (\n    // intersection parent\n    <div className={"relative"} ref={rootRef}>\n      {isScrolledLeft && <ScrollShadowLeft />}\n\n      <div className="timeline-hidden-scrollbars relative flex gap-[6px] overflow-x-auto rounded-[3px] border border-solid border-timeline-border bg-timeline-background-100 p-1">\n        {/* intersection element */}\n        <div className="-ml-1 h-[30px]" ref={leftScrollRef}></div>\n\n        {Array.from({ length: 15 }).map((_, index) => (\n          <div\n            key={index}\n            className="h-[30px] min-w-[30px] rounded-[2px] bg-yellow-300"\n          ></div>\n        ))}\n\n        {/* intersection element */}\n        <div className="-mr-1 h-[30px]" ref={rightScrollRef}></div>\n      </div>\n\n      {isScrolledRight && <ScrollShadowRight />}\n    </div>\n  );\n}\n')),(0,o.kt)("p",null,"And the useScrollObservers hook..."),(0,o.kt)("p",null,"I'm using the ",(0,o.kt)("a",{parentName:"p",href:"https://usehooks-ts.com/react-hook/use-intersection-observer"},"usehooks-ts")," library for the useIntersectionObserver hook."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import { useRef } from "react";\nimport { useIntersectionObserver } from "usehooks-ts";\n\nexport const useScrollObservers = () => {\n  const leftScrollRef = useRef<HTMLDivElement>(null);\n  const rightScrollRef = useRef<HTMLDivElement>(null);\n  const rootRef = useRef<HTMLDivElement>(null);\n\n  const leftScrollEntry = useIntersectionObserver(leftScrollRef, {\n    root: rootRef.current,\n  });\n  const rightScrollEntry = useIntersectionObserver(rightScrollRef, {\n    root: rootRef.current,\n  });\n\n  const isScrolledLeft =\n    leftScrollEntry && leftScrollEntry.intersectionRatio < 1;\n  const isScrolledRight =\n    rightScrollEntry && rightScrollEntry.intersectionRatio < 1;\n\n  return {\n    rootRef,\n    leftScrollRef,\n    rightScrollRef,\n    isScrolledLeft,\n    isScrolledRight,\n  };\n};\n')),(0,o.kt)("p",null,"Link to video: ",(0,o.kt)("a",{target:"_blank",href:n(6940).Z},"Component with scroll shadows")))}u.isMDXComponent=!0},858:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/files/1-07d56f50c8b2473a5580b3951dabebdf.webm"},6940:(e,t,n)=>{n.d(t,{Z:()=>r});const r=n.p+"assets/files/2-06a3089a4ad9f3e3171064bfd318f113.webm"}}]);