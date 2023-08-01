"use strict";(self.webpackChunkjohnathan_sewell=self.webpackChunkjohnathan_sewell||[]).push([[877],{7730:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>r,contentTitle:()=>o,default:()=>h,frontMatter:()=>s,metadata:()=>i,toc:()=>u});var l=n(2564),a=(n(9496),n(9613));const s={slug:"hls-quality-selector",title:"Building a Quality Selector for HLS.js in React",authors:"johnathan",tags:["hls.js","react"]},o=void 0,i={permalink:"/hls-quality-selector",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2023-08-01-hls-quality-selector.md",source:"@site/blog/2023-08-01-hls-quality-selector.md",title:"Building a Quality Selector for HLS.js in React",description:"A React hook to get and set the quality of an HLS.js video",date:"2023-08-01T00:00:00.000Z",formattedDate:"August 1, 2023",tags:[{label:"hls.js",permalink:"/tags/hls-js"},{label:"react",permalink:"/tags/react"}],readingTime:2.215,hasTruncateMarker:!1,authors:[{name:"Johnathan Sewell",title:"Software Engineer",url:"https://github.com/johnathan-sewell",imageURL:"https://avatars.githubusercontent.com/u/286782?v=4",key:"johnathan"}],frontMatter:{slug:"hls-quality-selector",title:"Building a Quality Selector for HLS.js in React",authors:"johnathan",tags:["hls.js","react"]}},r={authorsImageUrls:[void 0]},u=[{value:"A React hook to get and set the quality of an HLS.js video",id:"a-react-hook-to-get-and-set-the-quality-of-an-hlsjs-video",level:3},{value:"Building the UI",id:"building-the-ui",level:3},{value:"Positioning the popup with Popper.js",id:"positioning-the-popup-with-popperjs",level:4},{value:"Add some styling with Tailwind CSS",id:"add-some-styling-with-tailwind-css",level:4},{value:"Finally add a transition",id:"finally-add-a-transition",level:4}],p={toc:u},d="wrapper";function h(e){let{components:t,...s}=e;return(0,a.kt)(d,(0,l.Z)({},p,s,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h3",{id:"a-react-hook-to-get-and-set-the-quality-of-an-hlsjs-video"},"A React hook to get and set the quality of an HLS.js video"),(0,a.kt)("p",null,"To get and set the video quality we need to listen to the hls.js events and also set the ",(0,a.kt)("inlineCode",{parentName:"p"},"currentLevel")," property on the hls instance."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},'import Hls, { LevelSwitchedData, ManifestParsedData } from "hls.js";\nimport { useEffect, useMemo, useState } from "react";\n\nexport const AUTO = -1;\n\nexport interface Level {\n  height: number;\n  index: number;\n}\n\nexport const useHlsQualityLevels = ({ hls }: { hls: Hls | null }) => {\n  const [levels, setLevels] = useState<Level[]>();\n  const [currentLevelIndex, setCurrentLevelIndex] = useState<number>(AUTO);\n  const [isAutoLevelEnabled, setIsAutoLevelEnabled] = useState<boolean>(true);\n\n  useEffect(() => {\n    if (!hls) return;\n\n    function onLevelSwitched(eventName: string, data: LevelSwitchedData) {\n      setCurrentLevelIndex(data.level);\n    }\n\n    function onManifestParsed(eventName: string, data: ManifestParsedData) {\n      const mappedLevels = data.levels.map((level, index) => ({\n        height: level.height,\n        index,\n      }));\n      const sortedLevels = mappedLevels.sort((a, b) => b.height - a.height);\n      setLevels(sortedLevels);\n    }\n\n    hls.on(Hls.Events.LEVEL_SWITCHED, onLevelSwitched);\n    hls.on(Hls.Events.MANIFEST_PARSED, onManifestParsed);\n\n    return () => {\n      hls.off(Hls.Events.LEVEL_SWITCHED, onLevelSwitched);\n      hls.off(Hls.Events.MANIFEST_PARSED, onManifestParsed);\n    };\n  }, [hls]);\n\n  const handleQualityChange = useMemo(() => {\n    return hls !== null\n      ? (level: number) => {\n          setIsAutoLevelEnabled(level === AUTO);\n          hls.currentLevel = level;\n        }\n      : () => undefined;\n  }, [hls]);\n\n  return {\n    levels,\n    isAutoLevelEnabled,\n    currentLevelIndex,\n    handleQualityChange,\n  };\n};\n')),(0,a.kt)("p",null,"And I use this to pass level information to a React component like this:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},"const {\n  levels = [],\n  currentLevelIndex,\n  isAutoLevelEnabled,\n  handleQualityChange,\n} = useHlsQualityLevels({ hls });\n\nreturn (\n  <QualityLevelsButton\n    levels={levels}\n    currentLevelIndex={currentLevelIndex}\n    isAutoLevelEnabled={isAutoLevelEnabled}\n    onQualityChanged={handleQualityChange}\n  />\n);\n")),(0,a.kt)("h3",{id:"building-the-ui"},"Building the UI"),(0,a.kt)("p",null,"Create a popup menu with a button that shows the current quality level and a list of quality levels to choose from. I'm using ",(0,a.kt)("a",{parentName:"p",href:"https://headlessui.com/react/popover"},"Headless UI")," for this."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},'<Popover>\n  <Popover.Button>\n    {levels.find((level) => level.index === currentLevelIndex)?.height ??\n      "Auto"}\n  </Popover.Button>\n  <Popover.Panel>\n    {levels.map((level) => (\n      <Popover.Button\n        key={level.index}\n        onClick={() => onQualityChanged(level.index)}\n      >\n        {level.height}\n      </Popover.Button>\n    ))}\n    <Popover.Button onClick={() => onQualityChanged(-1)}>Auto</Popover.Button>\n  </Popover.Panel>\n</Popover>\n')),(0,a.kt)("p",null,"This results in a functional but not pretty UI:"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Headless UI",src:n(5935).Z,width:"610",height:"198"})),(0,a.kt)("h4",{id:"positioning-the-popup-with-popperjs"},"Positioning the popup with Popper.js"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},'const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>();\nconst [popperElement, setPopperElement] = useState<HTMLDivElement | null>();\nconst { styles, attributes } = usePopper(referenceElement, popperElement, {\n  placement: "top",\n  modifiers: [\n    {\n      name: "offset",\n      options: {\n        offset: [0, 10],\n      },\n    },\n  ],\n});\n\nreturn (\n  <Popover className="relative">\n    <Popover.Button ref={setReferenceElement}>\n      {levels.find((level) => level.index === currentLevelIndex)?.height ?? "Auto"}\n    </Popover.Button>\n    <Popover.Panel ref={setPopperElement} style={styles.popper} {...attributes.popper}>\n      {levels.map((level) => (\n        <Popover.Button key={level.index} onClick={() => onQualityChanged(level.index)}>\n          {level.height}\n        </Popover.Button>\n      ))}\n      <Popover.Button onClick={() => onQualityChanged(-1)}>Auto</Popover.Button>\n    </Popover.Panel>\n  </Popover>\n);\n')),(0,a.kt)("p",null,"The popup is now positioned correctly:"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Popper JS",src:n(8686).Z,width:"338",height:"404"})),(0,a.kt)("h4",{id:"add-some-styling-with-tailwind-css"},"Add some styling with Tailwind CSS"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Styled Popup",src:n(7111).Z,width:"562",height:"480"})),(0,a.kt)("h4",{id:"finally-add-a-transition"},"Finally add a transition"),(0,a.kt)("p",null,"Using the ",(0,a.kt)("a",{parentName:"p",href:"https://headlessui.com/react/transition"},"Transition element from Headless UI")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},'import { Transition } from "@headlessui/react";\n\n<Transition\n  as={Fragment}\n  enter="transition-opacity ease-out duration-500"\n  enterFrom="opacity-0"\n  enterTo="opacity-100"\n  leave="transition-opacity ease-in duration-200"\n  leaveFrom="opacity-100"\n  leaveTo="opacity-0"\n>\n  <Popover.Panel>/* ... */</Popover.Panel>\n</Transition>;\n')))}h.isMDXComponent=!0},5935:(e,t,n)=>{n.d(t,{Z:()=>l});const l=n.p+"assets/images/headlessui-9de1e5b3bcda71cd41442a0bb397ffe0.png"},8686:(e,t,n)=>{n.d(t,{Z:()=>l});const l=n.p+"assets/images/popper-a82114359b1004df4f379e1d61832548.png"},7111:(e,t,n)=>{n.d(t,{Z:()=>l});const l=n.p+"assets/images/styled-881d0c8787cb567c1ef4af2b5bccb8da.png"}}]);