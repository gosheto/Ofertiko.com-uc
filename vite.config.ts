import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  // Prioritize Vercel system env vars (process.env) if available, otherwise fallback to .env file (env)
  const apiKey = process.env.API_KEY || env.API_KEY;

  return {
    plugins: [react()],
    define: {
      // This ensures process.env variables work in the browser after build
      'process.env.API_KEY': JSON.stringify(apiKey),
    },
  };
});