import os
from pymongo import MongoClient, errors

def client_init(localhost=False):
    # Check if user wants to force localhost via env
    if os.environ.get("USE_LOCALHOST") == "true":
        localhost = True

    if localhost:
        try:
            # Check if we have credentials for localhost
            username = os.environ.get("MONGODB_USERNAME")
            password = os.environ.get("MONGODB_PASSWORD")
            
            if username and password:
                # Localhost with auth
                uri = f"mongodb://{username}:{password}@localhost:27017/?authSource=admin"
                client = MongoClient(uri)
            else:
                # Localhost without auth
                client = MongoClient("localhost", 27017)
            
            # Force a connection check
            client.admin.command('ping')
            return client
        except Exception as err:
            raise Exception(f"Could not connect to your local database: {err}")
    
    username = os.environ.get("MONGODB_USERNAME")
    password = os.environ.get("MONGODB_PASSWORD")
    cluster_uri = os.environ.get("MONGODB_URI_ENDPOINT")
    
    if not all([username, password, cluster_uri]):
        raise Exception("Missing MongoDB environment variables. Please check your .env file.")

    # Determine scheme based on URI (localhost vs Atlas)
    if "localhost" in cluster_uri or "127.0.0.1" in cluster_uri:
        uri_endpoint = f"mongodb://{username}:{password}@{cluster_uri}/?authSource=admin"
    else:
        uri_endpoint = f"mongodb+srv://{username}:{password}@{cluster_uri}/?authSource=admin&retryWrites=true&w=majority"
    
    try:
        client = MongoClient(uri_endpoint)
        # Force a connection check
        client.admin.command('ping')
        return client
    except errors.ConfigurationError as ce:
        raise Exception(f"Configuration Error: {ce}. Check your MONGODB_URI_ENDPOINT.")
    except errors.AutoReconnect as err:
        raise Exception(f"Error occurred in Auto Reconnection: {err}")
    except errors.ConnectionFailure as err:
        raise Exception(f"Connection Failure: {err}")
    except Exception as e:
        raise Exception(f"General Exception: {e}")


if __name__=="__main__":
    print('******Testing Connection and other models in Server******')
    client = client_init()
    database_lists = client.list_database_names()
    for database in database_lists:
        db_connect = client[database]
        collections_list = db_connect.list_collection_names()
        print("database: ", database, " collections list: ", collections_list)
        for collection_name in collections_list:
            collection = db_connect[collection_name]
            print("#"*4, collection_name, "#"*4)
            data = list(collection.find())
            if len(data):
                print(f"[INFO]: {database.upper()} database \
                      {collection_name.upper()} collection has record in collection")

