import pymongo
import json
import time
import datetime
import sys
import numpy

url = 'mongodb://localhost:27017/'
#url = 'mongodb://localhost:27014/'

dbase = sys.argv[1]
print("database: " + str(dbase))

client = pymongo.MongoClient(url)
db = client[dbase]
usersCol = db['users']
responsesCol = db['responses']
percentArray = []
dataArray = []
fnrArray = []
#specify ground truth for each question
groundtruth = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] #length 30


userResponse = responsesCol.find({"user":"ryasmin"})
for i in range(1,30):
    if(groundtruth[i] == userResponse[i]["q1"]):
        print(userResponse[i]["q1"])
        print("CORRECT")
    else:
        print(userResponse[i]["q1"])
        print("WRONG")
