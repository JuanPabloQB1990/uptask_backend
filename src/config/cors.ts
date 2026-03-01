import { CorsOptions } from "cors";

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173"
]

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