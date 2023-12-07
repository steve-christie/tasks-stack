import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import eslint from "vite-plugin-eslint";
import IstanbulPlugin from "vite-plugin-istanbul";

const agGridLogs = [
  "****************************************************************************************************************",
  "***************************************** AG Grid Enterprise License *******************************************",
  "****************************************** License Key Not Found ***********************************************",
  "* All AG Grid Enterprise features are unlocked.                                                                *",
  "* This is an evaluation only version, it is not licensed for development projects intended for production.     *",
  "* If you want to hide the watermark, please email info@ag-grid.com for a trial license.                        *",
  "****************************************************************************************************************",
  "****************************************************************************************************************",
];
export default defineConfig((props) => {
  const env = loadEnv(props.mode, process.cwd(), "VITE_APP");
  const envWithProcessPrefix = {
    "process.env": `${JSON.stringify(env)}`,
  };

  return {
    css: {
      preprocessorOptions: {
        less: {
          math: "always",
          relativeUrls: true,
          javascriptEnabled: true,
        },
      },
    },
    base: "",
    plugins: [
      react(),
      viteTsconfigPaths(),
      env.mode !== "test" && eslint(),
      IstanbulPlugin({
        extension: [".ts", ".tsx"],
        exclude: [
          "**/*.d.ts",
          "**/*.js",
          "**/*.spec.ts",
          "src/handler.ts",
          "src/utils/testUtils.tsx",
        ],
      }),
    ],
    server: {
      // this ensures that the browser opens upon server start
      open: true,
      // this sets a default port to 3000
      port: 3000,
    },
    define: {
      ...envWithProcessPrefix,
    },
    test: {
      globals: true,

      onConsoleLog: (log: string): boolean | void => {
        if (agGridLogs.includes(log)) {
          return false;
        }
      },
      environment: "jsdom",
      setupFiles: "./setupTests.ts",
      testTimeout: 10000,
      coverage: {
        provider: "istanbul",
        reporter: ["text", "html", "cobertura"],
        reportsDirectory: "./test_reports/coverage",
      },
      reporters: ["basic", "junit"],
      outputFile: {
        junit: "./test_reports/junit.xml",
      },
    },
  };
});
