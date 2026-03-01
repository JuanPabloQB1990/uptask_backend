import { CorsOptions } from "cors";

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173"
]

console.log(process.env.FRONTEND_URL);

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("CORS error"))
    }

  },
  credentials: true
}