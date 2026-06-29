from flask import Blueprint, request, jsonify
from models.patient_model import *

patient_bp = Blueprint("patient_bp", __name__)


# ADD PATIENT
@patient_bp.route('/add-patient', methods=['POST'])
def add_patient():

    data = request.json

    patient_data = {
        "patient_id": data["patient_id"],
        "name": data["name"],
        "age": data["age"],
        "gender": data["gender"],
        "phone": data["phone"],
        "disease": data["disease"]
    }

    create_patient(patient_data)

    return jsonify({
        "message": "Patient Added Successfully"
    })


# GET ALL PATIENTS
@patient_bp.route('/patients', methods=['GET'])
def get_patients():

    patients = get_all_patients()

    output = []

    for patient in patients:
        
        # SKIP EMPTY DOCUMENTS
        if "patient_id" not in patient:
            continue

        output.append({
            "patient_id": patient.get("patient_id", ""),
            "name": patient.get("name", ""),
            "age": patient.get("age", ""),
            "gender": patient.get("gender", ""),
            "phone": patient.get("phone", ""),
            "disease": patient.get("disease", "")
            })

    return jsonify(output)


# UPDATE PATIENT
@patient_bp.route('/update-patient/<patient_id>', methods=['PUT'])
def update_patient_route(patient_id):

    data = request.json

    print("PATIENT ID:", patient_id)
    print("UPDATED DATA:", data)

    result = update_patient(patient_id, data)

    if result.modified_count > 0:

        return jsonify({
            "message": "Patient Updated Successfully"
        })

    return jsonify({
        "message": "No Changes Made or Patient Not Found"
    })

# DELETE PATIENT
# DELETE PATIENT
@patient_bp.route('/delete-patient/<patient_id>', methods=['DELETE'])
def delete_patient_route(patient_id):

    result = delete_patient(patient_id)

    if result.deleted_count > 0:

        return jsonify({
            "message": "Patient Deleted Successfully"
        })

    return jsonify({
        "message": "Patient Not Found"
    })