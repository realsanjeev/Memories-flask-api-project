import os
from pymongo import MongoClient, errors

def client_init(localhost=False):
    if localhost:
        try:
            client = MongoClient("localhost", 27017)
            return client
        except Exception as err:
            raise Exception(f"Could not connect to your local database: {err}")
    
    username = os.environ.get("MONGODB_USERNAME")
    password = os.environ.get("MONGODB_PASSWORD")
    cluster_uri = os.environ.get("MONGODB_URI_ENDPOINT")
    uri_endpoint = f"mongodb+srv://{username}:{password}@{cluster_uri}"
    
    try:
        client = MongoClient(uri_endpoint)
        return client
    except errors.AutoReconnect as err:
        raise Exception(f"Error occurred in Auto Reconnection: {err}")
    except errors.ConnectionFailure as err:
        raise Exception(f"Connection Failure: {err}")
    except BaseException as e:
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

