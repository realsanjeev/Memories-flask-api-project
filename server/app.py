from flask import Flask, request
from flask_cors import CORS

from models.posts import get_posts, get_post, get_posts_by_search
from models.user import signin, signup

app = Flask(__name__)
CORS(app=app, origins=['http://localhost:3000', 'https://localhost:3000'])

@app.route('/search')
def search():
    # Get the 'q' parameter from the query string
    query_param = request.args.get('q')
    return f'q={query_param}'

@app.route("/")
def home():
    return "<h1>Hello world</h1>"

@app.route("/posts")
def get_posts_route():
    page = int(request.args.get('page', 1))
    posts_response = get_posts(page)
    return posts_response

@app.route('/posts/search')
def get_posts_by_search_view():
    search_query = request.args.get('searchQuery')
    tags = request.args.get('tags')
    print("get posts by search: ", request.args)

    return get_posts_by_search(search_query, tags)

@app.route('/posts/like/<string:id>', methods=['PUT'])
def like_post_route(id: str):
    return like_post_route(request, id)


@app.route('/posts/<string:id>')
def get_post_route(id: str):
    print("*"*21, "id: ", id)
    return get_post(id)


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
