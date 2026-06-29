from database.mongo_connection import db

emergency_collection = db["emergency_cases"]


# =========================
# ADD CASE
# =========================
def add_emergency_case(data):

    return emergency_collection.insert_one(data)


# =========================
# GET ALL CASES
# =========================
def get_all_emergency_cases():

    return emergency_collection.find()


# =========================
# UPDATE CASE
# =========================
def update_emergency_case(
    emergency_id,
    updated_data
):

    return emergency_collection.update_one(

        {
            "emergency_id":
                emergency_id
        },

        {
            "$set":
                updated_data
        }
    )


# =========================
# DELETE CASE
# =========================
def delete_emergency_case(
    emergency_id
):

    return emergency_collection.delete_one({

        "emergency_id":
            emergency_id
    })