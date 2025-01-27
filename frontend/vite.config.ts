import { defineConfig } from "vite";
import { resolve, join } from "path";
import react from "@vitejs/plugin-react";

// Define chrome as default browser for the dev server.
const opsys = process.platform;
// windows
if (opsys === "win32") process.env.BROWSER = "chrome";
// macOS
if (opsys === "darwin") process.env.BROWSER = "/Applications/Google Chrome.app";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: resolve(import.meta.dirname, "dist"),
    sourcemap: true,
    minify: true,
    cssMinify: true,
  },
  // !TODO: replace this temporary fix by implementing nginx api gateway to centralize the application entry point (will be used as prod solution)...
  /** Use a proxy to avoid CORS policy & cookies issues
   *
   * ⚠️ Backend server runs on a different domain that the frontend server (different ports)!
   * The proxy allows the frontend to emit requests as if they were coming from the same domain as the server.
   * The `uri` option of the ApolloClient instance (App.tsx) must also be set to "/api" to use the proxy.
   * With both the proxy and the `uri` set to "/api", the frontend server will forward the requests to the backend server as if they were on the same domain.
   *
   * ⚙️ Since the app is dockerized, use the backend service name "server" as the address for the backend server (instead of "localhost") since services adresses are resolved by the docker DNS.
   *
   */
  server: {
    proxy: {
      "/api": {
        target: "http://server:3000", // or http://localhost:3000 if running the front locally with yarn run dev
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(join(import.meta.dirname, "src/")),
      "@assets": resolve(join(import.meta.dirname, "src/assets")),
      "@common": resolve(join(import.meta.dirname, "src/common")),
      "@components": resolve(join(import.meta.dirname, "src/components")),
      "@contexts": resolve(join(import.meta.dirname, "src/contexts")),
      "@hooks": resolve(join(import.meta.dirname, "src/hooks")),
      "@layouts": resolve(join(import.meta.dirname, "src/layouts")),
      "@pages": resolve(join(import.meta.dirname, "src/pages")),
      "@reducers": resolve(join(import.meta.dirname, "src/reducers")),
      "@stores": resolve(join(import.meta.dirname, "src/stores")),
      "@themes": resolve(join(import.meta.dirname, "src/themes")),
      "@utils": resolve(join(import.meta.dirname, "src/utils")),
    },
  },
  plugins: [react()],
});
