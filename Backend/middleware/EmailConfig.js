const nodemailer = require("nodemailer");

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
 export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: "aayatshowkat50@gmail.com",
    pass: "jpmg cjiu xooz pjol",
  },
})

const sendEmail = async()=>{
    try{
 const info = await transporter.sendMail({
    from: '"Daily Wage Workers" <aayatshowkat50@gmail.com>',
    to: "aayatshokwat301@gmail.com",
    subject: "Hello ✔",
    text: "Hello world?", // Plain-text version of the message
    html: "<b>Hello world?</b>", // HTML version of the message
    })}
    catch(error){
console.log("error in node mailer", error)
    }
}

sendEmail()