from bson import json_util
from .db import client_init

client = client_init()
db_connect = client['test']
post_messages = db_connect['postmessages']

def get_posts(page: int):
    '''Get the posts from the collection'''
    LIMIT = 3
    start_index = (page - 1) * LIMIT
    total = post_messages.count_documents({})
    print("total: ", total, "page: ", page)
    # convert object to list of record
    posts = list(post_messages.find().limit(3))
    print("*"*32, len(posts))

    # convert ObjectId to string
    for post in posts:
        post['_id'] = str(post['_id'])
    posts_response = {"data": posts, "currentPage": page, "numberOfPages": total//LIMIT}
    return posts_response
