import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base:"/Case-front-end",
  plugins: [react()],
})
// https://vitejs.dev/config/