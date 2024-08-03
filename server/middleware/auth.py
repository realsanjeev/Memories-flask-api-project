import os
import jwt
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
            # unsecure method for now: https://stackoverflow.com/a/65874863
            decoded_data = jwt.decode(token, options={"verify_signature": False})
            request.userId = decoded_data.get('sub')
        
        return request
    
    except ValueError as ve:
        print(f"[ERROR]: {ve}")
    except ExpiredSignatureError:
        print("[ERROR]: Token has expired")
    except InvalidSignatureError:
        print("[ERROR]: Invalid token signature")
    except InvalidTokenError as ite:
        print(f"[ERROR]: Invalid token error")
        print(f"[ERROR INFO]: {ite}")
    except Exception as err:
        print("[ERROR]: Error occurred during authentication")
        print("[ERROR INFO]: ", err)
