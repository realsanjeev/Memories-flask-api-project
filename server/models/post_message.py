from pymongo import MongoClient
from datetime import datetime

# define post schema
post_schema = {
    "title": str,
    "message": str,
    "creator": str,
    "name": {
        "type": str,
        "default": "Contributers"
    },
    "tags": [str],
    "selectedFile": str,
    "likes": {
        "type": [str],
        "default": [],
    },
    "comments": {
        "type": [str],
        "default": []
    },
    "createdAt": {
        "type": datetime,
        "default": datetime.utcnow
    }
}


if __name__=="__main__":
    client = MongoClient('mongodb://localhost:27017/')
    db = client['database']
    post_message = db["PostMessage"]

    # insert document example
    new_post = {
        "title": "Sample Title",
        "message": "SAmple Message",
        "creator": "Sample Creator",
        "tags": ["tag1", "tags2"],
        "selectedFile": "path"
    }
    post_message.insert_one(new_post)
