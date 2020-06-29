################################################################
### INSTALL chromedriver from brew
################################################################
from  time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json
import re
import requests
import urllib.request

file1 = open("data.json", "a")
    	##############################################
    	## SOLVE THE 250 issue solution!!!!!!!!!!!!!!!!!!!!
    	## !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    	# Since the max youtube box is 250
    	# We need to save the last Message/Author
    	# Then find the new position Number of the  last Message/Author
    	# Set that number to startPoint
    	# Let program run
startPoint = 0.0
#chrome_options = webdriver.ChromeOptions()
#chrome_options.add_argument('--allow-running-insecure-content')
#chrome_options.add_argument('--disable-gpu')
#chrome_options.add_argument('--no-sandbox')
#chrome_options.add_argument('--headless')
#chrome_options.add_argument('--disable-extensions')
#
########################################
## CLEAN THE DATA
######################################
def deEmojify(text):
    text_encoded = text.encode("utf-8")
    text = text_encoded.decode('utf-8','ignore')
    regrex_pattern = re.compile(pattern = "["
        u"\U0001F600-\U0001F64F"  # emoticons
        u"\U0001F300-\U0001F5FF"  # symbols & pictographs
        u"\U0001F680-\U0001F6FF"  # transport & map symbols
        u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                           "]+", flags = re.UNICODE)
    return regrex_pattern.sub(r'',text)

###
## NOTE IF USING MAC OS: Use BREW to isntall chromedriver
## NOTE IF USING WINDOWS: Just point the path to the binary chromedriver.exe
#Some code from: https://github.com/TechMaz/youtube-live-chat-scraper/tree/master/app
driver = webdriver.Chrome('/usr/local/bin/chromedriver')  # Optional argument, if not specified will search path.
driver.get('https://www.youtube.com/live_chat?v=DWcJFNfaw9c');
driver.implicitly_wait(1)

####################################
## GET Chat data: We scrape that from the chat box.
####################################
global oldLength
oldLength = 0

lastMessageAuth = ""
lastMessageAuthPosition = 0
def getChat():
    chats = []
    x = 0
    for chat in driver.find_elements_by_css_selector('yt-live-chat-text-message-renderer'):
        author_name = chat.find_element_by_css_selector("#author-name").get_attribute('innerHTML')
        message = chat.find_element_by_css_selector("#message").get_attribute('innerHTML')
        author_name = author_name.split("<")[0]
        message = message.split("<")[0]
        #if(x >= 249):
        #    global lastMessageAuth
        #    lastMessageAuth = author_name

        #author_name_encoded = author_name.encode('utf-8').strip()

            #print({'author_name': author_name, 'message': deEmojify(message)})

        obj = json.dumps({'author_name':author_name, 'message': message})
        chats.append(json.loads(obj))
        x = x +1
    x = 0
    return chats
##################################
## GET DATA STUFF ( START POINT)
## StartPoint is where you want the
#################################
def getDataStuff(startPoint):
    startingPoint = startPoint
    chatData = getChat()

    
    print("MY GET DATA STUFF")
    #print(chatData[startingPoint:])
    ## THIS IS WHERE YOU LOOP THROUGH THE CHATS TO PRINT THEM AND VALIDATE THEM AND SEND THEM
    ## STEPS:
    ## SPLIT by "<"
    ## CHECK IF VALID COLOR
    ## SEND DATA TO EXPRESS
    ###############
    ##
    for chatMessage in chatData[startingPoint:]:
        author_name = chatMessage["author_name"].split("<")[0]
        message = chatMessage["message"].split("<")[0]
        file1.write("author_name : " +author_name + ", message: " +message)

        body = {"source": "PYTHON","username": "username","validColor": "True" ,"hex":"False","color":"!red", "red": 255, "green": 0, "blue": 0}

        myurl = "http://localhost:5000/sendcolordata"
        req = urllib.request.Request(myurl)
        req.add_header('Content-Type', 'application/json; charset=utf-8')
        jsondata = json.dumps(body)
        jsondataasbytes = jsondata.encode('utf-8')   # needs to be bytes
        req.add_header('Content-Length', len(jsondataasbytes))
        print (jsondataasbytes)
        response = urllib.request.urlopen(req, jsondataasbytes)
        print(response)
    	#print(chatMessage)
    	#print("")
    	#SplitMessage = chatMessage["author_name"].split("<")
    	#print(SplitMessage)
    #file1.write(chatData[startingPoint:], )
    #with open('data.json', 'w') as f:
    #    json.dump(chatData, f)
    ####
    ## SEND chatData[startingPoint:] to NETWORK HIT
    ####
    return [len(chatData),chatData] 



def getNewestPosition(message, chats):
	pos = 0
	for chat in chats:
		if(chat == message):
			print("HELLO WORLD I AM HERE ", pos)
			return pos
		pos = pos +1

####################################################
## RUN THE FUNCTIONS 5 TIMES
startData = getDataStuff(0) #START POINT RUN POINT
startPoint = startData[0] +1 #START POINT RUN POINT

#startPoint = getDataStuff(0)[0] +1 #START POINT RUN POINT
while(True):
    startData = getDataStuff(startPoint) #START POINT RUN POINT
    startPoint = startData[0] +1 #START POINT RUN POINT    if(startPoint == getDataStuff(startPoint)[0]):
    #print("startData[1][len(startData[1])-1]")
    #print(startData[1][len(startData[1])-1])
    lastIndexPosition = len(startData[1])-1
    lastMessage = startData[1][len(startData[1])-1]
    #innerHTML = driver.execute_script("return document.body.innerHTML")
    #print(innerHTML)
    print(startPoint)
    if(startPoint >=248):
    	#print("START DATA", startData)
    	startData = getDataStuff(startPoint) #START POINT RUN POINT

    	startPoint = getNewestPosition(lastMessage, startData[1]) +1
    	
    	print("NEW START POINT", startPoint)
    	##############################################
    	## SOLVE THE 250 issue solution!!!!!!!!!!!!!!!!!!!!
    	## !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    	# Since the max youtube box is 250
    	# We need to save the last Message/Author
    	# Then find the new position Number of the  last Message/Author
    	# Set that number to startPoint
    	# Let program run
        
    sleep(10)

