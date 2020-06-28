# TwitchChatLightControl
Using Twitch Chat to control my lights. This project is built around Message Oriented Middleware model. 

## Purpose:


## Running this:
You absolutly should be running this in a virtual machine. The local server should also run a VPN. 
## Distinct Parts of the application:

1. Heroku server (ExternalNodeJSSever)
2. Your, well mine, desktop (LocalNodeJSServer)
3. Your external data sources (youtube, X, Y, Z). 
4. The Arduino/ Hardware 
5. Youtube Component 

## Requirments

1. MongoDB 
2. NodeJS
3. All the package-lists for the NodeJS installs
   - ExternalNodeJSSever
       -  "express": "^4.17.1",
       -  "socket.io": "*",
       - "multer": "^1.4.2",
       - "cors": "2.8.5",
       - "dotenv": "*",
       - "md5": "*"
    - LocalNodeJSServer
       - "body-parser": "^1.19.0",
       - "concurrently": "^5.2.0",
       - "dotenv": "^8.2.0",
       - "express": "^4.17.1",
       - "follow-redirects": "^1.11.0",
       - "mongodb": "^3.5.5",
       - "serialport": "^9.0.0",
       - "socket.io": "^2.3.0",
       - "socket.io-client": "^2.3.0",
       - "tmi.js": "^1.5.0",
       - "unirest": "^0.6.0"
4. Enviroment Variables (EXTERNALNodeJSServer)
    - You will need to create a .env file in your root with the following information:
        - secretKey = This is for the JWT token authentication. 
        - SOCKETIOTOKEN = API TOKEN THAT'S CHECKED WHEN YOU CONNECT TO THE EXTERNAL SERVER.

 
5. Enviroment Variables (LocalNodeJSServer)
    - You will need to create a .env file in your root with the following information:
        - BOT_USERNAME= YOUR BOT's TWITCH USERNAME
        - OAUTH_TOKEN= YOUR BOT's OATH TOKEN
        - CHANNEL_NAME= CHANNEL YOU WANT TO BE WATCHING CHAT ON
        - EXT_SERVER= URL OF THE EXTERNAL SERVER YOU ARE RUNNING
        - MONGO_DB= DATA BASE NAME OF MONGO DB
        - INTERNAL_SOCKETIOURL= IP OF INTERNAL SOCKET SERVER, I just use 127.0.0.1 (localhost). 
        - SOCKETIOTOKEN = API TOKEN THAT'S CHECKED WHEN YOU CONNECT TO THE EXTERNAL SERVER.
6. Hardware:
   - Arduino Uno
   - 24v RGB analogue LED
   - MEAN WELL LRS-350-24 350.4W 24V 14.6 Amp PSU (any 24v psu will work)
   - FQP30N06L N-Channel Mosfet
   - Perf board
   - USB Cord

## Networking and the dataflow

(TWITCH SITE  <--SOCKET--> TwitchComponent.  / Website --SOCKETIO(colordata)--> SocketIOListening ) --POST REQ(/sendcolordata)---> ExpressServer ----SOCKETIO (colorData) ---> ( MongoDBListener --WRITE--> MONGODB.  / ArduinoListener --WRITE--> Arduino)

<img src="https://raw.githubusercontent.com/EdwardDeaver/TwitchChatLightControl/master/Diagrams/Network%20Graph.png?token=AB2WYEJ2P3CK6GVK2A7KRU267OBIG" width="100%" height="75%">

### External NodeJS Site:
Uses CORS and referer checks to block requests not from same origin. 
1. POST ( /colorsubmit)
    - Site recieves a 6 digit hex value
2. SOCKETIO (/colordata)
    - Emits hex color data. 
    - TODO secure using JWT
        - Using the JWT will whitelist the localNodeJS server. This is useful if you are using a shared host platform with limited bandwidth or costs with overages. 

### Local NodeJS Server:

1. POST ( /sendcolordata)
   - source: String - source of the data (ex. Twitch, website)
   - username: String - username of person who sent the message
   - validColor: Boolean  - Was it a valid color or not
   - hex: Boolean  - was it a hex color
   - color: String - hex color data
   - red:  Int - Red value of color
   - green: Int - Green value of color
   - blue: Blue value of color

2. SocketIO (/internalcolordata)
   - source: String - source of the data (ex. Twitch, website)
   - username: String - username of person who sent the message
   - validColor: Boolean  - Was it a valid color or not
   - hex: Boolean  - was it a hex color
   - color: String - hex color data
   - red:  Int - Red value of color
   - green: Int - Green value of color
   - blue: Blue value of color
   - date: DateTime value (GMT)


### Twitch Component (NODE JS):
This component connect to your twitch channels

1. Pip requirements. 
   - Requirements:
      - time
      - selenium
      - webdriver_manager
      - json
      - re
      - requests
      - urllib
      - pathlib
      
      
### Youtube Component (PYTHON):
This is a web scrapping component that uses Selenium to obtain youtube comments. Note this could break at any time. 
This will send the it's data to ExpressServer. 

1. Pip requirements. 
   - Requirements:
      - time
      - selenium
      - webdriver_manager
      - json
      - re
      - requests
      - urllib
      - pathlib

## External NodeJS Server:
In order to do analytics after the fact I needed to collect a minimum amount of user data. In this case I wanted to know if it is one person making a lot of actions or a few users. So initially I was going to send IP address that were from the POST request but due to unease about the direct tracking of users and being unsure if I could keep the data private over SocketIO I made a MD5 Hash of the IP Addresses. This way I can still see individual user activity without any identifying information. 
Initially I tried to pass the IP address through an AES symmetric crypto but due to speed issues I abandoned this idea (the functions were too slow for the post request thread and wouldn't resolve in time).


1. POST ( /colorsubmit)(CORS protected)
   - colorHex: String - 6 character hex string
   
2. SocketIO(/colordata)(Token protected)
   - "userHash": MD5 of IP ADDRESS,
   - "hexCode": 7 character hex string "#AABBCC" 


## Analytics 
### MongoDB datastore ( Any DB can be used, in place of MongoDB a listener just needs to be created)
#### Gets data from: SocketIO Local /colordata
This is used to determine endagment rates per user and endagement per platform, as well as what colors were chosen most often. 

Information stored:
   - source: String - source of the data (ex. Twitch, website)
   - username: String - username of person who sent the message
   - validColor: Boolean  - Was it a valid color or not
   - hex: Boolean  - was it a hex color
   - color: String - hex color data
   - red:  Int - Red value of color
   - green: Int - Green value of color
   - blue: Blue value of color
   - date: DateTime value (GMT)


       
   

   



   
   



   



   
   


