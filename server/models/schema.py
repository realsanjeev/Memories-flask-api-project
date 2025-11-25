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
        "default": lambda: datetime.datetime.utcnow()
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
            # Check if the field definition is a dict with a default value
            field_def = schema[field]
            if isinstance(field_def, dict) and "default" in field_def:
                default_val = field_def["default"]
                # If default is a callable (like lambda), call it
                if callable(default_val):
                    data[field] = default_val()
                else:
                    data[field] = default_val
            else:
                # If it's not a dict or has no default, it might be required
                # But looking at POST_SCHEMA, simple types like 'title': str imply required?
                # The original code assumed everything had a default or was required.
                # Let's assume if it's not in data and has no default, it's an error unless it's a simple type definition
                if isinstance(field_def, type):
                     raise Exception(f"Missing required field: {field}")
                elif isinstance(field_def, dict) and field_def.get("default") is None:
                     raise Exception(f"Missing required field: {field}")
                     
    return data

# Insert the data into the MongoDB collection
def insert_data(collection, data: dict, schema: dict=None):
    if schema is None:
        data_returned = collection.insert_one(data)
        return data_returned
    validate_data(data, schema=schema)
    data_returned = collection.insert_one(data)
    # print("*"*43, data)
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

