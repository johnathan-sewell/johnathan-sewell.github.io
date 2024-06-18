"use strict";(self.webpackChunkjohnathan_sewell=self.webpackChunkjohnathan_sewell||[]).push([[397],{7889:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>l,contentTitle:()=>a,default:()=>d,frontMatter:()=>s,metadata:()=>i,toc:()=>c});var t=n(3274),o=n(4824);const s={slug:"logging-frontend-api-layer",title:"Logging in the Frontend API layer",authors:"johnathan"},a=void 0,i={permalink:"/logging-frontend-api-layer",source:"@site/blog/2024-03-06-logging-frontend-api-layer/index.md",title:"Logging in the Frontend API layer",description:"Logging frontend errors when using Axios and TanStack Query.",date:"2024-03-06T00:00:00.000Z",tags:[],readingTime:2.54,hasTruncateMarker:!0,authors:[{name:"Johnathan Sewell",url:"https://github.com/johnathan-sewell",imageURL:"https://avatars.githubusercontent.com/u/286782?v=4",key:"johnathan"}],frontMatter:{slug:"logging-frontend-api-layer",title:"Logging in the Frontend API layer",authors:"johnathan"},unlisted:!1,prevItem:{title:"React Flow for Elimination Brackets",permalink:"/react-flow"},nextItem:{title:"Using Intersection Observer to Create Scroll Shadows",permalink:"/using-intersection-observer-scroll-shadows"}},l={authorsImageUrls:[void 0]},c=[{value:"Handle Axios Errors Consistently in 1 Place with Interceptors",id:"handle-axios-errors-consistently-in-1-place-with-interceptors",level:2},{value:"Handle TanStack Query Errors Consistently in 1 Place",id:"handle-tanstack-query-errors-consistently-in-1-place",level:2},{value:"What to log",id:"what-to-log",level:2}];function h(e){const r={code:"code",h2:"h2",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.p,{children:"Logging frontend errors when using Axios and TanStack Query."}),"\n",(0,t.jsx)(r.h2,{id:"handle-axios-errors-consistently-in-1-place-with-interceptors",children:"Handle Axios Errors Consistently in 1 Place with Interceptors"}),"\n",(0,t.jsx)(r.p,{children:"To log errors in the API layer, we can use Axios interceptors. Interceptors are functions that Axios calls for every request and response. We can use interceptors to log errors, and to handle errors in a consistent way."}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:'import * as Sentry from "@sentry/browser";\nimport { AxiosError } from "axios";\n\n/**\n * Interceptor function that logs errors and captures exceptions using Sentry.\n * @param error - The AxiosError object representing the error.\n * @returns A rejected Promise with the error object.\n */\nexport const loggingInterceptor = (error: AxiosError) => {\n  /* Log 4xx errors, as they are likely to be client issues that are actionable.\n  4xx errors are expected in some cases. Use validateStatus to ignore on individual requests */\n  if (\n    error.response?.status &&\n    error.response.status >= 400 &&\n    error.response.status < 500\n  ) {\n    Sentry.captureException(error);\n  }\n\n  /* Do not log network errors, as they are likely to be client issues that are not actionable. */\n  /* Do not log 5xx errors, as they are likely to be server issues, and will be logged by the server. */\n  return Promise.reject(error);\n};\n'})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.img,{alt:"Use an interceptor for Axios error handling",src:n(2135).A+"",width:"1888",height:"1376"})}),"\n",(0,t.jsx)(r.h2,{id:"handle-tanstack-query-errors-consistently-in-1-place",children:"Handle TanStack Query Errors Consistently in 1 Place"}),"\n",(0,t.jsxs)(r.p,{children:["When something goes wrong in a query, for example a Zod parsing error, it throws an error. We can use the ",(0,t.jsx)(r.code,{children:"onError"})," option to handle these errors consistently in one place."]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-ts",children:'import * as Sentry from "@sentry/browser";\nimport { QueryCache, QueryClient } from "@tanstack/react-query";\n\nconst queryClient = new QueryClient({\n  queryCache: new QueryCache({\n    onError: (error) => {\n      // capture all ZodErrors with Sentry\n      if (error instanceof z.ZodError) {\n        console.error(error); // helpful for debugging zod errors\n        Sentry.captureException(error);\n      }\n    },\n  }),\n});\n'})}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.img,{alt:"TanStack Query and Axios and where to log errors",src:n(4710).A+"",width:"3840",height:"1376"})}),"\n",(0,t.jsx)(r.p,{children:"TanStack Query can be configured to throw errors that can be caught with a React Error Boundary. This may be a useful way to respond to data fetching errors in the UI layer."}),"\n",(0,t.jsx)(r.h2,{id:"what-to-log",children:"What to log"}),"\n",(0,t.jsx)(r.p,{children:"There are several types of errors that can occur when making and processing data from HTTP requests. Some of these errors are actionable, and some are not. Here are some examples of errors that are actionable:"}),"\n",(0,t.jsxs)(r.ul,{children:["\n",(0,t.jsxs)(r.li,{children:["\n",(0,t.jsx)(r.p,{children:"4xx errors: These errors are likely to be client issues, and are actionable. For example, a 404 error indicates that the resource was not found."}),"\n"]}),"\n",(0,t.jsxs)(r.li,{children:["\n",(0,t.jsx)(r.p,{children:"5xx errors: These errors are likely to be server issues, and are not actionable. For example, a 500 error indicates that the server encountered an unexpected condition."}),"\n"]}),"\n",(0,t.jsxs)(r.li,{children:["\n",(0,t.jsx)(r.p,{children:"Data parsing errors: These errors are likely to be client issues, and are actionable. For example, a Zod parsing error indicates that the data from the server does not match the expected schema."}),"\n"]}),"\n",(0,t.jsxs)(r.li,{children:["\n",(0,t.jsx)(r.p,{children:"Network errors: These errors are likely to be client issues, and are not actionable. For example, a network error indicates that the client is not connected to the internet."}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(r.p,{children:(0,t.jsx)(r.img,{alt:"types of errors and whether to log them",src:n(5556).A+"",width:"2784",height:"1504"})})]})}function d(e={}){const{wrapper:r}={...(0,o.R)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},2135:(e,r,n)=>{n.d(r,{A:()=>t});const t=n.p+"assets/images/axios-cad4837c3c342d77adfb57b53e3e4788.png"},4710:(e,r,n)=>{n.d(r,{A:()=>t});const t=n.p+"assets/images/full-19e099aa10c3e605f612673ae483def3.png"},5556:(e,r,n)=>{n.d(r,{A:()=>t});const t=n.p+"assets/images/what-to-log-c07c9c2a5ccea88cf95b5477416f9f2d.png"},4824:(e,r,n)=>{n.d(r,{R:()=>a,x:()=>i});var t=n(9474);const o={},s=t.createContext(o);function a(e){const r=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function i(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),t.createElement(s.Provider,{value:r},e.children)}}}]);