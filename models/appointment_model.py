from database.mongo_connection import db

appointments_collection = db["appointments"]


def create_appointment(data):
    return appointments_collection.insert_one(data)


def get_all_appointments():
    return list(appointments_collection.find())


def update_appointment(appointment_id, updated_data):

    return appointments_collection.update_one(
        {"appointment_id": appointment_id},
        {"$set": updated_data}
    )


def delete_appointment(appointment_id):

    return appointments_collection.delete_one(
        {"appointment_id": appointment_id}
    )


def get_appointments_by_doctor(doctor_id):

    return list(
        appointments_collection.find(
            {"doctor_id": doctor_id}
        )
    )


def get_appointments_by_status(status):

    return list(
        appointments_collection.find(
            {
                "status": {
                    "$regex": status,
                    "$options": "i"
                }
            }
        )
    )