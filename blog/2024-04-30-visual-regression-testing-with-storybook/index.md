---
slug: visual-regression-testing-with-storybook
title: Visual Regression Testing with Storybook
authors: johnathan
tags:
  - storybook
  - playwright
  - visual-regression-testing
  - mock-service-worker
---

Playwright can take screenshots of a webpage which form the basis of visual regression testing and detect regressions. Storybook gives us a way to view components in isolation and test them in different states. By combining the two we can create a visual regression testing suite that can be run on every commit to ensure that changes to components do not introduce visual bugs.

<!-- truncate -->

## Setting up MSW in Storybook

Install MSW from https://mswjs.io/docs/getting-started/install

Setup a worker with an initial configuration. https://mswjs.io/docs/api/setup-worker/. Sets up a requests interception in the browser with the given request handlers.


```ts
// browser.ts
import { HttpResponse, http } from "msw";
import { setupWorker } from "msw/browser";

export const worker = setupWorker(
  // block requests to rudderstack
  http.get("https://api.rudderstack.com/*", () => {
    // brute-force blocking all requests to Rudderstack metrics
    return HttpResponse.json({ message: "Rudderstack is blocked when running in Storybook" });
  }),
);
```

Start the worker in the `preview.tsx` file.

```ts
// preview.tsx
import { worker } from "./mocks/browser";

const apiOrigins = [
  // @ts-ignore
  import.meta.env.VITE_API_BASE_URL,
  // @ts-ignore
  import.meta.env.VITE_DATA_BUCKET_BASE_URL,
  "https://fs.blast.tv",
];

worker.start({
  // https://mswjs.io/docs/api/setup-worker/start#onunhandledrequest
  onUnhandledRequest(request, print) {
    const url = new URL(request.url);

    // storybook requests
    if (["http://localhost:6006", "http://127.0.0.1:6006"].includes(url.origin)) {
      return; // OK to let these requests through to the server
    }
    // image asset requests
    // @ts-ignore
    if ([import.meta.env.VITE_ASSETS_BASE_URL].includes(url.origin)) {
      return; // OK to let these requests through to the server
    }

    // requests to our API
    if (apiOrigins.includes(url.origin)) {
      console.info(`Storybook is fetching from our API... consider adding a mock for ${request.url}`);
      return; // OK to let these requests through to the server
    }

    // allow local requests (built storybook assets)
    if (request.url.startsWith("/")) {
      return;
    }

    // else block these requests
    // we don't want to make real requests to 3rd party services (ads, tracking, etc)
    print.error();
    return;
  },
});
```

With that set up we can write a Storybook story that uses the MSW worker to mock requests and provide some mock data.

```tsx
// stories.tsx
export const BracketsTeamsPrizes: Story = {
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      worker.resetHandlers();
      worker.use(
        http.get("https://api.blast.tv/v2/tournaments/dacha-dubai-2024", () => {
          return HttpResponse.json(tournaments_dacha_dubai_2024);
        }),
        http.get("https://api.blast.tv/v2/tournaments/dacha-dubai-2024/teams", () => {
          return HttpResponse.json(tournaments_dacha_dubai_2024_teams);
        }),
        http.get("https://api.blast.tv/v2/games/dota/tournaments/dacha-dubai-2024/brackets", () => {
          return HttpResponse.json(tournaments_dacha_dubai_2024_brackets);
        }),
        http.get("https://api.blast.tv/v2/tournaments/prizes/dacha-dubai-2024", () => {
          return HttpResponse.json(tournaments_dacha_dubai_2024_prizes);
        }),
        http.get("https://data.blast.tv/homepage/dota/tournament-timeline.json", () => {
          return HttpResponse.json(tournaments_timeline);
        }),
        http.get("https://fs.blast.tv/api/v1/flags/", () => {
          return HttpResponse.json([
            {
              feature: {
                name: "dota",
              },
              enabled: true,
            },
          ]);
        }),
      );

      return (
        <ReactQueryClient>
          <ApiProvider ddsDisabled>
            <AuthModalProvider>
              <AuthProvider>
                <MemoryRouter initialEntries={["/dota/tournaments/dacha-dubai-2024"]}>
                  <GameIdContext.Provider
                    value={{
                      allGameIds: ["cs", "dota", "rl"],
                      enabledGames: ["dota"],
                      gameId: "dota",
                    }}
                  >
                    <Routes>
                      <Route path="/dota/tournaments/:tournamentId" element={<Story />} />
                    </Routes>
                  </GameIdContext.Provider>
                </MemoryRouter>
              </AuthProvider>
            </AuthModalProvider>
          </ApiProvider>
        </ReactQueryClient>
      );
    },
  ],
};
```

You can also mock loading states and errors.

```tsx
// stories.tsx
worker.use(
  http.get("https://api.blast.tv/v2/tournaments/dacha-dubai-2024", async () => {
    await delay("infinite");
  }),
);
```

```tsx
// stories.tsx
worker.use(
  http.get("https://api.blast.tv/v2/tournaments/dacha-dubai-2024", () => {
    return HttpResponse.error();
  }),
);
```

It's also possible to mock functions that are calling out to 3rd party services. This is cleaner than attempting to mock the API response the service expects. I'm using Vite aliases to point to the mock file...

```tsx
// main.ts
const config: StorybookConfig = {
  ...
  async viteFinal(config, options) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          "../../rudderstack": path.resolve(__dirname, "./mocks/rudderstack.js"),
        },
      },
    });
  },
};
```



## Setting up Playwright

Install Playwright as per their instructions https://playwright.dev/docs/intro#installing-playwright.

In playwright.config.ts I specify to look for tests in vrt.test.ts files, and to save the screenshots in a directory named `__screenshots__` in the same directory as the test file.

I also specify a web server to run before the tests. This is useful for running Storybook in a local dev environment.

```ts
// playwright.config.ts
export default defineConfig({
  testDir: "./src",
  // match files named vrt.test.ts
  testMatch: /vrt\.test\.ts/,
  snapshotPathTemplate: "{testDir}/{testFileDir}/__screenshots__/{arg}-{platform}-{projectName}{ext}",
  ...

    /* Run your local dev server before starting the tests */
  webServer: {
    command: "pnpm storybook:start",
    url: "http://localhost:6006",
    reuseExistingServer: !process.env.CI,
  },
```

I've added some npm scripts that will build the Storybook static files and serve them with a local web server.

```json
// package.json
{
  "scripts": {
    "storybook:build": "storybook build --test",
    "storybook:serve": "pnpm dlx http-server -p 6006 storybook-static",
    "storybook:start": "rm -rf storybook-static && pnpm storybook:build && pnpm storybook:serve"
  }
}
```

Then a test file has just a few lines of code to take a screenshot of the Storybook page and compare it to a reference image.

```ts
// vrt.test.ts
import { test, expect } from "@playwright/test";
import { loadStory } from "../../../../tests/loadStory";

test("Dota Tournament Page", async ({ page }) => {
  await loadStory(page, "tournaments-dotatournamentpage--brackets-teams-prizes");
  await expect(page).toHaveScreenshot({
    fullPage: true,
  });
});
```

The `loadStory` function is a helper function that navigates to the Storybook page and waits for the component to load.

```ts
import * as Playwright from "@playwright/test";

/** Load Storybook story for Playwright testing */
export async function loadStory(page: Playwright.Page, storyId: string) {
  const search = new URLSearchParams({ id: storyId, viewMode: "story" });
  await page.goto(`http://localhost:6006/iframe.html?${search.toString()}`, {
    waitUntil: "networkidle",
  });

  // wait for page to finish rendering before starting test
  await page.waitForSelector("#storybook-root");
}
```

## A Manual Workflow

To run the tests manually, run the Playwright tests with `pnpm playwright test`. This will start the Storybook server, run the tests, and save the screenshots in the `__screenshots__` directory. The images can be committed to the repository and used as reference images for future tests.

When changing Playwright configuration, it's useful to clean-up existing screenshots with `pnpm test:vrt:remove-screenshots`.


```json
// package.json
{
  "scripts": {
    "test:vrt": "pnpm playwright test --update-snapshots",
    "test:vrt:remove-screenshots": "find src -type d -name '__screenshots__' -exec rm -rf {} +",
  }
}
```

## Automating the Workflow

