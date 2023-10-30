from pymongo import MongoClient, errors

def client_init():
    username = 'makerking'
    password = 'makerking'
    cluster_uri = 'cluster0.xpammz2.mongodb.net/test'
    uri_endpoint = f"mongodb+srv://{username}:{password}@{cluster_uri}"
    try:
        client = MongoClient(uri_endpoint)
        return client
    except errors.AutoReconnect as err:
        raise f"Error occurred in Auto REconnection: {err}"
    except errors.ConnectionFailure as err:
        raise f"Connection Failure: {err}"
    except Exception as e:
        raise f"GEneral Exception: {e}"

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

