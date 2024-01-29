import { defineConfig } from "cypress";

export default defineConfig({
  video: true,
  viewportWidth: 1920,
  viewportHeight: 1080,
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.name === "chrome" && browser.isHeadless) {
          launchOptions.args.push("--window-size=1920,1080");
        }

        return launchOptions;
      });
    },
  },
});
