from flask import Blueprint, request, jsonify
from models.appointment_model import *

appointment_bp = Blueprint("appointment_bp", __name__)


# ADD APPOINTMENT
@appointment_bp.route('/add-appointment', methods=['POST'])
def book_appointment():

    data = request.json

    appointment_data = {

        "appointment_id":
            data["appointment_id"],

        "patient_id":
            data["patient_id"],

        "patient_name":
            data["patient_name"],

        "doctor_id":
            data["doctor_id"],

        "doctor_name":
            data["doctor_name"],

        "department":
            data["department"],

        "date":
            data["date"],

        "time":
            data["time"],

        "status":
            data["status"]
    }

    create_appointment(appointment_data)

    return jsonify({
        "message": "Appointment Booked Successfully"
    })


# GET ALL APPOINTMENTS
@appointment_bp.route('/appointments', methods=['GET'])
def get_appointments():

    appointments = get_all_appointments()

    output = []

    for appointment in appointments:

        output.append({

            "appointment_id":
                appointment.get("appointment_id", ""),

            "patient_id":
                appointment.get("patient_id", ""),

            "patient_name":
                appointment.get("patient_name", ""),

            "doctor_id":
                appointment.get("doctor_id", ""),

            "doctor_name":
                appointment.get("doctor_name", ""),

            "department":
                appointment.get("department", ""),

            "date":
                appointment.get("date", ""),

            "time":
                appointment.get("time", ""),

            "status":
                appointment.get("status", "")
        })

    return jsonify(output)


# UPDATE APPOINTMENT
@appointment_bp.route('/update-appointment/<appointment_id>', methods=['PUT'])
def update_appointment_route(appointment_id):

    data = request.json

    update_appointment(appointment_id, data)

    return jsonify({
        "message": "Appointment Updated Successfully"
    })


# DELETE APPOINTMENT
@appointment_bp.route('/delete-appointment/<appointment_id>', methods=['DELETE'])
def delete_appointment_route(appointment_id):

    delete_appointment(appointment_id)

    return jsonify({
        "message": "Appointment Deleted Successfully"
    })


# FILTER BY DOCTOR
@appointment_bp.route('/appointments-by-doctor/<doctor_id>', methods=['GET'])
def appointments_by_doctor(doctor_id):

    appointments = get_appointments_by_doctor(doctor_id)

    output = []

    for appointment in appointments:

        output.append({
            "appointment_id": appointment.get("appointment_id", ""),
            "patient_id": appointment.get("patient_id", ""),
            "doctor_id": appointment.get("doctor_id", ""),
            "appointment_date": appointment.get("appointment_date", ""),
            "appointment_time": appointment.get("appointment_time", ""),
            "status": appointment.get("status", "")
        })

    return jsonify(output)


# FILTER BY STATUS
@appointment_bp.route('/appointments-by-status', methods=['GET'])
def appointments_by_status():

    status = request.args.get("status")

    appointments = get_appointments_by_status(status)

    output = []

    for appointment in appointments:

        output.append({
            "appointment_id": appointment.get("appointment_id", ""),
            "patient_id": appointment.get("patient_id", ""),
            "doctor_id": appointment.get("doctor_id", ""),
            "appointment_date": appointment.get("appointment_date", ""),
            "appointment_time": appointment.get("appointment_time", ""),
            "status": appointment.get("status", "")
        })

    return jsonify(output)