import jwt

SECRET = 'test-secret-for-token-gen'

def auth(request):
    try:
        token = request.headers.get("Authorization").split(' ')[1]
        is_custom_token = len(token) < 500

        if token and is_custom_token:
            decoded_data = jwt.decode(token, key=SECRET, algorithms=['HS256'])
            request.userId = decoded_data.get('id')
        else:
            decoded_data = jwt.decode(jwt=token)
            request.userId = decoded_data.get('sub')
        return request
    except Exception as e:
        print("[ERROR]: Error occured dduring authentication")