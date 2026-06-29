from database.mongo_connection import db

patients_collection = db["patients"]
doctors_collection = db["doctors"]
appointments_collection = db["appointments"]
emergency_collection = db["emergency_cases"]


# TOTAL COUNTS
def get_total_patients():
    return patients_collection.count_documents({})


def get_total_doctors():
    return doctors_collection.count_documents({})


def get_total_appointments():
    return appointments_collection.count_documents({})


def get_total_emergency_cases():
    return emergency_collection.count_documents({})


# APPOINTMENT STATUS STATS
def appointment_status_statistics():

    pipeline = [
        {
            "$group": {
                "_id": "$status",
                "count": {"$sum": 1}
            }
        }
    ]

    return list(appointments_collection.aggregate(pipeline))


# EMERGENCY PRIORITY STATS
def emergency_priority_statistics():

    pipeline = [
        {
            "$group": {
                "_id": "$priority_level",
                "count": {"$sum": 1}
            }
        }
    ]

    return list(emergency_collection.aggregate(pipeline))