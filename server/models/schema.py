import datetime

# Define the schema
POST_SCHEMA = {
    "title": str,
    "message": str,
    "creator": str,
    "name": {
        "type": str,
        "default": "Contributors"
    },
    "tags": [str],
    "selectedFile": str,
    "likes": {
        "type": list,
        "default": [],
    },
    "comments": {
        "type": list,
        "default": []
    },
    "createdAt": {
        "type": datetime,
        "default": datetime.datetime.utcnow()
    }
}

USER_SCHEMA = {
    "name": str,
    "email": str,
    "password": str,
    "id": str
}

# Validate the data against the schema
def validate_data(data, schema: dict):
    for field in schema.keys():
        if field not in data:
            if schema[field]["default"] is None:
                raise Exception(f"Missing required field: {field}")
            else:
                data[field] = schema[field]["default"]
        ## try validation type checked
        # try:
        #     if not isinstance(data[field], schema[field]["type"]):
        #         # change the pot schema to get it working
        #         raise Exception(f"Invalid data type for field: {field}")
        # except:
        #     pass
    return data

# Insert the data into the MongoDB collection
def insert_data(collection, data: dict, schema: dict=None):
    if schema is None:
        data_returned = collection.insert_one(data)
        return data_returned
    validate_data(data, schema=schema)
    data_returned = collection.insert_one(data)
    print("*"*43, data)
    return data_returned

# Example usage
if __name__=="__main__":
    # from db import client_init
    # client = client_init()
    # db = client['database']
    # post_message = db["PostMessage"]

    # insert document example
    data = {'_id': '6541020b96300c70c2c093c7', 
            'title': 'sa', 
            'message': 'sa', 
            'tags': [], 
            'selectedFile': '', 
            'name': 'sa ra', 
            'creator': 'user', 
            'createdAt': datetime.datetime(2023, 10, 31, 19, 17, 59, 128000)}

    post = validate_data(data, POST_SCHEMA)

