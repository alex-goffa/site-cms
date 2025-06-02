import { defineConfig } from "vite";
import tailwindcss from '@tailwindcss/vite'
import { redwood } from "rwsdk/vite";

export default defineConfig({
  environments: {
    ssr: {},
  },
  plugins: [
    redwood(),
    tailwindcss(),
  ],
  optimizeDeps: {
    exclude: ['flowbite-react'], 
  },
  server: {
    hmr: {
      overlay: false
    }
  },
  resolve: {
    alias: {
      'tailwindcss/version.js': '/tailwind-patch.js'
    }
  }
});
