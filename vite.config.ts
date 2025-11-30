import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // This allows the existing code using process.env.API_KEY to work
      // by mapping the VITE_API_KEY from the .env file to it.
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY || process.env.API_KEY),
    },
  };
});