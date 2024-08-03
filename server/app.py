from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

# load .env file
load_dotenv()
from models.posts import (get_posts,
                          get_post,
                          get_posts_by_search,
                          create_post,
                          delete_post,
                          update_post,
                          comment_post,
                          like_post)

from models.user import signin, signup
from middleware.auth import auth

app = Flask(__name__)
CORS(app=app, origins=['http://localhost:3000', 'https://localhost:3000'])

@app.route("/")
def home():
    return "<h1>Hello world</h1>"


@app.route('/posts/search')
def get_posts_by_search_view():
    search_query = request.args.get('searchQuery')
    tags = request.args.get('tags')
    return get_posts_by_search(search_query, tags)

@app.route("/posts", methods=['GET'])
def get_posts_route():
    page = int(request.args.get('page', 1))
    posts_response = get_posts(page)
    return posts_response

@app.route('/posts', methods=['POST'])
def create_post_route():
    post_data = request.get_json()
    req = auth(request)
    if hasattr(req, "userId"):
        return create_post(req=req, data=post_data)
    else:
        return jsonify({"message": "Authorization needed"}), 404
        

@app.route('/posts/<string:id>', methods=["GET"])
def get_post_route(id: str):
    print("*"*21, "id: ", id)
    return get_post(id)

@app.route('/posts/<string:id>', methods=['PATCH'])
def update_post_route(id: str):
    body_data = request.get_json()
    req = auth(request)
    if hasattr(req, "userId"):
        return update_post(id, updated_form=body_data)
    else:
        return jsonify({"message": "Authorization needed"}), 404
    

@app.route('/posts/<string:id>', methods=["DELETE"])
def delete_post_route(id: str):
    req = auth(request)
    if hasattr(req, "userId"):
        return delete_post(id=id)
    else:
        return jsonify({"message": "Authorization needed"}), 404

@app.route('/posts/<string:id>/likePost', methods=['PATCH'])
def like_post_route(id: str):
    req = auth(request)
    if hasattr(req, "userId"):
        return like_post(req, id)
    else:
        return jsonify({"message": "Authorization needed"}), 404

@app.route('/posts/<string:id>/commentPost', methods=["POST"])
def comment_post_route(id: str):
    new_comment = request.json.get('value')
    req = auth(request)
    if hasattr(req, "userId"):
        return comment_post(id=id, comment=new_comment)
    else:
        return jsonify({"message": "Authorization needed"}), 404

@app.route('/user/signin', methods=['POST'])
def signin_route():
    body = request.get_json()
    return signin(body)

@app.route('/user/signup', methods=['POST'])
def signup_route():
    body = request.get_json()
    return signup(data=body)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
