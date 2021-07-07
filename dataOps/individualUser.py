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
groundtruth = [1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0]

for user in usersCol.find():

    userName = user['user']
    userResponse = responsesCol.find({"user":userName})
    print(userName)
    demographic = user["surveyResults"]

    

    score = user['score']
    if(score != "None"):
        print(score)
        percentArray.append(score*100/24)

    #false negative check
    fnr = 0
    for i in range(12):
        if(userResponse["q1"] != groundtruth[i]):
            fnr = fnr+1
    print(fnr)

print(percentArray)
