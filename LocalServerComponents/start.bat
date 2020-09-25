@echo off
start "RoutingServer" node RedisQueue.js
start "SocketIOWebsite" node ExternalListeners\SocketIOWebsiteComponent\SocketIOWebsiteComponent.js
start "Twitch" node  ExternalListeners\TwitchComponent\TwitchComponent.js
start "Mongo" node InternalListeners\MongoDBListener\MongoDBListener.js
start "Youtube" python ExternalListeners\YoutubeChatComponent\youtubeComponent.py 
:: start "Arduino" set DEBUG=serialport/* & node InternalListeners\ArduinoListener\ArduinoInternal.js
start "Arduino" node InternalListeners\ArduinoListener\ArduinoInternal.js

start "WebSocketServer" node InternalListeners/WebSocketServer/WebSocketServer.js

