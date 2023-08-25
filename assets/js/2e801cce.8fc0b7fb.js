"use strict";(self.webpackChunkjohnathan_sewell=self.webpackChunkjohnathan_sewell||[]).push([[450],{6029:e=>{e.exports=JSON.parse('{"blogPosts":[{"id":"vite-project-setup","metadata":{"permalink":"/vite-project-setup","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2023-08-25-new-vite-project-setup.md","source":"@site/blog/2023-08-25-new-vite-project-setup.md","title":"Vite Project Setup","description":"Set the correct Node version:","date":"2023-08-25T00:00:00.000Z","formattedDate":"August 25, 2023","tags":[{"label":"docusaurus","permalink":"/tags/docusaurus"}],"readingTime":0.47,"hasTruncateMarker":false,"authors":[{"name":"Johnathan Sewell","title":"Software Engineer","url":"https://github.com/johnathan-sewell","imageURL":"https://avatars.githubusercontent.com/u/286782?v=4","key":"johnathan"}],"frontMatter":{"slug":"vite-project-setup","title":"Vite Project Setup","authors":"johnathan","tags":["docusaurus"]},"nextItem":{"title":"Simple Static Site Deployment to AWS with CDK","permalink":"/static-site-deployment-with-cdk"}},"content":"#### Set the correct Node version:\\n\\n```bash\\necho 18.17.1 > .nvmrc && nvm use\\n```\\n\\n#### Create a new project and directory:\\n\\n```bash\\npnpm create vite my-project --template ts-react\\n```\\n\\nCheck that it runs locally:\\n\\n```bash\\ncd my-project\\npnpm install\\npnpm run dev\\n```\\n\\n#### Prettier\\n\\nAdd a .prettierrc file:\\n\\n```bash\\necho {} > .prettierrc\\n```\\n\\n```json\\n{\\n  \\"tabWidth\\": 2,\\n  \\"useTabs\\": false,\\n  \\"printWidth\\": 120\\n}\\n```\\n\\n#### PNPM\\n\\nOnly allow PNPM, in package.json:\\n\\n```json\\n{\\n  \\"scripts\\": {\\n    \\"preinstall\\": \\"npx only-allow pnpm\\"\\n  }\\n}\\n```\\n\\n#### Commitizen\\n\\n```bash\\ncommitizen init cz-conventional-changelog --pnpm --save-dev --save-exact\\n```"},{"id":"static-site-deployment-with-cdk","metadata":{"permalink":"/static-site-deployment-with-cdk","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2023-08-04-static-site-deployment-with-cdk.md","source":"@site/blog/2023-08-04-static-site-deployment-with-cdk.md","title":"Simple Static Site Deployment to AWS with CDK","description":"What is CDK?","date":"2023-08-04T00:00:00.000Z","formattedDate":"August 4, 2023","tags":[{"label":"cdk aws","permalink":"/tags/cdk-aws"}],"readingTime":4.46,"hasTruncateMarker":false,"authors":[{"name":"Johnathan Sewell","title":"Software Engineer","url":"https://github.com/johnathan-sewell","imageURL":"https://avatars.githubusercontent.com/u/286782?v=4","key":"johnathan"}],"frontMatter":{"slug":"static-site-deployment-with-cdk","title":"Simple Static Site Deployment to AWS with CDK","authors":"johnathan","tags":["cdk aws"]},"prevItem":{"title":"Vite Project Setup","permalink":"/vite-project-setup"},"nextItem":{"title":"Module Federation","permalink":"/module-federation"}},"content":"## What is CDK?\\n\\nCDK is a tool for deploying infrastructure to AWS. It allows you to write code that will be translated into CloudFormation templates and used to deploy your infrastructure.\\n\\n## What will we be deploying?\\n\\nA static React application, deployed to S3 and served via CloudFront.\\n\\n## Install the CDK CLI:\\n\\n```bash\\npnpm install -g aws-cdk\\n```\\n\\nIf successful then running `cdk --version` will return a version number.\\n\\n## Project setup\\n\\n- Create an .nvmrc file `echo 18.17.1 > .nvmrc && nvm use`\\n- Create a .prettierrc file `echo {} > .prettierrc`\\n- Initialise pnpm `pnpm init`\\n\\n## Initialise CDK in your project\\n\\nUse the `cdk init` command, to create a CDK project. **This needs to be run in an empty directory.**\\n\\nCreate a subdirectory in your project to keep CDK code separate from application code.\\n\\n```bash\\nmkdir cdk && cd cdk\\ncdk init app --language typescript\\n```\\n\\n**lib/cdk-stack.ts** is where your CDK application\u2019s main stack is defined. This is the file we\u2019ll be spending most of our time in.\\n\\n**bin/cdk.ts** is the entrypoint of the CDK application. It will load the stack defined in lib/cdk-stack.ts.\\n\\n## Add your account details\\n\\nCreate a config file that can read environment variables set during deployment (a Github Workflow) or from a local .env file in cdk/config.ts.\\n\\nYou need to install `zod` and `dotenv`.\\n\\n`pnpm i zod`\\n\\n`pnpm i -D dotenv`\\n\\n<details>\\n<summary>Expand Code</summary>\\n\\n```typescript\\nimport { z } from \\"zod\\";\\nrequire(\\"dotenv\\").config({ path: `.env.local`, override: true });\\n\\nconst envVarsSchema = z.object({\\n  AWS_ACCOUNT: z.string().default(\\"YOUR ACCOUNT ID\\"),\\n  AWS_REGION: z.string().default(\\"eu-central-1\\"),\\n  ENVIRONMENT: z.enum([\\"local\\", \\"development\\", \\"production\\"]),\\n});\\n\\nexport type ApiEnvironment = z.input<typeof envVarsSchema>;\\n\\nconst envVars = envVarsSchema.safeParse(process.env);\\nif (!envVars.success) {\\n  // eslint-disable-next-line no-console\\n  console.error(\\"There is an error with your environment variables.\\");\\n  throw envVars.error;\\n}\\n\\nexport const config = {\\n  environment: envVars.data.ENVIRONMENT,\\n  project: {\\n    context: \\"website\\" as const,\\n    name: \\"frontend\\" as const,\\n  },\\n  shortEnvironment:\\n    envVars.data.ENVIRONMENT === \\"production\\"\\n      ? (\\"prod\\" as const)\\n      : (\\"dev\\" as const),\\n  aws: {\\n    account: envVars.data.AWS_ACCOUNT,\\n    region: envVars.data.AWS_REGION,\\n  },\\n};\\n```\\n\\n</details>\\n\\nUpdate bin/cdk.ts with your account details.\\n\\n<details>\\n<summary>Expand Code</summary>\\n\\n```typescript\\n#!/usr/bin/env node\\nimport \\"source-map-support/register\\";\\nimport * as cdk from \\"aws-cdk-lib\\";\\nimport { CdkStack } from \\"../lib/cdk-stack\\";\\nimport { config } from \\"../config\\";\\n\\nconst app = new cdk.App();\\nconst projectName = `${config.project.context}-${config.project.name}`;\\nconst stackName = `${projectName}-${config.shortEnvironment}`;\\n\\nnew CdkStack(app, stackName, {\\n  stackName,\\n  tags: {\\n    context: config.project.context,\\n    service: config.project.name,\\n    environment: config.environment,\\n  },\\n  env: {\\n    account: config.aws.account,\\n    region: config.aws.region,\\n  },\\n});\\n```\\n\\n</details>\\n\\nAdd local environment variables in `cdk/.env.local`:\\n\\n```bash\\nENVIRONMENT=development\\n```\\n\\n`echo ENVIRONMENT=development > cdk/.env.local`\\n\\n## Add an S3 Bucket to the Stack\\n\\nIn `lib/cdk-stack.ts` add the following code:\\n\\n<details>\\n<summary>Expand Code</summary>\\n\\n```typescript\\nimport * as cdk from \\"aws-cdk-lib\\";\\nimport { Construct } from \\"constructs\\";\\nimport * as s3 from \\"aws-cdk-lib/aws-s3\\";\\nimport { config } from \\"../config\\";\\n\\nexport class CdkStack extends cdk.Stack {\\n  constructor(scope: Construct, id: string, props?: cdk.StackProps) {\\n    super(scope, id, props);\\n\\n    const projectName = `${config.project.context}-${config.project.name}`;\\n\\n    new s3.Bucket(this, `${projectName}-${config.shortEnvironment}`, {\\n      bucketName: `${projectName}-${config.shortEnvironment}`,\\n    });\\n  }\\n}\\n```\\n\\n</details>\\n\\n## Synthesising the CDK app\\n\\nWhen CDK apps are executed, they produce (or \u201csynthesize\u201d) an AWS CloudFormation template for each stack defined in your application.\\n\\nTo synthesize a CDK app, use the `cdk synth` command to create a CloudFormation template in the `cdk.out` directory.\\n\\n```bash\\n( cd cdk && cdk synth )\\n```\\n\\n`cdk deploy` actually synthesises the app before deploying, so you don\'t need to run `synth` before deploying, but it can be useful .\\n\\n## Bootstrapping\\n\\nBootstrapping is the process of provisioning resources for CDK itself, including an Amazon S3 bucket for storing files and IAM roles that grant permissions needed to perform deployments.\\n\\n**This only needs to be done once for your account and region.**\\n\\n```bash\\n( cd cdk && cdk bootstrap )\\n```\\n\\n## Deploying\\n\\n```bash\\n( cd cdk && cdk deploy )\\n```\\n\\nAfter deployment, you should see the new Stack in the [AWS CloudFormation console](https://console.aws.amazon.com/cloudformation/home). And the new Bucket in the [AWS S3 console](https://s3.console.aws.amazon.com/s3/home).\\n\\n## Deploy the built application files\\n\\nNow that we have a bucket to deploy to, we can deploy our application files.\\n\\nAssume we have application build output is in the `dist` directory in the root of the project. We copy the contents of this directory to the S3 bucket by adding an S3 Bucket Deployment to the stack:\\n\\n```typescript\\nnew s3Deployment.BucketDeployment(\\n  this,\\n  `${projectName}-${config.shortEnvironment}-s3-deployment`,\\n  {\\n    sources: [s3Deployment.Source.asset(\\"../dist\\")],\\n    destinationBucket: originBucket,\\n  }\\n);\\n```\\n\\n## Add a CloudFront Distribution\\n\\nWe need to add a CloudFront distribution to serve the files from the S3 bucket.\\n\\n```typescript\\nnew cloudfront.Distribution(\\n  this,\\n  `${projectName}-${config.shortEnvironment}-distribution}`,\\n  {\\n    defaultBehavior: {\\n      origin: new cloudfrontOrigins.S3Origin(originBucket),\\n    },\\n    comment: `${projectName}-${config.shortEnvironment}`,\\n    defaultRootObject: \\"index.html\\",\\n  }\\n);\\n```\\n\\nOnce deployed you should have a Cloudfront distribution serving your website files.\\n\\n![End Result](/img/static-site-deployment-with-cdk/end-result.png)\\n\\nThe complete stack code:\\n\\n```typescript\\nimport * as cdk from \\"aws-cdk-lib\\";\\nimport { Construct } from \\"constructs\\";\\nimport * as cloudfront from \\"aws-cdk-lib/aws-cloudfront\\";\\nimport * as cloudfrontOrigins from \\"aws-cdk-lib/aws-cloudfront-origins\\";\\nimport * as s3Deployment from \\"aws-cdk-lib/aws-s3-deployment\\";\\nimport * as s3 from \\"aws-cdk-lib/aws-s3\\";\\nimport { config } from \\"../config\\";\\n\\nexport class CdkStack extends cdk.Stack {\\n  constructor(scope: Construct, id: string, props?: cdk.StackProps) {\\n    super(scope, id, props);\\n\\n    const projectName = `${config.project.context}-${config.project.name}`;\\n\\n    const originBucket = new s3.Bucket(\\n      this,\\n      `${projectName}-${config.shortEnvironment}`,\\n      {\\n        bucketName: `${projectName}-${config.shortEnvironment}`,\\n      }\\n    );\\n\\n    new s3Deployment.BucketDeployment(\\n      this,\\n      `${projectName}-${config.shortEnvironment}-s3-deployment`,\\n      {\\n        sources: [s3Deployment.Source.asset(\\"../dist\\")],\\n        destinationBucket: originBucket,\\n      }\\n    );\\n\\n    new cloudfront.Distribution(\\n      this,\\n      `${projectName}-${config.shortEnvironment}-distribution}`,\\n      {\\n        defaultBehavior: {\\n          origin: new cloudfrontOrigins.S3Origin(originBucket),\\n        },\\n        comment: `${projectName}-${config.shortEnvironment}`,\\n        defaultRootObject: \\"index.html\\",\\n      }\\n    );\\n  }\\n}\\n```\\n\\n## To clean up and remove the stacks\\n\\nUse `destroy`\\n\\n```\\ncdk destroy\\n```"},{"id":"module-federation","metadata":{"permalink":"/module-federation","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2023-08-02-module-federation.md","source":"@site/blog/2023-08-02-module-federation.md","title":"Module Federation","description":"What is Module Federation?","date":"2023-08-02T00:00:00.000Z","formattedDate":"August 2, 2023","tags":[{"label":"docusaurus","permalink":"/tags/docusaurus"}],"readingTime":2.985,"hasTruncateMarker":false,"authors":[{"name":"Johnathan Sewell","title":"Software Engineer","url":"https://github.com/johnathan-sewell","imageURL":"https://avatars.githubusercontent.com/u/286782?v=4","key":"johnathan"}],"frontMatter":{"slug":"module-federation","title":"Module Federation","authors":"johnathan","tags":["docusaurus"]},"prevItem":{"title":"Simple Static Site Deployment to AWS with CDK","permalink":"/static-site-deployment-with-cdk"},"nextItem":{"title":"Building a Quality Selector for HLS.js in React","permalink":"/hls-quality-selector"}},"content":"## What is Module Federation?\\n\\nModule Federation is a way to share code between applications. It is a feature of Webpack 5 and is also available as a plugin for Vite.\\n\\n## Why use Module Federation?\\n\\nModule Federation allows you to share code between applications. This can be useful if you have a component library that you want to share between applications. It can also be useful if you want to share a single component between applications.\\n\\nThis has benefits over an npm module, including the ability to share state between applications and the ability to share code without publishing to npm.\\n\\n## Create a Project for the Remote Module\\n\\nI\'m using a video player as an example here.\\n\\n#### Create a Vite project\\n\\nFoolow these steps to [setup a new Vite project](./2023-08-25-new-vite-project-setup.md)\\n\\n#### Install the Vite module federation plugin\\n\\n```bash\\npnpm add @originjs/vite-plugin-federation -D\\n```\\n\\n#### Fix the port\\n\\nThis is so that we can point a host application here.\\n\\n```json\\n\\"scripts\\": {\\n    \\"dev\\": \\"vite --port 5001 --strictPort\\",\\n},\\n```\\n\\n#### Create a VideoPlayer component\\n\\n```jsx\\nimport { useState } from \\"react\\";\\n\\nfunction VideoPlayer({ src }) {\\n  const [count, setCount] = useState(0);\\n\\n  return (\\n    <>\\n      <h1>Video Player Module</h1>\\n      <div>\\n        <video width=\\"250\\" autoPlay muted>\\n          <source src={src} type=\\"video/webm\\" />\\n        </video>\\n      </div>\\n\\n      <button onClick={() => setCount((count) => count + 1)}>\\n        count is {count}\\n      </button>\\n    </>\\n  );\\n}\\n\\nexport default VideoPlayer;\\n```\\n\\n#### Configure the Vite module federation plugin\\n\\nAdd the configuration to the plugins array of `vite.config.js`:\\n\\n```js\\nimport { defineConfig } from \\"vite\\";\\nimport react from \\"@vitejs/plugin-react\\";\\nimport basicSsl from \\"@vitejs/plugin-basic-ssl\\";\\nimport federation from \\"@originjs/vite-plugin-federation\\";\\n\\n// https://vitejs.dev/config/\\nexport default defineConfig({\\n  server: {\\n    port: 3000,\\n    https: true,\\n  },\\n  plugins: [\\n    react(),\\n    /* install for local SSL*/\\n    /* pnpm add @vitejs/plugin-basic-ssl -D */\\n    basicSsl(),\\n    federation({\\n      name: \\"video_player_module\\",\\n      // file name for the manifest file, defaults to remoteEntry.js\\n      filename: \\"remoteEntry.js\\",\\n      exposes: {\\n        // expose each component you want to share\\n        // path to the component: name of the component\\n        \\"./VideoPlayer\\": \\"./src/VideoPlayer\\",\\n      },\\n      //  share react and react-dom from the host\\n      shared: [\\"react\\", \\"react-dom\\"],\\n    }),\\n  ],\\n  build: {\\n    outDir: \\"dist\\",\\n    modulePreload: false,\\n    target: \\"esnext\\",\\n    minify: false,\\n    cssCodeSplit: false,\\n  },\\n});\\n```\\n\\n#### Let\'s check that worked...\\n\\n```bash\\npnpm build && pnpm preview\\n```\\n\\nThen browse to \\"https://localhost:5001/assets/remoteEntry.js\\" and you should see a manifest file.\\n\\n![Manifest](/img/module-federation/manifest.png)\\n\\nIt\'s important to note you need to run `pnpm build` to generate the manifest file.\\n\\n## Configure the Host Application\\n\\n#### Install the Vite module federation plugin\\n\\n```bash\\npnpm add @originjs/vite-plugin-federation -D\\n```\\n\\n#### Configure the plugin\\n\\nConfigure the plugin in `vite.config.js` by adding the plugin to the plugins array:\\n\\n```js\\nimport federation from \\"@originjs/vite-plugin-federation\\";\\n\\nexport default defineConfig({\\n  plugins: [\\n    react(),\\n    basicSsl() /* local SSL */,\\n    federation({\\n      name: \\"host\\",\\n      remotes: {\\n        videoPlayerModule: \\"https://localhost:5001/assets/remoteEntry.js\\",\\n      },\\n      shared: [\\"react\\", \\"react-dom\\"], //  share react and react-dom from the host\\n    }),\\n  ],\\n  // ... rest of your config\\n});\\n```\\n\\n#### Import the remote Component into the Host Application\\n\\n```jsx\\nimport { useState } from \\"react\\";\\n// eslint-disable-next-line import/no-unresolved\\nimport VideoPlayer from \\"videoPlayerModule/VideoPlayer\\"; // can use React.lazy here\\n\\nexport default function ModuleFederationPage() {\\n  const [count, setCount] = useState(0);\\n\\n  return (\\n    <>\\n      <h1>Module Federation Host</h1>\\n      <button onClick={() => setCount((count) => count + 1)}>\\n        count is {count}\\n      </button>\\n      <VideoPlayer src=\\"https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm\\" />\\n    </>\\n  );\\n}\\n```\\n\\n#### Add declaration file\\n\\nFor TypeScript, you need to add a declaration file to the host application (declarations.d.ts):\\n\\n```ts\\ndeclare module \\"videoPlayerModule/VideoPlayer\\" {\\n  const VideoPlayer: React.ComponentType<{ src: string }>;\\n  export default VideoPlayer;\\n}\\n```\\n\\n#### Run the Host Application\\n\\nRun the host application and see the remote component working in the host application.\\n\\n```bash\\npnpm start\\n```\\n\\n![End result](/img/module-federation/end-result.png)"},{"id":"hls-quality-selector","metadata":{"permalink":"/hls-quality-selector","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2023-08-01-hls-quality-selector.md","source":"@site/blog/2023-08-01-hls-quality-selector.md","title":"Building a Quality Selector for HLS.js in React","description":"A React hook to get and set the quality of an HLS.js video","date":"2023-08-01T00:00:00.000Z","formattedDate":"August 1, 2023","tags":[{"label":"hls.js","permalink":"/tags/hls-js"},{"label":"react","permalink":"/tags/react"}],"readingTime":2.215,"hasTruncateMarker":false,"authors":[{"name":"Johnathan Sewell","title":"Software Engineer","url":"https://github.com/johnathan-sewell","imageURL":"https://avatars.githubusercontent.com/u/286782?v=4","key":"johnathan"}],"frontMatter":{"slug":"hls-quality-selector","title":"Building a Quality Selector for HLS.js in React","authors":"johnathan","tags":["hls.js","react"]},"prevItem":{"title":"Module Federation","permalink":"/module-federation"}},"content":"### A React hook to get and set the quality of an HLS.js video\\n\\nTo get and set the video quality we need to listen to the hls.js events and also set the `currentLevel` property on the hls instance.\\n\\n```jsx\\nimport Hls, { LevelSwitchedData, ManifestParsedData } from \\"hls.js\\";\\nimport { useEffect, useMemo, useState } from \\"react\\";\\n\\nexport const AUTO = -1;\\n\\nexport interface Level {\\n  height: number;\\n  index: number;\\n}\\n\\nexport const useHlsQualityLevels = ({ hls }: { hls: Hls | null }) => {\\n  const [levels, setLevels] = useState<Level[]>();\\n  const [currentLevelIndex, setCurrentLevelIndex] = useState<number>(AUTO);\\n  const [isAutoLevelEnabled, setIsAutoLevelEnabled] = useState<boolean>(true);\\n\\n  useEffect(() => {\\n    if (!hls) return;\\n\\n    function onLevelSwitched(eventName: string, data: LevelSwitchedData) {\\n      setCurrentLevelIndex(data.level);\\n    }\\n\\n    function onManifestParsed(eventName: string, data: ManifestParsedData) {\\n      const mappedLevels = data.levels.map((level, index) => ({\\n        height: level.height,\\n        index,\\n      }));\\n      const sortedLevels = mappedLevels.sort((a, b) => b.height - a.height);\\n      setLevels(sortedLevels);\\n    }\\n\\n    hls.on(Hls.Events.LEVEL_SWITCHED, onLevelSwitched);\\n    hls.on(Hls.Events.MANIFEST_PARSED, onManifestParsed);\\n\\n    return () => {\\n      hls.off(Hls.Events.LEVEL_SWITCHED, onLevelSwitched);\\n      hls.off(Hls.Events.MANIFEST_PARSED, onManifestParsed);\\n    };\\n  }, [hls]);\\n\\n  const handleQualityChange = useMemo(() => {\\n    return hls !== null\\n      ? (level: number) => {\\n          setIsAutoLevelEnabled(level === AUTO);\\n          hls.currentLevel = level;\\n        }\\n      : () => undefined;\\n  }, [hls]);\\n\\n  return {\\n    levels,\\n    isAutoLevelEnabled,\\n    currentLevelIndex,\\n    handleQualityChange,\\n  };\\n};\\n```\\n\\nAnd I use this to pass level information to a React component like this:\\n\\n```jsx\\nconst {\\n  levels = [],\\n  currentLevelIndex,\\n  isAutoLevelEnabled,\\n  handleQualityChange,\\n} = useHlsQualityLevels({ hls });\\n\\nreturn (\\n  <QualityLevelsButton\\n    levels={levels}\\n    currentLevelIndex={currentLevelIndex}\\n    isAutoLevelEnabled={isAutoLevelEnabled}\\n    onQualityChanged={handleQualityChange}\\n  />\\n);\\n```\\n\\n### Building the UI\\n\\nCreate a popup menu with a button that shows the current quality level and a list of quality levels to choose from. I\'m using [Headless UI](https://headlessui.com/react/popover) for this.\\n\\n```jsx\\n<Popover>\\n  <Popover.Button>\\n    {levels.find((level) => level.index === currentLevelIndex)?.height ??\\n      \\"Auto\\"}\\n  </Popover.Button>\\n  <Popover.Panel>\\n    {levels.map((level) => (\\n      <Popover.Button\\n        key={level.index}\\n        onClick={() => onQualityChanged(level.index)}\\n      >\\n        {level.height}\\n      </Popover.Button>\\n    ))}\\n    <Popover.Button onClick={() => onQualityChanged(-1)}>Auto</Popover.Button>\\n  </Popover.Panel>\\n</Popover>\\n```\\n\\nThis results in a functional but not pretty UI:\\n\\n![Headless UI](/img/hls-quality-selector/headlessui.png)\\n\\n#### Positioning the popup with Popper.js\\n\\n```jsx\\nconst [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>();\\nconst [popperElement, setPopperElement] = useState<HTMLDivElement | null>();\\nconst { styles, attributes } = usePopper(referenceElement, popperElement, {\\n  placement: \\"top\\",\\n  modifiers: [\\n    {\\n      name: \\"offset\\",\\n      options: {\\n        offset: [0, 10],\\n      },\\n    },\\n  ],\\n});\\n\\nreturn (\\n  <Popover className=\\"relative\\">\\n    <Popover.Button ref={setReferenceElement}>\\n      {levels.find((level) => level.index === currentLevelIndex)?.height ?? \\"Auto\\"}\\n    </Popover.Button>\\n    <Popover.Panel ref={setPopperElement} style={styles.popper} {...attributes.popper}>\\n      {levels.map((level) => (\\n        <Popover.Button key={level.index} onClick={() => onQualityChanged(level.index)}>\\n          {level.height}\\n        </Popover.Button>\\n      ))}\\n      <Popover.Button onClick={() => onQualityChanged(-1)}>Auto</Popover.Button>\\n    </Popover.Panel>\\n  </Popover>\\n);\\n```\\n\\nThe popup is now positioned correctly:\\n\\n![Popper JS](/img/hls-quality-selector/popper.png)\\n\\n#### Add some styling with Tailwind CSS\\n\\n![Styled Popup](/img/hls-quality-selector/styled.png)\\n\\n#### Finally add a transition\\n\\nUsing the [Transition element from Headless UI](https://headlessui.com/react/transition)\\n\\n```jsx\\nimport { Transition } from \\"@headlessui/react\\";\\n\\n<Transition\\n  as={Fragment}\\n  enter=\\"transition-opacity ease-out duration-500\\"\\n  enterFrom=\\"opacity-0\\"\\n  enterTo=\\"opacity-100\\"\\n  leave=\\"transition-opacity ease-in duration-200\\"\\n  leaveFrom=\\"opacity-100\\"\\n  leaveTo=\\"opacity-0\\"\\n>\\n  <Popover.Panel>/* ... */</Popover.Panel>\\n</Transition>;\\n```"}]}')}}]);