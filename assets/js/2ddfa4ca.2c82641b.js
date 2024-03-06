"use strict";(self.webpackChunkjohnathan_sewell=self.webpackChunkjohnathan_sewell||[]).push([[5145],{9613:(e,r,t)=>{t.d(r,{Zo:()=>p,kt:()=>g});var n=t(9496);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function s(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function i(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=n.createContext({}),c=function(e){var r=n.useContext(l),t=r;return e&&(t="function"==typeof e?e(r):s(s({},r),e)),t},p=function(e){var r=c(e.components);return n.createElement(l.Provider,{value:r},e.children)},u="mdxType",h={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},d=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),u=c(t),d=a,g=u["".concat(l,".").concat(d)]||u[d]||h[d]||o;return t?n.createElement(g,s(s({ref:r},p),{},{components:t})):n.createElement(g,s({ref:r},p))}));function g(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=t.length,s=new Array(o);s[0]=d;var i={};for(var l in r)hasOwnProperty.call(r,l)&&(i[l]=r[l]);i.originalType=e,i[u]="string"==typeof e?e:a,s[1]=i;for(var c=2;c<o;c++)s[c]=t[c];return n.createElement.apply(null,s)}return n.createElement.apply(null,t)}d.displayName="MDXCreateElement"},1602:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>l,contentTitle:()=>s,default:()=>h,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var n=t(7605),a=(t(9496),t(9613));const o={slug:"logging-frontend-api-layer",title:"Logging in the Frontend API layer",authors:"johnathan",tags:["react","tanstack query","axios"]},s=void 0,i={permalink:"/logging-frontend-api-layer",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2024-03-06-logging-frontend-api-layer.md",source:"@site/blog/2024-03-06-logging-frontend-api-layer.md",title:"Logging in the Frontend API layer",description:"Handle Axios Errors Consistently in 1 Place with Interceptors",date:"2024-03-06T00:00:00.000Z",formattedDate:"March 6, 2024",tags:[{label:"react",permalink:"/tags/react"},{label:"tanstack query",permalink:"/tags/tanstack-query"},{label:"axios",permalink:"/tags/axios"}],readingTime:2.48,hasTruncateMarker:!1,authors:[{name:"Johnathan Sewell",title:"Software Engineer",url:"https://github.com/johnathan-sewell",imageURL:"https://avatars.githubusercontent.com/u/286782?v=4",key:"johnathan"}],frontMatter:{slug:"logging-frontend-api-layer",title:"Logging in the Frontend API layer",authors:"johnathan",tags:["react","tanstack query","axios"]},nextItem:{title:"Using Intersection Observer to Create Scroll Shadows",permalink:"/using-intersection-observer-scroll-shadows"}},l={authorsImageUrls:[void 0]},c=[{value:"Handle Axios Errors Consistently in 1 Place with Interceptors",id:"handle-axios-errors-consistently-in-1-place-with-interceptors",level:2},{value:"Handle TanStack Query Errors Consistently in 1 Place",id:"handle-tanstack-query-errors-consistently-in-1-place",level:2},{value:"What to log",id:"what-to-log",level:2}],p={toc:c},u="wrapper";function h(e){let{components:r,...o}=e;return(0,a.kt)(u,(0,n.Z)({},p,o,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"handle-axios-errors-consistently-in-1-place-with-interceptors"},"Handle Axios Errors Consistently in 1 Place with Interceptors"),(0,a.kt)("p",null,"To log errors in the API layer, we can use Axios interceptors. Interceptors are functions that Axios calls for every request and response. We can use interceptors to log errors, and to handle errors in a consistent way."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'import * as Sentry from "@sentry/browser";\nimport { AxiosError } from "axios";\n\n/**\n * Interceptor function that logs errors and captures exceptions using Sentry.\n * @param error - The AxiosError object representing the error.\n * @returns A rejected Promise with the error object.\n */\nexport const loggingInterceptor = (error: AxiosError) => {\n  /* Log 4xx errors, as they are likely to be client issues that are actionable.\n  4xx errors are expected in some cases. Use validateStatus to ignore on individual requests */\n  if (\n    error.response?.status &&\n    error.response.status >= 400 &&\n    error.response.status < 500\n  ) {\n    Sentry.captureException(error);\n  }\n\n  /* Do not log network errors, as they are likely to be client issues that are not actionable. */\n  /* Do not log 5xx errors, as they are likely to be server issues, and will be logged by the server. */\n  return Promise.reject(error);\n};\n')),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Use an interceptor for Axios error handling",src:t(6532).Z,width:"1888",height:"1376"})),(0,a.kt)("h2",{id:"handle-tanstack-query-errors-consistently-in-1-place"},"Handle TanStack Query Errors Consistently in 1 Place"),(0,a.kt)("p",null,"When something goes wrong in a query, for example a Zod parsing error, it throws an error. We can use the ",(0,a.kt)("inlineCode",{parentName:"p"},"onError")," option to handle these errors consistently in one place."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'import * as Sentry from "@sentry/browser";\nimport { QueryCache, QueryClient } from "@tanstack/react-query";\n\nconst queryClient = new QueryClient({\n  queryCache: new QueryCache({\n    onError: (error) => {\n      // capture all ZodErrors with Sentry\n      if (error instanceof z.ZodError) {\n        console.error(error); // helpful for debugging zod errors\n        Sentry.captureException(error);\n      }\n    },\n  }),\n});\n')),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"TanStack Query and Axios and where to log errors",src:t(8301).Z,width:"3840",height:"1376"})),(0,a.kt)("p",null,"TanStack Query can be configured to throw errors that can be caught with a React Error Boundary. This may be a useful way to respond to data fetching errors in the UI layer."),(0,a.kt)("h2",{id:"what-to-log"},"What to log"),(0,a.kt)("p",null,"There are several types of errors that can occur when making and processing data from HTTP requests. Some of these errors are actionable, and some are not. Here are some examples of errors that are actionable:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"4xx errors: These errors are likely to be client issues, and are actionable. For example, a 404 error indicates that the resource was not found.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"5xx errors: These errors are likely to be server issues, and are not actionable. For example, a 500 error indicates that the server encountered an unexpected condition.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"Data parsing errors: These errors are likely to be client issues, and are actionable. For example, a Zod parsing error indicates that the data from the server does not match the expected schema.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"Network errors: These errors are likely to be client issues, and are not actionable. For example, a network error indicates that the client is not connected to the internet."))),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"types of errors and whether to log them",src:t(9285).Z,width:"2784",height:"1504"})))}h.isMDXComponent=!0},6532:(e,r,t)=>{t.d(r,{Z:()=>n});const n=t.p+"assets/images/axios-cad4837c3c342d77adfb57b53e3e4788.png"},8301:(e,r,t)=>{t.d(r,{Z:()=>n});const n=t.p+"assets/images/full-19e099aa10c3e605f612673ae483def3.png"},9285:(e,r,t)=>{t.d(r,{Z:()=>n});const n=t.p+"assets/images/what-to-log-c07c9c2a5ccea88cf95b5477416f9f2d.png"}}]);