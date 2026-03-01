import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config()

const config = () => {
  console.log(process.env.SMTP_HOST);
  console.log(+process.env.SMTP_PORT!);
  console.log(process.env.SMTP_USER);
  console.log(process.env.SMTP_PASS);
  
  return {
    host: process.env.SMTP_HOST,
    port: +process.env.SMTP_PORT!,
    secure: false,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  };
};

export const checkSMTP = async () => {
  try {
    await transporter.verify();
    console.log("SMTP listo");
  } catch (error) {
    console.error("Error conectando con SMTP:", error);
  }
};

export const transporter = nodemailer.createTransport(config());
