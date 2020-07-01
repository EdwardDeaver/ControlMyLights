@echo off
start "RoutingServer" node ExpressServer.js
start "SocketIOWebsite" node Components\SocketIOWebsiteComponent\SocketIOWebsiteComponent.js
start "Twitch" node  Components\TwitchComponent\TwitchComponent.js
start "Mongo" node Listeners\MongoDBSocketIOListener\MongoDBSocketIOListener.js
start "Youtube" python Components\YoutubeChatComponent\youtubeComponent.py 
start "Arduino" node Listeners\ArduinoSocketIOListener\ArduinoSocketIOInternal.js
