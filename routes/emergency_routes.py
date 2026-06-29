from flask import Blueprint, request, jsonify

from models.emergency_model import (
    add_emergency_case,
    get_all_emergency_cases,
    update_emergency_case,
    delete_emergency_case
)

emergency_bp = Blueprint(
    'emergency_bp',
    __name__
)


# =========================
# ADD EMERGENCY CASE
# =========================
@emergency_bp.route(
    '/add-emergency',
    methods=['POST']
)
def add_emergency():

    data = request.json

    emergency_data = {

        "emergency_id":
            data["emergency_id"],

        "patient_name":
            data["patient_name"],

        "age":
            data["age"],

        "condition":
            data["condition"],

        "priority":
            data["priority"],

        "ambulance_status":
            data["ambulance_status"],

        "emergency_contact":
            data["emergency_contact"],

        "case_status":
            data["case_status"]
    }

    add_emergency_case(emergency_data)

    return jsonify({
        "message":
            "Emergency Case Added Successfully"
    })


# =========================
# GET EMERGENCY CASES
# =========================
@emergency_bp.route(
    '/emergency-cases',
    methods=['GET']
)
def get_emergency_cases():

    emergency_cases = get_all_emergency_cases()

    output = []

    for case in emergency_cases:

        if "emergency_id" not in case:
            continue

        output.append({

            "emergency_id":
                case.get(
                    "emergency_id", ""
                ),

            "patient_name":
                case.get(
                    "patient_name", ""
                ),

            "age":
                case.get(
                    "age", ""
                ),

            "condition":
                case.get(
                    "condition", ""
                ),

            "priority":
                case.get(
                    "priority", ""
                ),

            "ambulance_status":
                case.get(
                    "ambulance_status", ""
                ),

            "emergency_contact":
                case.get(
                    "emergency_contact", ""
                ),

            "case_status":
                case.get(
                    "case_status", ""
                )
        })

    return jsonify(output)


# =========================
# UPDATE CASE
# =========================
@emergency_bp.route(
    '/update-emergency/<emergency_id>',
    methods=['PUT']
)
def update_emergency_route(
    emergency_id
):

    data = request.json

    updated_data = {

        "patient_name":
            data["patient_name"],

        "age":
            data["age"],

        "condition":
            data["condition"],

        "priority":
            data["priority"],

        "ambulance_status":
            data["ambulance_status"],

        "emergency_contact":
            data["emergency_contact"],

        "case_status":
            data["case_status"]
    }

    result = update_emergency_case(
        emergency_id,
        updated_data
    )

    if result.modified_count > 0:

        return jsonify({
            "message":
                "Emergency Case Updated Successfully"
        })

    return jsonify({
        "message":
            "No Changes Made"
    })


# =========================
# DELETE CASE
# =========================
@emergency_bp.route(
    '/delete-emergency/<emergency_id>',
    methods=['DELETE']
)
def delete_emergency_route(
    emergency_id
):

    result = delete_emergency_case(
        emergency_id
    )

    if result.deleted_count > 0:

        return jsonify({
            "message":
                "Emergency Case Deleted Successfully"
        })

    return jsonify({
        "message":
            "Emergency Case Not Found"
    })