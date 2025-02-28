require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();  // ✅ Yeh ek hi baar define hoga
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.post("/apply", async (req, res) => {
    const { fullName, email, position, message } = req.body;

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_RECEIVER,
        subject: `New Job Application from ${fullName}`,
        text: `Name: ${fullName}\nEmail: ${email}\nPosition: ${position}\nMessage: ${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Application Sent Successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to send application" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
