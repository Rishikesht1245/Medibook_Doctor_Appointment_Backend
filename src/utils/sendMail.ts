import nodemailer from "nodemailer";

const sendEmail = async (
  email: string,
  subject: string,
  text: string
): Promise<any> => {
  try {
    //creating transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.TRANSPORTER_USERNAME,
        pass: process.env.TRANSPORTER_PASSWORD,
      },
    });

    //   send email
    await transporter.sendMail({
      from: process.env.TRANSPORTER_USERNAME,
      to: email,
      subject: subject,
      text: text,
    });

    console.log("email send successfully");
  } catch (error) {
    console.log("Email not send :", error);
  }
};

export default sendEmail;
