from database.mongo_connection import db
from bson.objectid import ObjectId

bill_collection = db["bills"]


# ==============================
# ADD BILL
# ==============================
def add_bill(data):

    return bill_collection.insert_one(data)


# ==============================
# GET ALL BILLS
# ==============================
def get_all_bills():

    bills = list(bill_collection.find())

    for bill in bills:

        bill["_id"] = str(bill["_id"])

    return bills


# ==============================
# GET SINGLE BILL
# ==============================
def get_bill_by_id(bill_id):

    bill = bill_collection.find_one({
        "bill_id": bill_id
    })

    if bill:

        bill["_id"] = str(bill["_id"])

    return bill


# ==============================
# UPDATE BILL
# ==============================
def update_bill(bill_id, updated_data):

    return bill_collection.update_one(

        {
            "bill_id": bill_id
        },

        {
            "$set": updated_data
        }
    )


# ==============================
# DELETE BILL
# ==============================
def delete_bill(bill_id):

    return bill_collection.delete_one({
        "bill_id": bill_id
    })