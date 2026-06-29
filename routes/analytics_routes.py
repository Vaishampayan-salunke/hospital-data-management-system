from flask import Blueprint, jsonify

from database.mongo_connection import db

analytics_bp = Blueprint(
    'analytics_bp',
    __name__
)


@analytics_bp.route(
    '/analytics-data',
    methods=['GET']
)
def analytics_data():

    # TOTAL COUNTS
    total_patients = db.patients.count_documents({})

    total_doctors = db.doctors.count_documents({})

    total_appointments = db.appointments.count_documents({})

    total_emergency = db.emergency_cases.count_documents({})

    # APPOINTMENT STATUS
    completed = db.appointments.count_documents({
        "status": "Completed"
    })

    pending = db.appointments.count_documents({
        "status": "Pending"
    })

    cancelled = db.appointments.count_documents({
        "status": "Cancelled"
    })

    # EMERGENCY PRIORITY
    critical = db.emergency_cases.count_documents({
        "priority": "Critical"
    })

    high = db.emergency_cases.count_documents({
        "priority": "High"
    })

    medium = db.emergency_cases.count_documents({
        "priority": "Medium"
    })

    low = db.emergency_cases.count_documents({
        "priority": "Low"
    })

    return jsonify({

        "total_patients":
            total_patients,

        "total_doctors":
            total_doctors,

        "total_appointments":
            total_appointments,

        "total_emergency":
            total_emergency,

        "appointment_stats": {

            "Completed":
                completed,

            "Pending":
                pending,

            "Cancelled":
                cancelled
        },

        "emergency_stats": {

            "Critical":
                critical,

            "High":
                high,

            "Medium":
                medium,

            "Low":
                low
        }
    })