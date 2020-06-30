echo "//////////////////////////////////////////////"
echo "//     Control My Lights.                   //"
echo "//     Created by:Edward Deaver, IV.        //"
echo "//     Date; 2020			                  //"
echo "//     Tech stack: NodeJS                   //"
echo "//     Tech stack: MongoDB                  //"
echo "//////////////////////////////////////////////"


node ExpressServer.js &
node Components/TwitchComponent/TwitchComponent.js &
node Components/SocketIOWebsiteComponent/SocketIOWebsiteComponent.js &
node Listeners/MongoDBSocketIOListener/MongoDBSocketIOListener.js & 
python3 Components/YoutubeChatComponent/youtubeComponent.py &
node Listeners/ArduinoSocketIOListener/ArduinoSocketIOInternal.js &
