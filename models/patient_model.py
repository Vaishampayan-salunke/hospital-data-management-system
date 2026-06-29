from database.mongo_connection import db

patients_collection = db["patients"]


def create_patient(data):
    return patients_collection.insert_one(data)


def get_all_patients():
    return list(patients_collection.find())


def get_patient_by_id(patient_id):
    return patients_collection.find_one({"patient_id": patient_id})


def update_patient(patient_id, updated_data):

    result = patients_collection.update_one(

        {
            "patient_id": str(patient_id)
        },

        {
            "$set": updated_data
        }
    )

    return result

def delete_patient(patient_id):

    result = patients_collection.delete_one({

        "patient_id": str(patient_id)
    })

    return result