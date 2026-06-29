from flask_mail import Mail, Message
from flask import current_app

mail = Mail()


def send_email_alert(recipient, subject, body):

    try:

        msg = Message(
            subject,
            sender=current_app.config['MAIL_USERNAME'],
            recipients=[recipient]
        )

        msg.body = body

        mail.send(msg)

        return True

    except Exception as e:

        print("Email Error:", e)

        return False