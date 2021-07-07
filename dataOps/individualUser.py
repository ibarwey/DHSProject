import pymongo
import json
import time
import datetime
import sys

#url = 'mongodb://localhost:27017/'
url = 'mongodb://localhost:27014/'

dbase = sys.argv[1]
print("database: " + str(dbase))

client = pymongo.MongoClient(url)
db = client[dbase]
usersCol = db['users']
responsesCol = db['responses']
percentArray = []
dataArray = []

#specify ground truth for each question
groundtruth = [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1]

for user in usersCol.find():

    userResponse = {}

    userName = user['user']
    print(userName)
    demographic = user["surveyResults"]

    userResponse["name"] = userName
    userResponse["demographic"] = demographic

    score = user['score']
    if(score != "None"):
        print(score)
        percentArray.append(score*100/16)

print(percentArray)
