// vite.config.ts
import { defineConfig, loadEnv } from "file:///app/node_modules/vite/dist/node/index.js";
import react from "file:///app/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tailwindcss from "file:///app/node_modules/tailwindcss/lib/index.js";
import tsconfigPaths from "file:///app/node_modules/vite-tsconfig-paths/dist/index.js";
import { TanStackRouterVite } from "file:///app/node_modules/@tanstack/router-plugin/dist/esm/vite.js";
import removeConsole from "file:///app/node_modules/vite-plugin-remove-console/dist/index.mjs";
function getHostFromUrl(url) {
  return url?.replace(/^https?:\/\//, "");
}
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log(`vite_api_url: ${env.VITE_API_URL}`);
  return {
    plugins: [
      TanStackRouterVite({
        routesDirectory: "./src/app/routes",
        generatedRouteTree: "./src/app/routeTree.gen.ts"
      }),
      react(),
      tsconfigPaths(),
      removeConsole()
    ],
    css: {
      postcss: {
        plugins: [tailwindcss()]
      }
    },
    server: {
      host: "0.0.0.0",
      port: 5173,
      watch: {
        usePolling: true,
        interval: 1e3
      },
      hmr: {
        protocol: "wss",
        clientPort: 443,
        path: "hmr/"
      },
      allowedHosts: [getHostFromUrl(env.VITE_API_URL)]
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvYXBwL2FwcHMvZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9hcHAvYXBwcy9mcm9udGVuZC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vYXBwL2FwcHMvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XHJcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tIFwidGFpbHdpbmRjc3NcIjtcclxuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcclxuaW1wb3J0IHsgVGFuU3RhY2tSb3V0ZXJWaXRlIH0gZnJvbSBcIkB0YW5zdGFjay9yb3V0ZXItcGx1Z2luL3ZpdGVcIjtcclxuaW1wb3J0IHJlbW92ZUNvbnNvbGUgZnJvbSBcInZpdGUtcGx1Z2luLXJlbW92ZS1jb25zb2xlXCI7XHJcblxyXG5mdW5jdGlvbiBnZXRIb3N0RnJvbVVybCh1cmw6IHN0cmluZykge1xyXG4gIC8vIFx1QzgxNVx1QUREQ1x1QzJERFx1Qzc0NCBcdUMwQUNcdUM2QTlcdUQ1NzQgaHR0cDovLyBcdUI2MTBcdUIyOTQgaHR0cHM6Ly8gXHVENTA0XHVCODVDXHVEMUEwXHVDRjVDXHVDNzQ0IFx1QzgxQ1x1QUM3MFx1RDU1OFx1QUNFMFxyXG4gIC8vIFx1RDYzOFx1QzJBNFx1RDJCOCBcdUM3NzRcdUI5ODRcdUI5Q0MgXHVCQzE4XHVENjU4XHJcbiAgcmV0dXJuIHVybD8ucmVwbGFjZSgvXmh0dHBzPzpcXC9cXC8vLCBcIlwiKTtcclxufVxyXG4vLyBodHRwczovL3ZpdGUuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xyXG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSk7XHJcbiAgY29uc29sZS5sb2coYHZpdGVfYXBpX3VybDogJHtlbnYuVklURV9BUElfVVJMfWApO1xyXG4gIHJldHVybiB7XHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIFRhblN0YWNrUm91dGVyVml0ZSh7XHJcbiAgICAgICAgcm91dGVzRGlyZWN0b3J5OiBcIi4vc3JjL2FwcC9yb3V0ZXNcIixcclxuICAgICAgICBnZW5lcmF0ZWRSb3V0ZVRyZWU6IFwiLi9zcmMvYXBwL3JvdXRlVHJlZS5nZW4udHNcIixcclxuICAgICAgfSksXHJcbiAgICAgIHJlYWN0KCksXHJcbiAgICAgIHRzY29uZmlnUGF0aHMoKSxcclxuICAgICAgcmVtb3ZlQ29uc29sZSgpLFxyXG4gICAgXSxcclxuICAgIGNzczoge1xyXG4gICAgICBwb3N0Y3NzOiB7XHJcbiAgICAgICAgcGx1Z2luczogW3RhaWx3aW5kY3NzKCldLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBob3N0OiBcIjAuMC4wLjBcIixcclxuICAgICAgcG9ydDogNTE3MyxcclxuICAgICAgd2F0Y2g6IHtcclxuICAgICAgICB1c2VQb2xsaW5nOiB0cnVlLFxyXG4gICAgICAgIGludGVydmFsOiAxMDAwLFxyXG4gICAgICB9LFxyXG4gICAgICBobXI6IHtcclxuICAgICAgICBwcm90b2NvbDogXCJ3c3NcIixcclxuICAgICAgICBjbGllbnRQb3J0OiA0NDMsXHJcbiAgICAgICAgcGF0aDogXCJobXIvXCIsXHJcbiAgICAgIH0sXHJcbiAgICAgIGFsbG93ZWRIb3N0czogW2dldEhvc3RGcm9tVXJsKGVudi5WSVRFX0FQSV9VUkwpXSxcclxuICAgIH0sXHJcbiAgfTtcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd08sU0FBUyxjQUFjLGVBQWU7QUFDOVEsT0FBTyxXQUFXO0FBQ2xCLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sbUJBQW1CO0FBQzFCLFNBQVMsMEJBQTBCO0FBQ25DLE9BQU8sbUJBQW1CO0FBRTFCLFNBQVMsZUFBZSxLQUFhO0FBR25DLFNBQU8sS0FBSyxRQUFRLGdCQUFnQixFQUFFO0FBQ3hDO0FBRUEsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksQ0FBQztBQUN2QyxVQUFRLElBQUksaUJBQWlCLElBQUksWUFBWSxFQUFFO0FBQy9DLFNBQU87QUFBQSxJQUNMLFNBQVM7QUFBQSxNQUNQLG1CQUFtQjtBQUFBLFFBQ2pCLGlCQUFpQjtBQUFBLFFBQ2pCLG9CQUFvQjtBQUFBLE1BQ3RCLENBQUM7QUFBQSxNQUNELE1BQU07QUFBQSxNQUNOLGNBQWM7QUFBQSxNQUNkLGNBQWM7QUFBQSxJQUNoQjtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gsU0FBUztBQUFBLFFBQ1AsU0FBUyxDQUFDLFlBQVksQ0FBQztBQUFBLE1BQ3pCO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsWUFBWTtBQUFBLFFBQ1osVUFBVTtBQUFBLE1BQ1o7QUFBQSxNQUNBLEtBQUs7QUFBQSxRQUNILFVBQVU7QUFBQSxRQUNWLFlBQVk7QUFBQSxRQUNaLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQSxjQUFjLENBQUMsZUFBZSxJQUFJLFlBQVksQ0FBQztBQUFBLElBQ2pEO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
