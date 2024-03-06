import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/user": "https://mern-todo-backend-seven.vercel.app/api/v1/",
      "/todo": "https://mern-todo-backend-seven.vercel.app/api/v1/",
    },
  },
  plugins: [react()],
});
