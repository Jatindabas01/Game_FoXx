const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Server is working!");
});

app.post("/send-email", async (req, res) => {
  const { name, email, position, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: "tumhariemail@gmail.com",
    subject: "New Job Application",
    text: `Name: ${name}\nEmail: ${email}\nPosition: ${position}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error sending email", error });
  }
});

const PORT = process.env.PORT || 5001; 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
