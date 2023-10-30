from flask import Flask, request
from flask_cors import CORS

from models.db import client_init

app = Flask(__name__)
CORS(app=app)

client = client_init()

@app.route('/search')
def search():
    # Get the 'q' parameter from the query string
    query_param = request.args.get('q')
    return f'q={query_param}'

@app.route("/")
def home():
    return "<h1>Hello world</h1>"
    # db = client["memories"]
    # post_message = db["postMessage"]
    # posts = list(post_message.find().sort([("_id", -1)]))
    # return str(posts)

@app.route("/posts")
    db = client["test"]
    post_message = db["postMessage"]
    
    posts = list(post_message.find())
    print("*"*43)
    print()
    return str(posts)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
