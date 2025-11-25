# Memories Project - Server API

The backend API for the Memories application, built with Flask and MongoDB. This server handles user authentication, post management (CRUD), and social features like liking and commenting.

## 🚀 Tech Stack

* **Framework**: Flask
* **Database**: MongoDB (PyMongo)
* **Authentication**: JWT (JSON Web Tokens) & Google OAuth
* **Security**: Bcrypt for password hashing, CORS support

## 🛠️ Prerequisites

* Python 3.8+
* MongoDB (Local instance or Atlas Cluster)

## 📦 Installation

1. **Navigate to the server directory:**

   ```bash
   cd server
   ```

2. **Create and activate a virtual environment:**

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

## ⚙️ Configuration

### 1. Environment Variables

Create a `.env` file in the `server` directory based on `.env.example`:

```bash
cp .env.example .env
```

Run MongoDB via Docker:

```bash
docker compose up -d
```

Update `.env` with your credentials:

```env
# Database Configuration
MONGODB_USERNAME=your_username
MONGODB_PASSWORD=your_password
MONGODB_URI_ENDPOINT=your_cluster_url # e.g., localhost or cluster0.xyz.mongodb.net

# Optional: Force localhost usage
# USE_LOCALHOST=true 

# Security
JWT_SECRET_KEY=your_super_secret_key
```

> **Note for Localhost**:
> If you are running MongoDB locally, you can set `USE_LOCALHOST=true` or simply use `localhost` in your `MONGODB_URI_ENDPOINT`.
> The application supports both `mongodb://` (local) and `mongodb+srv://` (Atlas).

### 2. CORS Setup

To allow Cross-Origin Resource Sharing (CORS) in the Flask API, the project uses the **flask-cors** extension.

#### Install:

```bash
pip install flask-cors
```

#### Basic configuration:

```python
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

# Allow CORS for all routes
CORS(app)
```

#### Advanced configuration (optional):

```python
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

# Allow CORS for specific routes and origins
CORS(app, resources={
    r"/api/*": {
        "origins": "http://example.com",
        "methods": ["GET", "POST"]
    }
})
```

#### Example route with CORS enabled:

```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {"message": "This data is accessible via CORS."}
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
```

Your Flask API is now fully configured to handle cross-origin requests—useful for React, Vue, Angular, or mobile clients.

## 🏃‍♂️ Running the Server

Start the development server:

```bash
flask run
```

The server will start at:
**[http://localhost:5000](http://localhost:5000)**

## 🔌 API Endpoints

### **Posts**

* `GET /posts?page=<number>` — Fetch paginated posts
* `GET /posts/search?searchQuery=<query>&tags=<tags>` — Search posts
* `POST /posts` — Create a new post (Auth required)
* `GET /posts/<id>` — Get a specific post
* `PATCH /posts/<id>` — Update a post (Auth required)
* `DELETE /posts/<id>` — Delete a post (Auth required)
* `PATCH /posts/<id>/likePost` — Like a post (Auth required)
* `POST /posts/<id>/commentPost` — Comment on a post (Auth required)

### **Users**

* `POST /user/signin` — Sign in
* `POST /user/signup` — Register

## 🔒 Security Features

* **JWT Authentication**
* **Google OAuth** (via `google-auth`)
* **Input Validation** (email + password strength)
* **CORS Support** (configurable via `flask-cors`)
* **Hashed Passwords** using bcrypt

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
