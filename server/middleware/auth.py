import os
import jwt
from flask import jsonify
from jwt.exceptions import (
    InvalidTokenError, 
    ExpiredSignatureError, 
    InvalidSignatureError
)

SECRET = os.environ.get("JWT_SECRET_KEY")

def auth(request):
    try:
        # Extract the token from the Authorization header
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            raise ValueError("Authorization header is missing")
        
        # Token is expected to be in the format "Bearer <token>"
        token = auth_header.split(' ')[1]
        if not token:
            raise ValueError("Token is missing")

        is_custom_token = len(token) < 500
        
        # Define allowed algorithms
        allowed_algorithms = ['HS256', 'RS256', 'ES256']  # Add other algorithms as needed
        
        if token and is_custom_token:
            # Decode with known secret and allowed algorithms
            decoded_data = jwt.decode(token, key=SECRET, algorithms=allowed_algorithms)
            request.userId = decoded_data.get('id')
        else:
            # Secure Google Token Verification
            try:
                from google.oauth2 import id_token
                from google.auth.transport import requests
                
                # Verify the token with Google's public keys
                # You should ideally set your GOOGLE_CLIENT_ID in .env and pass it here
                # id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
                
                # For now, we verify the signature and issuer without checking audience if not provided
                decoded_data = id_token.verify_oauth2_token(token, requests.Request())
                request.userId = decoded_data.get('sub')
            except ImportError:
                print("[WARNING]: google-auth library not installed. Falling back to insecure decoding for dev only.")
                decoded_data = jwt.decode(token, options={"verify_signature": False})
                request.userId = decoded_data.get('sub')
            except Exception as e:
                print(f"[ERROR]: Google token verification failed: {e}")
                raise ValueError("Invalid Google token")
        
        return request
    
    except ValueError as ve:
        print(f"[ERROR]: {ve}")
        return jsonify({"message": f"Authentication failed: {ve}"}), 401
    except ExpiredSignatureError:
        print("[ERROR]: Token has expired")
        return jsonify({"message": "Token has expired"}), 401
    except InvalidSignatureError:
        print("[ERROR]: Invalid token signature")
        return jsonify({"message": "Invalid token signature"}), 401
    except InvalidTokenError as ite:
        print(f"[ERROR]: Invalid token error")
        print(f"[ERROR INFO]: {ite}")
        return jsonify({"message": "Invalid token"}), 401
    except Exception as err:
        print("[ERROR]: Error occurred during authentication")
        print("[ERROR INFO]: ", err)
        return jsonify({"message": "Authentication error"}), 401
