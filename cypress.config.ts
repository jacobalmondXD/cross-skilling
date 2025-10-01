import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";

export default defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com/",
    excludeSpecPattern: ["cypress/e2e/unused/**/*"],
    specPattern: ["**/*.feature", "**/*.cy.{js,jsx,ts,tsx}"],

    env: {
      "cypress-cucumber-preprocessor": {
        nonGlobalStepDefinitions: true,
        stepDefinitions: [
          "cypress/e2e/saucedemo/step_definitions/**/*.{js,ts}",
        ],
      },
    },
    async setupNodeEvents(on, config) {
      // implement node event listeners hereπ
      // Add the Cucumber preprocessor plugin
      await addCucumberPreprocessorPlugin(on, config);

      // Use esbuild for bundling
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // Return the updated config
      return config;
    },
  },
});
