import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    command === 'build' && obfuscatorPlugin({
      options: {
        rotateStringArray: true,
        stringArray: true,
        stringArrayThreshold: 0.75,
        deadCodeInjection: false,
        selfDefending: false,
        debugProtection: false,
      },
    }),
  ].filter(Boolean),

  esbuild: {
    drop: command === 'build' ? ['console', 'debugger'] : [],
  },
}))