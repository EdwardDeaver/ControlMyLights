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
print("os.path.abspath(os.getcwd())")
print(os.path.abspath(os.getcwd()))
os.chdir(os.path.abspath(os.getcwd()) + "/YoutubeChatComponent/")  # Provide the new path here

############################
## LOCAL VARIABLES
############################
startPoint = 0.0
YoutubeStreamID = '5frZkc9dFJ0'
YoutubeChatURL  = 'https://www.youtube.com/live_chat?v='
TOTALYOUTUBEURL = YoutubeChatURL+YoutubeStreamID

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
print(validateColor("purple", colorFileKeys, colorFile))

########################################
## CLEAN THE DATA
## Message will encode to acii and decode to utf 8 which will remove all the emojis
## Message translate removes all the string punctionation
## Regular Expression to remove the emojis is from: https://stackoverflow.com/questions/33404752/removing-emojis-from-a-string-in-python
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



##################################
## Get Chat returns the chat list from yt-live-chat-text-message-renderer selector
## You need to make sure the page is loaded before this runs
##################################
def getChat(ColorDataKeys, ColorDataValues):
    chats = []
    for chat in driver.find_elements_by_css_selector('yt-live-chat-text-message-renderer'):
        username = hashlib.md5(cleanText(chat.find_element_by_css_selector("#author-name").get_attribute('innerHTML').split("<")[0]).encode('utf-8')).hexdigest()
        message = cleanText(chat.find_element_by_css_selector("#message").get_attribute('innerHTML').split("<")[0])

        obj = json.dumps({'username':username, 'color': "null", 'validColor': "False", 'hex': "False", 'red':0, 'green':0, 'blue':0 })

        if("!" in message):
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


        if(json.loads(obj)['color'] == "null"): 
            chats.append(json.loads(obj))
    print("chAT LENGTH " + str(len(chats)))

           ## User
    return chats
##################################
## GET DATA STUFF ( START POINT)
## StartPoint is where you want the
#################################
def getDataStuff(startPoint, ColorDataKeys, ColorDataValues):
    startingPoint = startPoint
    chatData = getChat(ColorDataKeys, ColorDataValues)

    
    #print("MY GET DATA STUFF" + "START POINT: " + str(startingPoint))

    ##
    for chatMessage in chatData[startingPoint:]:
        print("chatMessage")
        print(chatMessage)
        '''if("!" in chatMessage["author_name"]):
            validateColor(chatMessage["message"][1:], ColorDataKeys, ColorDataValues)

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
        '''

    return [len(chatData),chatData] 


#######################
## getNewestPosition - Gets the newest position of the message
## message - the last message you need to check the new position of 
## chats - the held message
#######################
def getNewestPosition(message, chats):
	pos = 0
	for chat in chats:
		if(chat == message):
			#print("HELLO WORLD I AM HERE ", pos)
			return pos
		pos = pos +1


####################################################
###
driver = webdriver.Chrome(ChromeDriverManager().install())  # Optional argument, if not specified will search path.
driver.get(TOTALYOUTUBEURL);
driver.implicitly_wait(1)
####################################
## GET Chat data: We scrape that from the chat box.
####################################
global oldLength
oldLength = 0
lastMessageAuth = ""
lastMessageAuthPosition = 0
####################################################
## RUN THE FUNCTIONS 5 TIMES
sleep(2)
colorData = validateColor("red", colorFileKeys, colorFile)
color = tuple(int(colorData[i:i+2], 16) for i in (0, 2, 4))
print("COLOR DATA"+colorData[1:])
startData = getDataStuff(0, colorFileKeys, colorFile) #START POINT RUN POINT
startPoint = startData[0] #START POINT RUN POINT
while(True):
    startData = getDataStuff(startPoint, colorFileKeys, colorFile) #START POINT RUN POINT
    startPoint = startData[0]#START POINT RUN POINT    if(startPoint == getDataStuff(startPoint)[0]):
    print("START POINT " + str(startPoint))
    if(startPoint>248):
        lastIndexPosition = len(startData[1])-1
        lastMessage = startData[1][len(startData[1])-1]
        startPoint = getNewestPosition(lastMessage, startData[1])
        print("START POINT2 " + str(startPoint))
    sleep(10)

