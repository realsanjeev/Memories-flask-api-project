from pymongo import MongoClient

username = 'makerking'
password = 'makerking'
cluster_uri = 'cluster0.xpammz2.mongodb.net'
uri_endpoint = f"mongodb+srv://{username}:{password}@{cluster_uri}"

client = MongoClient(uri_endpoint)
db = client["test"]
post_message = db["postMessage"]
