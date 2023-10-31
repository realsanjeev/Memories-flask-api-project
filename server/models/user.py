import jwt
import bcrypt
from flask import jsonify
from .db import client_init

SECRET = 'test-secret-for-token-gen'
mongo_server = client_init()
db_connect = mongo_server['test']
user_model = db_connect['users']

def signin(data):
    '''Sign in logic for app'''
    email = data.get('email')
    password = data.get('password')
    try:
        user = user_model.find_one({"email": email})
        if not user:
            return jsonify({"message": "User doesn't exist"}), 404
        is_password_correct = bcrypt.checkpw(password.encode('utf-8'), user['password'])
        if not is_password_correct:
            return jsonify({"message": "Invalid Credentials!"}), 400
        
        # convert ObectId to string
        user["_id"] = str(user["_id"]) 
        print("Sign in******"*45, user)
        # ENCODE USER INFO and SEND to client
        token = jwt.encode({"email": user['email'], "id": user["_id"]}, SECRET, algorithm='HS256')

        # byte is not Json serializable 
        del user['password']
        return jsonify({"result": user, "token": token}), 200

    except Exception as e:
        print(e)
        return jsonify({"message": "something went wrong"}), 500

def signup(data):
    email = data.get('email')
    password = data.get('password')
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    print('*'*32)
    print("Listening to signup: ", data)
    try:
        # check if user email is already taken
        old_user = user_model.find_one({ "email": email })
        print("*"*4, old_user)
        if old_user:
            return jsonify({"message": "User already exists"})
        hash_password = bcrypt.hashpw(password=password.encode('utf-8'), salt=bcrypt.gensalt(12))
        user = {
            "email": email,
            "password": hash_password,
            "name": f"{first_name} {last_name}"
        }
        result = user_model.insert_one(user)
        print("*"*43)
        print("Let's see what result return's: ", result.__inserted_id)
        token = jwt.encode({
                "email": email,
                "id":  str(result['_id']),
            }, key=SECRET,
            algorithm='HS256')
        return jsonify({"result": user, "token": token}), 201
    except Exception as e:
        print(f"[ERROR]: Error occured: {e}")
        return jsonify({"message": "Something went wrong"}), 500