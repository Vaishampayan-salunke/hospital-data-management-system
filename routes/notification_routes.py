from flask import Blueprint, request, jsonify
from utils.email_service import send_email_alert
from utils.sms_service import send_sms_alert

notification_bp = Blueprint("notification_bp", __name__)


# EMAIL ALERT
@notification_bp.route('/send-email', methods=['POST'])
def send_email():

    data = request.json

    success = send_email_alert(
        data["recipient"],
        data["subject"],
        data["body"]
    )

    if success:

        return jsonify({
            "message": "Email Sent Successfully"
        })

    return jsonify({
        "message": "Email Failed"
    })


# SMS ALERT
@notification_bp.route('/send-sms', methods=['POST'])
def send_sms():

    data = request.json

    sid = send_sms_alert(
        data["phone"],
        data["message"]
    )

    if sid:

        return jsonify({
            "message": "SMS Sent Successfully",
            "sid": sid
        })

    return jsonify({
        "message": "SMS Failed"
    })