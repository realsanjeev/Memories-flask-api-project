from datetime import datetime

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
        "default": datetime.utcnow()
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
    for field in schema:
        if field not in data:
            if schema[field]["default"] is None:
                raise Exception(f"Missing required field: {field}")
            else:
                data[field] = schema[field]["default"]
        # try validation type checked
        try:
            if not isinstance(data[field], schema[field]["type"]):
                raise Exception(f"Invalid data type for field: {field}")
        except:
            pass

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
    from db import client_init
    client = client_init()
    db = client['database']
    post_message = db["PostMessage"]

    # insert document example
    data = {
        "title": "My First Post",
        "message": "This is my test post for schema!",
        "creator": "tester",
        "tags": ["blog", "first post"],
        "selectedFile": "my_image.png",
    }

    insert_data(collection=post_message, data=data, schema=POST_SCHEMA)
