#############################################
## Python Youtube Component
## Scrapes Youtube live stream data chat data then sends it to the Express server
## Created by: Edward C. Deaver, IV
## Last Modified: June 30, 2020
## Requires: Youtube live stream is running
##           Express server running
#############################################
from  time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import json
import re
import requests
import urllib.request
import string
import hashlib
#Some code from: https://github.com/TechMaz/youtube-live-chat-scraper/tree/master/app
import os
#print("os.path.abspath(os.getcwd())")
#print(os.path.abspath(os.getcwd()))

## Establishes the current directory of the Python file. 
## Needed to restablish the path due to calling it from start.sh
os.chdir(os.path.abspath(os.getcwd()) + "/Components/YoutubeChatComponent/")  # Provide the new path here

############################
## LOCAL VARIABLES
############################
startPoint = 0.0
YoutubeStreamID = 'dDUmn5lpC1g'
YoutubeChatURL  = 'https://www.youtube.com/live_chat?v='
TOTALYOUTUBEURL = YoutubeChatURL+YoutubeStreamID


#################################################################################
##                           COLOR FUNCTIONS                                   ## 
#################################################################################


#####################
## Get colors data
#####################
colorFile = ""
with open('colors.json') as f:
  colorFile = json.load(f)
colorFileKeys = colorFile.keys()
######################

#####################################
## GETS THE hex value color supplied
## If valid: returns hex 
## If not valid: returns false
#####################################
def validateColor(Message, ColorDataKeys, ColorDataValues):
    print(Message)
    if(Message in  ColorDataKeys):
        #print("HELLO", ColorDataValues[Message])
        return ColorDataValues[Message]
    else:
        return False


####################################
## VALIDATE HEX COLOR
## If valid: returns hex 
## if not valid: returns false
## Message = Message data
## From: https://stackoverflow.com/questions/1323364/in-python-how-to-check-if-a-string-only-contains-certain-characters
####################################
def validateHex(Message, search=re.compile(r'[^a-fA-F0-9.]').search):
    lengthCorrect = (len(Message) == 6)
    formatCorrect = not bool(search(Message))
    if (lengthCorrect == True and formatCorrect == True):
        #print("Valid HEX")
        return Message
    else:
        #print("NOT CORRECT")
        return False


#################################################################################
##                           TEXT CLEAN FUNCTIONS                              ## 
#################################################################################


########################################
## CLEAN THE DATA
## Message will encode to acii and decode to utf 8 which will remove all the emojis
## Message translate removes all the string punctionation
## Regular Expression to remove the emojis is from:
## https://stackoverflow.com/questions/33404752/removing-emojis-from-a-string-in-python
######################################
def cleanText(Message):
    if(isinstance(Message, str)):
        #print("try")
        try:
            Message = Message.encode('ascii', 'ignore').decode("utf-8")
            regrex_pattern = re.compile(pattern = "["
                u"\U0001F600-\U0001F64F"  # emoticons
                u"\U0001F300-\U0001F5FF"  # symbols & pictographs
                u"\U0001F680-\U0001F6FF"  # transport & map symbols
                u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                           "]+", flags = re.UNICODE)
            Message = regrex_pattern.sub(r'',Message)
            if("#" in Message or "!" in Message):
                if("!" in Message):
                    Message = "!" + Message.translate(str.maketrans('', '', string.punctuation)).replace(" ", "")
                    return Message;
                if("#" in Message):
                    Message = "#" + Message.translate(str.maketrans('', '', string.punctuation)).replace(" ", "")
                    return Message;        
            else:
                Message = Message.translate(str.maketrans('', '', string.punctuation)).replace(" ", "")
                return Message;
        except:
            return False;
    else:
        return False;

#################################################################################
##                           YOUTUBE / SELENIUM FUNCTIONS                      ## 
#################################################################################

##################################
## getChat gets youtube chat
## Get Chat returns the chat list from "yt-live-chat-text-message-renderer" selector
## You need to make sure the page is loaded before this runs
## Creates the standard messages needed for Express and saves them into Chats[]
## Chat [] == {'username': "USERNAME"(STRING), 'color': "AABBCC" (STRING), 'validColor': "False / True" (STRING), 'hex': "False/True" (STRING), 'red':0 (INT) , 'green':0 (INT) , 'blue':0 (INT) }
## Returns chat [] 
##################################
def getChat():
    chats = []

    ## Obtains the list of elements using 'yt-live-chat-text-message-renderer' class in the webpage
    ## Some code to get elements by CSS selector from: https://github.com/TechMaz/youtube-live-chat-scraper/blob/master/app/scraper.py
    for chat in driver.find_elements_by_css_selector('yt-live-chat-text-message-renderer'):
        ## Gets and cleans the username of the commentor and hashes it using MD5, and gets rid of all emojis. 
        username = hashlib.md5(cleanText(chat.find_element_by_css_selector("#author-name").get_attribute('innerHTML').split("<")[0]).encode('utf-8')).hexdigest()
        ## Gets and cleans the message data of the comment
        message = cleanText(chat.find_element_by_css_selector("#message").get_attribute('innerHTML').split("<")[0])
        ## Stores template of json data to send
        obj = json.dumps({'username':username, 'color': "null", 'validColor': "False", 'hex': "False", 'red':0, 'green':0, 'blue':0 })
        # If the message check. Ex. "!red"
        if("!" in message):
            if(len(message) > 2):
                colorData = validateColor(message[1:], colorFileKeys, colorFile)
                #print("COLOR DATA FROM CHATS: "+ message)
                #print("COLOR DATA FROM CHATS: "+ colorData)
                validColor = "False"
                hexData  = "False" 
                if(colorData == False):
                    validColor = "False"
                    hexData  = "False"
                else:   
                    color = tuple(int(colorData[i:i+2], 16) for i in (0, 2, 4))
                    validColor = "True"
                    hexData  = "False"
                    obj = json.dumps({'username':username, 'color': colorData, 'validColor': validColor, 'hex': hexData, 'red':color[0], 'green':color[1], 'blue':color[2]   })
                    chats.append(json.loads(obj))
                    continue
        #Check if message is hex command. "Ex. #AABBCC"
        elif("#" in message):
            if(len(message) > 2):
                colorData = validateHex(message[1:])
                #print("COLOR DATA FROM CHATS: "+ message)
                #print("COLOR DATA FROM CHATS: "+ colorData)
                validColor = "False"
                hexData  = "False" 
                if(colorData == False):
                    validColor = "False"
                    hexData  = "False"
                else:   
                    color = tuple(int(colorData[i:i+2], 16) for i in (0, 2, 4))
                    validColor = "True"
                    hexData  = "True"
                    obj = json.dumps({'username':username, 'color': colorData, 'validColor': validColor, 'hex': hexData, 'red':color[0], 'green':color[1], 'blue':color[2]   })
                    chats.append(json.loads(obj))
                    continue

        if(json.loads(obj)['color'] == "null"): 
            chats.append(json.loads(obj))
            continue
    print("CHAT LENGTH " + str(len(chats)))
    return chats
##################################
## pointChatData( START POINT (DOUBLE))
## Reads through the chat data and then sends it to the Express server 
## starting at the startPoint. Which is the last length of the chat
## StartPoint (double) is where you want the loop to start 
## Returns: [Length of chat data, and the chatData]
#################################
def pointChatData(startPoint):
    startingPoint = startPoint
    chatData = getChat()
    for chatMessage in chatData[startingPoint:]:
        sendToInternal(chatMessage)
    return [len(chatData),chatData] 

##################################
## sendToInternal(chatMessage (JSON OBJECT))
## Sends data message to Express server at localhost:5000/sendcolordata
## 
## StartPoint (double) is where you want the loop to start 
#################################
def sendToInternal(chatMessage):
    try:
        body = {"source": "Youtube","username": chatMessage["username"], "validColor": chatMessage["validColor"] ,"hex":chatMessage["hex"],"color": chatMessage["color"], "red": chatMessage["red"], "green": chatMessage["green"], "blue": chatMessage["blue"]}
        myurl = "http://localhost:5000/sendcolordata"
        req = urllib.request.Request(myurl)
        req.add_header('Content-Type', 'application/json; charset=utf-8')
        jsondata = json.dumps(body)
        jsondataasbytes = jsondata.encode('utf-8')   # needs to be bytes
        req.add_header('Content-Length', len(jsondataasbytes))
        print (jsondataasbytes)
        response = urllib.request.urlopen(req, jsondataasbytes)
        print(response)    
        return response
    except:
        return "error"

#######################
## getNewestPosition - Gets the newest position of the (last) message
## This is needed due to Youtube's chat window removing the first message once it's message stack reaches ~248 comments. 
## message - the last message you need to check the new position of.
## chats - the chat array
## Returns: pos - position (int)
#######################
def getNewestPosition(message, chats):
	pos = 0
	for chat in chats:
		if(chat == message):
			return pos
		pos = pos +1


#################################################################################
##                           SELENIUM FUNCTIONS                                ## 
#################################################################################

## Creates the driver. Downloads google chrome using webdriver_manager. This is used so you don't 
## have to set a path to a static binary
driver = webdriver.Chrome(ChromeDriverManager().install())  # Optional argument, if not specified will search path.
## Opens up the URL
driver.get(TOTALYOUTUBEURL);
## Waits 1 second before it starts to read
driver.implicitly_wait(1)

####################################
## GET Chat data: We scrape that from the chat box.
####################################
#global oldLength
#oldLength = 0
## Last message and the position. Theses are used to reset the index postion when the stack starts popping. 
lastMessageAuth = ""
lastMessageAuthPosition = 0
#sleeps for 2 seconds just for good measure.
sleep(2)
#colorData = validateColor("red", colorFileKeys, colorFile)
#color = tuple(int(colorData[i:i+2], 16) for i in (0, 2, 4))
#print("COLOR DATA"+colorData[1:])

startData = pointChatData(0) #START POINT Data
startPoint = startData[0] #Start point is set to the length of StartData
## Runs forever
while(True):
    startData = pointChatData(startPoint) #START POINT RUN POINT
    startPoint = startData[0]#START POINT RUN POINT    if(startPoint == pointChatData(startPoint)[0]):
    #print("START POINT " + str(startPoint))
    ## If we are reaching near the max of 248 chat
    if(startPoint>248):
        ## Get the last index position which is the length of the last chat -1. 
        lastIndexPosition = len(startData[1])-1
        ## Now find the last message from that chat
        lastMessage = startData[1][len(startData[1])-1]
        ## Set a new startpoint based on where the last chat message is in the new chats
        startPoint = getNewestPosition(lastMessage, startData[1])
        #print("START POINT2 " + str(startPoint))
    sleep(10)

