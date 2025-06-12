import { defineConfig } from "vite";
import type { UserConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { redwood } from "rwsdk/vite";
import path from "path";

export default defineConfig({
  environments: {
    ssr: {},
  },
  plugins: [
    redwood(),
    tailwindcss(),
  ],
  optimizeDeps: {
    include: ['classnames', 'flowbite-react'],
    force: true
  },
  ssr: {
    noExternal: ['flowbite-react', 'classnames']
  },
  server: {
    hmr: {
      overlay: false
    }
  },
  resolve: {
    alias: {
      'tailwindcss/version.js': path.resolve(__dirname, './tailwind-version.js'),
      'tailwindcss/version': path.resolve(__dirname, './tailwind-version.js')
    }
  }
} satisfies UserConfig);
