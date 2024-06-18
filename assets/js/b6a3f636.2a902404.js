"use strict";(self.webpackChunkjohnathan_sewell=self.webpackChunkjohnathan_sewell||[]).push([[760],{2812:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>r,contentTitle:()=>a,default:()=>u,frontMatter:()=>o,metadata:()=>i,toc:()=>d});var l=t(3274),s=t(4824);const o={slug:"hls-quality-selector",title:"Building a Quality Selector for HLS.js in React",authors:"johnathan"},a=void 0,i={permalink:"/hls-quality-selector",source:"@site/blog/2023-08-01-hls-quality-selector/index.md",title:"Building a Quality Selector for HLS.js in React",description:"Building an HLS.js video player quality selector in React.",date:"2023-08-01T00:00:00.000Z",tags:[],readingTime:2.275,hasTruncateMarker:!0,authors:[{name:"Johnathan Sewell",url:"https://github.com/johnathan-sewell",imageURL:"https://avatars.githubusercontent.com/u/286782?v=4",key:"johnathan"}],frontMatter:{slug:"hls-quality-selector",title:"Building a Quality Selector for HLS.js in React",authors:"johnathan"},unlisted:!1,prevItem:{title:"Module Federation",permalink:"/module-federation"}},r={authorsImageUrls:[void 0]},d=[{value:"A React hook to get and set the quality of an HLS.js video",id:"a-react-hook-to-get-and-set-the-quality-of-an-hlsjs-video",level:3},{value:"Building the UI",id:"building-the-ui",level:3},{value:"Positioning the popup with Popper.js",id:"positioning-the-popup-with-popperjs",level:4},{value:"Add some styling with Tailwind CSS",id:"add-some-styling-with-tailwind-css",level:4},{value:"Finally add a transition",id:"finally-add-a-transition",level:4}];function h(e){const n={a:"a",code:"code",h3:"h3",h4:"h4",img:"img",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.p,{children:"Building an HLS.js video player quality selector in React."}),"\n",(0,l.jsx)(n.h3,{id:"a-react-hook-to-get-and-set-the-quality-of-an-hlsjs-video",children:"A React hook to get and set the quality of an HLS.js video"}),"\n",(0,l.jsxs)(n.p,{children:["To get and set the video quality we need to listen to the hls.js events and also set the ",(0,l.jsx)(n.code,{children:"currentLevel"})," property on the hls instance."]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",children:'import Hls, { LevelSwitchedData, ManifestParsedData } from "hls.js";\nimport { useEffect, useMemo, useState } from "react";\n\nexport const AUTO = -1;\n\nexport interface Level {\n  height: number;\n  index: number;\n}\n\nexport const useHlsQualityLevels = ({ hls }: { hls: Hls | null }) => {\n  const [levels, setLevels] = useState<Level[]>();\n  const [currentLevelIndex, setCurrentLevelIndex] = useState<number>(AUTO);\n  const [isAutoLevelEnabled, setIsAutoLevelEnabled] = useState<boolean>(true);\n\n  useEffect(() => {\n    if (!hls) return;\n\n    function onLevelSwitched(eventName: string, data: LevelSwitchedData) {\n      setCurrentLevelIndex(data.level);\n    }\n\n    function onManifestParsed(eventName: string, data: ManifestParsedData) {\n      const mappedLevels = data.levels.map((level, index) => ({\n        height: level.height,\n        index,\n      }));\n      const sortedLevels = mappedLevels.sort((a, b) => b.height - a.height);\n      setLevels(sortedLevels);\n    }\n\n    hls.on(Hls.Events.LEVEL_SWITCHED, onLevelSwitched);\n    hls.on(Hls.Events.MANIFEST_PARSED, onManifestParsed);\n\n    return () => {\n      hls.off(Hls.Events.LEVEL_SWITCHED, onLevelSwitched);\n      hls.off(Hls.Events.MANIFEST_PARSED, onManifestParsed);\n    };\n  }, [hls]);\n\n  const handleQualityChange = useMemo(() => {\n    return hls !== null\n      ? (level: number) => {\n          setIsAutoLevelEnabled(level === AUTO);\n          hls.currentLevel = level;\n        }\n      : () => undefined;\n  }, [hls]);\n\n  return {\n    levels,\n    isAutoLevelEnabled,\n    currentLevelIndex,\n    handleQualityChange,\n  };\n};\n'})}),"\n",(0,l.jsx)(n.p,{children:"And I use this to pass level information to a React component like this:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",children:"const {\n  levels = [],\n  currentLevelIndex,\n  isAutoLevelEnabled,\n  handleQualityChange,\n} = useHlsQualityLevels({ hls });\n\nreturn (\n  <QualityLevelsButton\n    levels={levels}\n    currentLevelIndex={currentLevelIndex}\n    isAutoLevelEnabled={isAutoLevelEnabled}\n    onQualityChanged={handleQualityChange}\n  />\n);\n"})}),"\n",(0,l.jsx)(n.h3,{id:"building-the-ui",children:"Building the UI"}),"\n",(0,l.jsxs)(n.p,{children:["Create a popup menu with a button that shows the current quality level and a list of quality levels to choose from. I'm using ",(0,l.jsx)(n.a,{href:"https://headlessui.com/react/popover",children:"Headless UI"})," for this."]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",children:'<Popover>\n  <Popover.Button>\n    {levels.find((level) => level.index === currentLevelIndex)?.height ??\n      "Auto"}\n  </Popover.Button>\n  <Popover.Panel>\n    {levels.map((level) => (\n      <Popover.Button\n        key={level.index}\n        onClick={() => onQualityChanged(level.index)}\n      >\n        {level.height}\n      </Popover.Button>\n    ))}\n    <Popover.Button onClick={() => onQualityChanged(-1)}>Auto</Popover.Button>\n  </Popover.Panel>\n</Popover>\n'})}),"\n",(0,l.jsx)(n.p,{children:"This results in a functional but not pretty UI:"}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.img,{alt:"Headless UI",src:t(7663).A+"",width:"610",height:"198"})}),"\n",(0,l.jsx)(n.h4,{id:"positioning-the-popup-with-popperjs",children:"Positioning the popup with Popper.js"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",children:'const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>();\nconst [popperElement, setPopperElement] = useState<HTMLDivElement | null>();\nconst { styles, attributes } = usePopper(referenceElement, popperElement, {\n  placement: "top",\n  modifiers: [\n    {\n      name: "offset",\n      options: {\n        offset: [0, 10],\n      },\n    },\n  ],\n});\n\nreturn (\n  <Popover className="relative">\n    <Popover.Button ref={setReferenceElement}>\n      {levels.find((level) => level.index === currentLevelIndex)?.height ?? "Auto"}\n    </Popover.Button>\n    <Popover.Panel ref={setPopperElement} style={styles.popper} {...attributes.popper}>\n      {levels.map((level) => (\n        <Popover.Button key={level.index} onClick={() => onQualityChanged(level.index)}>\n          {level.height}\n        </Popover.Button>\n      ))}\n      <Popover.Button onClick={() => onQualityChanged(-1)}>Auto</Popover.Button>\n    </Popover.Panel>\n  </Popover>\n);\n'})}),"\n",(0,l.jsx)(n.p,{children:"The popup is now positioned correctly:"}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.img,{alt:"Popper JS",src:t(1066).A+"",width:"338",height:"404"})}),"\n",(0,l.jsx)(n.h4,{id:"add-some-styling-with-tailwind-css",children:"Add some styling with Tailwind CSS"}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.img,{alt:"Styled Popup",src:t(7709).A+"",width:"562",height:"480"})}),"\n",(0,l.jsx)(n.h4,{id:"finally-add-a-transition",children:"Finally add a transition"}),"\n",(0,l.jsxs)(n.p,{children:["Using the ",(0,l.jsx)(n.a,{href:"https://headlessui.com/react/transition",children:"Transition element from Headless UI"})]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",children:'import { Transition } from "@headlessui/react";\n\n<Transition\n  as={Fragment}\n  enter="transition-opacity ease-out duration-500"\n  enterFrom="opacity-0"\n  enterTo="opacity-100"\n  leave="transition-opacity ease-in duration-200"\n  leaveFrom="opacity-100"\n  leaveTo="opacity-0"\n>\n  <Popover.Panel>/* ... */</Popover.Panel>\n</Transition>;\n'})})]})}function u(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(h,{...e})}):h(e)}},7663:(e,n,t)=>{t.d(n,{A:()=>l});const l=t.p+"assets/images/headlessui-9de1e5b3bcda71cd41442a0bb397ffe0.png"},1066:(e,n,t)=>{t.d(n,{A:()=>l});const l=t.p+"assets/images/popper-a82114359b1004df4f379e1d61832548.png"},7709:(e,n,t)=>{t.d(n,{A:()=>l});const l=t.p+"assets/images/styled-881d0c8787cb567c1ef4af2b5bccb8da.png"},4824:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>i});var l=t(9474);const s={},o=l.createContext(s);function a(e){const n=l.useContext(o);return l.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),l.createElement(o.Provider,{value:n},e.children)}}}]);