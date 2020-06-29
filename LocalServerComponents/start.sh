echo "//////////////////////////////////////////////"
echo "//     Control My Lights.                   //"
echo "//     Created by:Edward Deaver, IV.        //"
echo "//     Date; 2020			                  //"
echo "//     Tech stack: NodeJS                   //"
echo "//     Tech stack: MongoDB                  //"
echo "//////////////////////////////////////////////"


node ExpressServer.js &
node MongoDBSocketIOListener/MongoDBSocketIOListener.js & 
node TwitchComponent/TwitchComponent.js &
node SocketIOWebsiteComponent/SocketIOWebsiteComponent.js &
python3 YoutubeChatComponent/youtubeComponent.py &
