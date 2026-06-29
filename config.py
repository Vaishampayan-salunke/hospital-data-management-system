import os
from dotenv import load_dotenv

load_dotenv()


class Config:

    MONGO_URI = os.getenv("MONGO_URI")
    DATABASE_NAME = os.getenv("DATABASE_NAME")
    SECRET_KEY = os.getenv("SECRET_KEY")

    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")

    TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID")
    TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN")
    TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER")