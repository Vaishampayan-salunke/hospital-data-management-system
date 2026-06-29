from flask import Blueprint, request, jsonify
from models.doctor_model import *

doctor_bp = Blueprint("doctor_bp", __name__)


# ADD DOCTOR
@doctor_bp.route('/add-doctor', methods=['POST'])
def add_doctor():

    data = request.json

    doctor_data = {

        "doctor_id": data["doctor_id"],

        "name": data["name"],

        "department": data["department"],

        "specialization": data["specialization"],

        "experience": data["experience"],

        "qualification": data["qualification"],

        "timing": data["timing"],

        "fees": data["fees"],

        "phone": data["phone"],

        "availability": data["availability"]
    }

    create_doctor(doctor_data)

    return jsonify({
        "message": "Doctor Added Successfully"
    })


# GET ALL DOCTORS
@doctor_bp.route('/doctors', methods=['GET'])
def get_doctors():

    doctors = get_all_doctors()

    output = []

    for doctor in doctors:

        if "doctor_id" not in doctor:
            continue

        output.append({

            "doctor_id": doctor.get("doctor_id", ""),

            "name": doctor.get("name", ""),

            "department": doctor.get("department", ""),

            "specialization": doctor.get("specialization", ""),

            "experience": doctor.get("experience", ""),

            "qualification": doctor.get("qualification", ""),

            "timing": doctor.get("timing", ""),

            "fees": doctor.get("fees", ""),

            "phone": doctor.get("phone", ""),

            "availability": doctor.get("availability", "")
        })

    return jsonify(output)


# UPDATE DOCTOR
@doctor_bp.route('/update-doctor/<doctor_id>', methods=['PUT'])
def update_doctor_route(doctor_id):

    data = request.json

    updated_data = {

        "name": data["name"],

        "department": data["department"],

        "specialization": data["specialization"],

        "experience": data["experience"],

        "qualification": data["qualification"],

        "timing": data["timing"],

        "fees": data["fees"],

        "phone": data["phone"],

        "availability": data["availability"]
    }

    result = update_doctor(doctor_id, updated_data)

    if result.modified_count > 0:

        return jsonify({
            "message": "Doctor Updated Successfully"
        })

    return jsonify({
        "message": "No Changes Made or Doctor Not Found"
    })

# DELETE DOCTOR
@doctor_bp.route('/delete-doctor/<doctor_id>', methods=['DELETE'])
def delete_doctor_route(doctor_id):

    delete_doctor(doctor_id)

    return jsonify({
        "message": "Doctor Deleted Successfully"
    })


# SEARCH DOCTOR
@doctor_bp.route('/search-doctor', methods=['GET'])
def search_doctor():

    specialization = request.args.get("specialization")

    doctors = search_doctor_by_specialization(specialization)

    output = []

    for doctor in doctors:

        output.append({
            "doctor_id": doctor.get("doctor_id", ""),
            "name": doctor.get("name", ""),
            "specialization": doctor.get("specialization", ""),
            "experience": doctor.get("experience", ""),
            "phone": doctor.get("phone", ""),
            "availability": doctor.get("availability", "")
        })

    return jsonify(output)