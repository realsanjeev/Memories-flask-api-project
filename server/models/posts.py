import re, datetime
from flask import jsonify
from bson import ObjectId
from pymongo import ReturnDocument
from .db import client_init

client = client_init()
db_connect = client['test']
post_messages = db_connect['postmessages']

def get_posts(page: int):
    '''Get the posts from the collection'''
    LIMIT = 3
    start_index = (page - 1) * LIMIT
    try:
        total = post_messages.count_documents({})
        print("total: ", total, "page: ", page)

        # convert object to list of record
        posts = list(post_messages.find().limit(3).skip(start_index))
        print("*"*32, len(posts))

        # convert ObjectId to string
        for post in posts:
            post['_id'] = str(post['_id'])
        posts_response = {"data": posts, "currentPage": page, "numberOfPages": total//LIMIT}
        return jsonify(posts_response), 200
    except Exception as e:
        return jsonify({"message": f"Cannot found posts: {e}"}), 500

def get_post(id):
    try:
        print("getpost: ", id)

        # Assuming post_messages is your collection
        post = post_messages.find_one({"_id": ObjectId(id)})

        if post is not None:
            # Convert ObjectID to string 
            post["_id"] = str(post["_id"])
            return jsonify(post), 200
        else:
            return jsonify({"message": f"Post with id {id} not found"}), 404

    except Exception as e:
        return jsonify({"message": f"Cannot find post: {e}"}), 500
    

def get_posts_by_search(search_query: str, tags: str):
    '''Search post in collections'''
    try:
        title = re.compile(search_query, re.IGNORECASE)
        print("*************", title)
        posts = post_messages.find({
            "$or": [
                {title},
                {"tags": {"$in": tags.split(',')}}
            ]
        })
        print("*****It os working normally*************")
        # Convert ObjectIDs to strings
        for post in posts:
            post["_id"] = str(post["_id"])

        return jsonify({"data": list(posts)}), 200

    except Exception as e:
        print("error in search", str(e))
        return jsonify({"message": str(e)}), 404

def like_post(request, id):
    '''like post from feed'''
    print('like post: ', id)

    try:
        user_id = request.json.get('userId')  # Assuming userId is sent in the request body

        if not user_id:
            return jsonify({"message": "Unauthenticated"}), 401

        if not ObjectId.is_valid(id):
            return jsonify({"message": f"No post with id: {id}"}), 404

        post = post_messages.find_one({"_id": ObjectId(id)})  # Assuming post_messages is your collection

        if not post:
            return jsonify({"message": f"No post with id: {id}"}), 404

        is_liked = user_id in post.get('likes', [])

        if is_liked:
            post['likes'].remove(user_id)
        else:
            post['likes'].append(user_id)

        # Update the post in the database
        post_messages.update_one({"_id": ObjectId(id)}, {"$set": {"likes": post['likes']}})

        return jsonify(post), 200

    except Exception as e:
        print("[ERROR]: Error occured in liking the post: ", e)
        return jsonify({"message": "Something went wrong."}), 500


def create_post(new_post: dict):
    try:
        new_post['creator'] = 'user'
        now = datetime.datetime.now()
        new_post['createdAt'] = now
        print("Runned normally", ")"*45)
        print(new_post)
        
        result = post_messages.insert_one(new_post)

        if result.acknowledged:
            # convert ObjectId to str
            new_post['_id'] = str(result.inserted_id)
            return jsonify(new_post), 201
        else:
            return jsonify({"message": "Failed to insert data in Server"}), 500

    except Exception as e:
        print(f"[ERROR]: Exception during creation of post: {e}")
        return jsonify({"message": "Something went wrong in creation of post"}), 409

def update_post(id: str, data):
    pass


def delete_post(id: str):
    try:
        # check validity of post
        if not ObjectId.is_valid(id):
            return jsonify({"message": f"No post with id: {id}"}), 404
        result = post_messages.delete_one({"_id": ObjectId(id)})
        # see if post is deleted from the database
        if not result.deleted_count:
            print("[CRITICAL]: post is valid but post wanot deleted due to error in database")
            return jsonify({"message": f"Couldnot perform delete action on post with id: {id}"}), 404
        return jsonify({"message": "Post is succesfully deleted"}), 200
    except Exception as e:
        print(f"[ERROR]: Error while delete operation: {e}")
        return jsonify({"message": "Something went wrong"}), 500


def comment_post(id: str, comment: str):
    try:
        post = post_messages.find_one({"_id": ObjectId(id)})
        if post is None:
            return jsonify({"message": f"No post with id: {id}"}), 404
        
        # push the new comment in object post
        post["c.omments"].push(comment)
        updated_post = post_messages.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": {"comments": post["comments"]}},
            return_document=ReturnDocument.AFTER
        )

        # Conver ObjectID into str
        updated_post["_id"] = str(updated_post["_id"])
        return jsonify(updated_post), 200
    except Exception as e:
        print("[ERROR]: Error occured during Commeting the post")
        return jsonify({"message": "Something went wrong"}), 500
