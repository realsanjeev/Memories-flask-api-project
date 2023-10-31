import re
from flask import jsonify
from bson import ObjectId
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

        posts = post_messages.find({
            "$or": [
                {"title": title},
                {"tags": {"$in": tags.split(',')}}
            ]
        })

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
        print(e)
        return jsonify({"message": "Something went wrong."}), 500


