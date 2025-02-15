import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

interface ViteConfig {
  mode: "development" | "staging" | "production";
}

const getServerConfig = (mode: "development" | "staging" | "production") => {
  if (mode === "development") {
    return {
      proxy: {
        "/api": {
          target: process.env.VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ""),
        },
      },
    };
  }

  return {
    cors: false,
    allowedHosts: [],
  };
};

export default ({ mode }: ViteConfig) => {
  const env = loadEnv(mode, process.cwd());
  process.env = { ...process.env, ...env };

  const serverConfig = getServerConfig(mode);

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: serverConfig,
  });
};
