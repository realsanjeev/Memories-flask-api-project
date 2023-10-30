from flask import Flask, request
from flask_cors import CORS

from models.posts import get_posts

app = Flask(__name__)
CORS(app=app)

@app.route('/search')
def search():
    # Get the 'q' parameter from the query string
    query_param = request.args.get('q')
    return f'q={query_param}'

@app.route("/")
def home():
    return "<h1>Hello world</h1>"
    # db = client["test"]
    # post_message = db["postMessages"]
    # posts = list(post_message.find().sort([("_id", -1)]))
    # return str(posts)

@app.route("/posts")
def get_posts_route():
    page = int(request.args.get('page', 1))
    posts_response = get_posts(page)
    return posts_response


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
