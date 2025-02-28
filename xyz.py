import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")

def send_email(to_email, subject, body):
    msg = EmailMessage()
    msg["From"] = EMAIL_USER
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.set_content(body)

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(EMAIL_USER, EMAIL_PASS)
            server.send_message(msg)
            print("Email sent successfully!")
    except Exception as e:
        print("Error:", e)

# Test email
send_email("receiver@gmail.com", "Test Subject", "Hello, this is a test email.")
