import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/ai-assisted-software-development-evaluation-dashboard/',
  plugins: [react()],
});
