from twilio.rest import Client
from config import Config


def send_sms_alert(to_phone, message_body):

    try:

        client = Client(
            Config.TWILIO_ACCOUNT_SID,
            Config.TWILIO_AUTH_TOKEN
        )

        message = client.messages.create(
            body=message_body,
            from_=Config.TWILIO_PHONE_NUMBER,
            to=to_phone
        )

        return message.sid

    except Exception as e:

        print("SMS Error:", e)

        return None