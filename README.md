# TwitchChatLightControl
Using Twitch Chat to control my lights. This project is built around Middlware Messaging paradigm. 

## Distinct Parts of the application:

1. Heroku server (ExternalNodeJSSever)
2. Your, well mine, desktop (LocalNodeJSServer)
3. Your external data sources (youtube, X, Y, Z). 
4. The Arduino/ Hardware 

## Requirments

1. MongoDB 
2. NodeJS
3. All the package-lists for the NodeJS installs
   - ExternalNodeJSSever
       -  "express": "^4.17.1",
       -  "socket.io": "*",
       - "multer": "^1.4.2",
       - "cors": "2.8.5"
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
4. Enviroment Variables (LocalNodeJSServer)
    - You will need to create a .env file in your root with the following information:
        - BOT_USERNAME= YOUR BOT's TWITCH USERNAME
        - OAUTH_TOKEN= YOUR BOT's OATH TOKEN
        - CHANNEL_NAME= CHANNEL YOU WANT TO BE WATCHING CHAT ON
        - EXT_SERVER= URL OF THE EXTERNAL SERVER YOU ARE RUNNING
        - MONGO_DB= DATA BASE NAME OF MONGO DB
        - INTERNAL_SOCKETIOURL= IP OF INTERNAL SOCKET SERVER, I just use 127.0.0.1 (localhost). 
5. Hardware:
   - Arduino Uno
   - 24v RGB analogue LED
   - MEAN WELL LRS-350-24 350.4W 24V 14.6 Amp PSU (any 24v psu will work)
   - FQP30N06L N-Channel Mosfet
   - Perf board
   - USB Cord

## Networking and the dataflow


    
Node:
(Twitch Component) ----> HTTP POST REQ. (Expresss Node Component ----> MongoDB Write ----> Write to Arduino)


