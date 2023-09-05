import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: 'smtp.titan.email',
    port: 465,
    secure: true,
    auth: {
      user: 'arash@ashra.academy',
      pass: '?/,e9L$49xTYxgW',
    },
  });