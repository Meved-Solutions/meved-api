import nodemailer from "nodemailer"


let config ={
    service : "gmail",
    auth: {
      user: process.env.GMAIL_ACC,
      pass: process.env.GMAIL_PASS,
    },
  };

export const transporter = nodemailer.createTransport(config);