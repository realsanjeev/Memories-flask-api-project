from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app=app)

@app.route("/")
def home():
    return {
        "title": "Sample Title",
        "message": "SAmple Message",
        "creator": "Sample Creator",
        "tags": ["tag1", "tags2"],
        "selectedFile": "path"
    }

@app.route("/posts")
def index():
    return [{
        "title": "Sample Title",
        "message": "SAmple Message",
        "creator": "Sample Creator",
        "tags": ["tag1", "tags2"],
        "selectedFile": "path"
    }]

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)