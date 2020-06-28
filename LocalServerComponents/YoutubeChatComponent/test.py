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

startPoint = 0.0


#####################
## Get colors data
colorFile = ""
with open('./colors.json') as f:
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
        print("HELLO", ColorDataValues[Message])
        return ColorDataValues[Message]
    else:
        return False
#chrome_options = webdriver.ChromeOptions()
#chrome_options.add_argument('--allow-running-insecure-content')
#chrome_options.add_argument('--disable-gpu')
#chrome_options.add_argument('--no-sandbox')
#chrome_options.add_argument('--headless')
#chrome_options.add_argument('--disable-extensions')
#
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


print(cleanText("#ff00FF"))
###
## NOTE IF USING MAC OS: Use BREW to isntall chromedriver
## NOTE IF USING WINDOWS: Just point the path to the binary chromedriver.exe
#Some code from: https://github.com/TechMaz/youtube-live-chat-scraper/tree/master/app
driver = webdriver.Chrome(ChromeDriverManager().install())  # Optional argument, if not specified will search path.
driver.get('https://www.youtube.com/live_chat?v=DWcJFNfaw9c');
driver.implicitly_wait(1)

####################################
## GET Chat data: We scrape that from the chat box.
####################################
global oldLength
oldLength = 0

lastMessageAuth = ""
lastMessageAuthPosition = 0

##################################
## Get Chat returns the chat list from yt-live-chat-text-message-renderer selector
## You need to make sure the page is loaded before this runs
##################################
def getChat(ColorDataKeys, ColorDataValues):
    chats = []
    for chat in driver.find_elements_by_css_selector('yt-live-chat-text-message-renderer'):
        username = hashlib.md5(cleanText(chat.find_element_by_css_selector("#author-name").get_attribute('innerHTML').split("<")[0]).encode('utf-8')).hexdigest()
        message = cleanText(chat.find_element_by_css_selector("#message").get_attribute('innerHTML').split("<")[0])


        if("!" in message):
            colorData = validateColor(message, ColorDataKeys, ColorDataValues)
            if(colorData == False):
                validColor = "False"
                hexData  = "False"  
            else:  
                color = tuple(int(colorData[1:][i:i+2], 16) for i in (0, 2, 4))
                validColor = "True"
                hexData  = "False"
                obj = json.dumps({'username':username, 'color': colorData[1:], 'validColor': validColor, 'hex': hexData, 'red':color[0], 'green':color[1], 'blue':color[2]   })
        else:
            obj = json.dumps({'username':username, 'color': "null", 'validColor': "False", 'hex': "False", 'red':0, 'green':0, 'blue':0 })

        ## User
        chats.append(json.loads(obj))
    return chats
##################################
## GET DATA STUFF ( START POINT)
## StartPoint is where you want the
#################################
def getDataStuff(startPoint, ColorDataKeys, ColorDataValues):
    startingPoint = startPoint
    chatData = getChat(ColorDataKeys, ColorDataValues)

    
    print("MY GET DATA STUFF")

    ##
    for chatMessage in chatData[startingPoint:]:
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
			print("HELLO WORLD I AM HERE ", pos)
			return pos
		pos = pos +1

####################################################
## RUN THE FUNCTIONS 5 TIMES
sleep(2)
colorData = validateColor("red", colorFileKeys, colorFile)
color = tuple(int(colorData[i:i+2], 16) for i in (0, 2, 4))

print("COLOR DATA"+colorData[1:])


startData = getDataStuff(0, colorFileKeys, colorFile) #START POINT RUN POINT
startPoint = startData[0] +1 #START POINT RUN POINT

#startPoint = getDataStuff(0)[0] +1 #START POINT RUN POINT
for i in range(5):
    startData = getDataStuff(startPoint, colorFileKeys, colorFile) #START POINT RUN POINT
    startPoint = startData[0] +1 #START POINT RUN POINT    if(startPoint == getDataStuff(startPoint)[0]):
    #print("startData[1][len(startData[1])-1]")
    #print(startData[1][len(startData[1])-1])
    lastIndexPosition = len(startData[1])-1
    lastMessage = startData[1][len(startData[1])-1]
    print(lastMessage)
    #innerHTML = driver.execute_script("return document.body.innerHTML")
    #print(innerHTML)
    print(startPoint)
    if(startPoint >=248):
    	#print("START DATA", startData)
    	startData = getDataStuff(startPoint, colorFileKeys, colorFile) #START POINT RUN POINT

    	startPoint = getNewestPosition(lastMessage, startData[1]) +1
    	print(startPoint)
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

