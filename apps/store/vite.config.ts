import { reactRouter } from "@react-router/dev/vite";
import { hydrogen } from "@shopify/hydrogen/vite";
import { oxygen } from "@shopify/mini-oxygen/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    hydrogen(),
    oxygen(),
    reactRouter(),
    tsconfigPaths(),
    tailwindcss(),
  ],
  build: {
    assetsInlineLimit: 0,
    ...(!isSsrBuild && {
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes("react-player")) return "vendor-media";
            if (id.includes("swiper")) return "vendor-media";
            if (id.includes("react-share")) return "vendor-social";
            if (id.includes("@phosphor-icons")) return "vendor-icons";
            if (id.includes("@radix-ui")) return "vendor-radix";
          },
        },
      },
    }),
  },
  server: {
    // Bind IPv4 explicitly — on Windows, default localhost can listen on ::1 only
    // and Chrome may try 127.0.0.1, causing ERR_CONNECTION_REFUSED.
    host: process.env.HYDROGEN_DEV_HOST ?? "127.0.0.1",
    port: Number(process.env.HYDROGEN_DEV_PORT ?? 3456),
    strictPort: true,
    hmr: process.env.HMR !== "false",
    warmup: {
      clientFiles: [
        "./app/routes/**/*",
        "./app/sections/**/*",
        "./app/components/**/*",
      ],
    },
    allowedHosts: true,
  },
  ssr: {
    optimizeDeps: {
      include: [
        "deepmerge",
        "@radix-ui/react-primitive",
        "jsonp",
        "classnames",
        "react-share",
        "typographic-trademark",
        "typographic-single-spaces",
        "typographic-registered-trademark",
        "typographic-math-symbols",
        "typographic-en-dashes",
        "typographic-em-dashes",
        "typographic-ellipses",
        "typographic-currency",
        "typographic-copyright",
        "typographic-apostrophes-for-possessive-plurals",
        "typographic-quotes",
        "typographic-apostrophes",
        "textr",
      ],
    },
  },
}));
