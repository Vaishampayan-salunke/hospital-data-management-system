from database.mongo_connection import db

doctors_collection = db["doctors"]


def create_doctor(data):
    return doctors_collection.insert_one(data)


def get_all_doctors():
    return list(doctors_collection.find())


def update_doctor(doctor_id, updated_data):
    return doctors_collection.update_one(
        {"doctor_id": doctor_id},
        {"$set": updated_data}
    )


def delete_doctor(doctor_id):
    return doctors_collection.delete_one(
        {"doctor_id": doctor_id}
    )


def search_doctor_by_specialization(specialization):

    return list(
        doctors_collection.find(
            {
                "specialization": {
                    "$regex": specialization,
                    "$options": "i"
                }
            }
        )
    )