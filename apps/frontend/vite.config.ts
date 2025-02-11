import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import removeConsole from "vite-plugin-remove-console";

function getHostFromUrl(url: string) {
  // 정규식을 사용해 http:// 또는 https:// 프로토콜을 제거하고
  // 호스트 이름만 반환
  return url?.replace(/^https?:\/\//, "");
}
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log(`vite_api_url: ${env.VITE_API_URL}`);
  return {
    plugins: [
      TanStackRouterVite({
        routesDirectory: "./src/app/routes",
        generatedRouteTree: "./src/app/routeTree.gen.ts",
      }),
      react(),
      tsconfigPaths(),
      removeConsole(),
    ],
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
    server: {
      host: "0.0.0.0",
      port: 5173,
      watch: {
        usePolling: true,
        interval: 1000,
      },
      hmr: {
        protocol: "wss",
        clientPort: 443,
        path: "hmr/",
      },
      allowedHosts: [getHostFromUrl(env.VITE_API_URL)],
    },
  };
});
