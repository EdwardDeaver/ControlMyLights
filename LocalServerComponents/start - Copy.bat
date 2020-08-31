@echo off
start "RoutingServer" node ExpressServer.js
start "SocketIOWebsite" node ExternalListeners\SocketIOWebsiteComponent\SocketIOWebsiteComponent.js
start "Twitch" node  ExternalListeners\TwitchComponent\TwitchComponent.js
start "Mongo" node InternalListeners\MongoDBSocketIOListener\MongoDBSocketIOListener.js
start "Youtube" python ExternalListeners\YoutubeChatComponent\youtubeComponent.py 
:: start "Arduino" set DEBUG=serialport/* & node InternalListeners\ArduinoSocketIOListener\ArduinoSocketIOInternal.js
start "Arduino" node InternalListeners\ArduinoSocketIOListener\ArduinoSocketIOInternal.js

