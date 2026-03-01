import { CorsOptions } from "cors";

console.log(process.env.FRONTEND_URL);
export const corsConfig: CorsOptions = {
  
  origin: [process.env.FRONTEND_URL as string, "http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};
