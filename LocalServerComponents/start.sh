echo "//////////////////////////////////////////////"
echo "//     Control My Lights.                   //"
echo "//     Created by:Edward Deaver, IV.        //"
echo "//     Date; 2020			          //"
echo "//     Tech stack: NodeJS                   //"
echo "//     Tech stack: MongoDB                  //"
echo "//////////////////////////////////////////////"


node ExpressServer.js & 
node TwitchComponent.js &
node SocketIOWebsiteComponent.js &
node MongoDBSocketIOListener.js &
