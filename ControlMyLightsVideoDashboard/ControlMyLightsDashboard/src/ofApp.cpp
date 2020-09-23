#include "ofApp.h"


//--------------------------------------------------------------
// Setup values
//--------------------------------------------------------------
void ofApp::setup(){
	ofSetLogLevel(OF_LOG_VERBOSE);
	// 1 - get default options
	ofxLibwebsockets::ClientOptions options = ofxLibwebsockets::defaultClientOptions();
	// 2 - set basic params
	options.host = "127.0.0.1";
	options.port = 9092;
	// 3 - connect
	client.connect(options);
	client.addListener(this);

	// Base rectangle start positions
	xPos = 5;  // horizontal start position
	xPos = 5;  // verticle start position
	// Starting values for time/color message values
	oldTime = "0000000000";  // Old time start
	oldColor = "FFFFFF";	// old color start
	newColor = "FFAAFF";	// New color 
	newTime = "0000000001"; // new time
	// If the boxes are too large this will trigger. If false keep drawing rectangles, if true don't. 
	tooLarge = true;
	// Preset for 720p image capture size
	camWidth = 1280;  // X resolution
	camHeight = 720;  // Y resolution

	// ------ CAMERA SETUP
	// get back a list of devices.
	vector<ofVideoDevice> devices = cam.listDevices();
	for (size_t i = 0; i < devices.size(); i++) {
		if (devices[i].bAvailable) {
			//log the device
			ofLogNotice() << devices[i].id << ": " << devices[i].deviceName;
		}
		else {
			//log the device and note it as unavailable
			ofLogNotice() << devices[i].id << ": " << devices[i].deviceName << " - unavailable ";
		}
	}
	// Device in that list 
	cam.setDeviceID(0);
	// Set the framerate you want. 
	cam.setDesiredFrameRate(10);
	// Initialize the grabber
	cam.initGrabber(camWidth, camHeight);
	// ---- Seting up the GUI 
	gui.setup();
	gui.add(height.setup("height", (camHeight)/2 +115, ofGetHeight() *-1, ofGetHeight()*2));
	gui.add(width.setup("width", (camWidth)/2 + 215, ofGetWidth()*-1, ofGetWidth() * 2));
	gui.add(maxCircleSize.setup("maxCircleSize", ofGetWidth() / 2, ofGetWidth() * -1, ofGetWidth() * 2));
	gui.add(CircleSpeed.setup("CircleSpeed", 100, 1, 500));
	gui.add(IdleStateEngage.setup("IdleStateEngage",true, 100, 10));

	// ---- Load Cornerstone font for the message 
	myFont.load("Cornerstone.ttf", 30);

	// ---- Set max framerate to 30 to reduce CPU load. 
	ofSetFrameRate(30);

	// ---- Set background of app to black
	ofBackground(ofColor::black);  // black background

	// ------ Colors 
	const std::string rawJson = R"({"aliceblue":"f0f8ff","antiquewhite":"faebd7","aqua":"00ffff","aquamarine":"7fffd4","azure":"f0ffff","beige":"f5f5dc","bisque":"ffe4c4","black":"000000","blanchedalmond":"ffebcd","blue":"0000ff","blueviolet":"8a2be2","brown":"a52a2a","burlywood":"deb887","cadetblue":"5f9ea0","chartreuse":"7fff00","chocolate":"d2691e","coral":"ff7f50","cornflowerblue":"6495ed","cornsilk":"fff8dc","crimson":"dc143c","cyan":"00ffff","darkblue":"00008b","darkcyan":"008b8b","darkgoldenrod":"b8860b","darkgray":"a9a9a9","darkgreen":"006400","darkgrey":"a9a9a9","darkkhaki":"bdb76b","darkmagenta":"8b008b","darkolivegreen":"556b2f","darkorange":"ff8c00","darkorchid":"9932cc","darkred":"8b0000","darksalmon":"e9967a","darkseagreen":"8fbc8f","darkslateblue":"483d8b","darkslategray":"2f4f4f","darkslategrey":"2f4f4f","darkturquoise":"00ced1","darkviolet":"9400d3","deeppink":"ff1493","deepskyblue":"00bfff","dimgray":"696969","dimgrey":"696969","dodgerblue":"1e90ff","firebrick":"b22222","floralwhite":"fffaf0","forestgreen":"228b22","fuchsia":"ff00ff","gainsboro":"dcdcdc","ghostwhite":"f8f8ff","goldenrod":"daa520","gold":"ffd700","gray":"808080","green":"008000","greenyellow":"adff2f","grey":"808080","honeydew":"f0fff0","hotpink":"ff69b4","indigo":"4b0082","ivory":"fffff0","khaki":"f0e68c","lavenderblush":"fff0f5","lavender":"e6e6fa","lawngreen":"7cfc00","lemonchiffon":"fffacd","lightblue":"add8e6","lightcoral":"f08080","lightcyan":"e0ffff","lightgoldenrodyellow":"fafad2","lightgray":"d3d3d3","lightgreen":"90ee90","lightgrey":"d3d3d3","lightpink":"ffb6c1","lightsalmon":"ffa07a","lightseagreen":"20b2aa","lightskyblue":"87cefa","lightslategray":"778899","lightslategrey":"778899","lightsteelblue":"b0c4de","lightyellow":"ffffe0","green":"00ff00","limegreen":"32cd32","linen":"faf0e6","magenta":"ff00ff","maroon":"800000","mediumaquamarine":"66cdaa","mediumblue":"0000cd","mediumorchid":"ba55d3","mediumpurple":"9370db","mediumseagreen":"3cb371","mediumslateblue":"7b68ee","mediumspringgreen":"00fa9a","mediumturquoise":"48d1cc","mediumvioletred":"c71585","midnightblue":"191970","mintcream":"f5fffa","mistyrose":"ffe4e1","moccasin":"ffe4b5","navy":"000080","oldlace":"fdf5e6","olive":"808000","olivedrab":"6b8e23","orange":"ffa500","orangered":"ff4500","orchid":"da70d6","palegoldenrod":"eee8aa","palegreen":"98fb98","paleturquoise":"afeeee","palevioletred":"db7093","papayawhip":"ffefd5","peachpuff":"ffdab9","peru":"cd853f","pink":"ffc0cb","plum":"dda0dd","powderblue":"b0e0e6","purple":"800080","rebeccapurple":"663399","red":"ff0000","rosybrown":"bc8f8f","royalblue":"4169e1","saddlebrown":"8b4513","salmon":"fa8072","sandybrown":"f4a460","seagreen":"2e8b57","seashell":"fff5ee","sienna":"a0522d","silver":"c0c0c0","skyblue":"87ceeb","slateblue":"6a5acd","slategray":"708090","slategrey":"708090","snow":"fffafa","springgreen":"00ff7f","steelblue":"4682b4","tan":"d2b48c","teal":"008080","thistle":"d8bfd8","tomato":"ff6347","turquoise":"40e0d0","violet":"ee82ee","wheat":"f5deb3","white":"ffffff","whitesmoke":"f5f5f5","yellow":"ffff00","yellowgreen":"9acd32"})";

	//ColorJSON.getMemberNames();
	
	loadColorsJSON(rawJson);

}

//--------------------------------------------------------------
void ofApp::update(){

	// When websocket gets message 
// set var newDate = date time
// set var newColor = color hex
// 
// In draw
// If oldDate var is equal to new var draw rectngless
// Set oldColor to be newColor and oldDate to newDate

	// Check if the idle state is set. If so, this will make sure the camera is only updated when a message is recieved. 
	if (IdleStateEngage == true) {
		if (oldTime != newTime && tooLarge == false) {
			// Camera update
			cam.update();

			// Update the x and y size of the rectangles
			xPos += ofGetLastFrameTime() * CircleSpeed;
			yPos += ofGetLastFrameTime() * CircleSpeed;
			// If the sizes are too large  reset the toolarge boolean and the x and y size. 
			if (xPos > maxCircleSize) {
				tooLarge = true;
				xPos = 0;
				yPos = 0;
			}
			else {
				tooLarge = false;

			}
		}
	}
	// If the button isn't triggered update camera every frame. Works pretty much the same way as above. 
	else {
		cam.update();
		if (oldTime != newTime && tooLarge == false) {
			xPos += ofGetLastFrameTime() * CircleSpeed;
			yPos += ofGetLastFrameTime() * CircleSpeed;
			if (xPos > maxCircleSize) {
				tooLarge = true;
				xPos = 0;
				yPos = 0;
			}
			else {
				tooLarge = false;

			}
		}
	}
	if (xPos > ofGetWidth()) {  // if horizontal position is off the screen (width)
		xPos = 5;             // reset horizontal position
	}
}
//--------------------------------------------------------------
// Draw to the screen
//--------------------------------------------------------------
void ofApp::draw(){
	
	// Draw gui to screen
	gui.draw();
	// Push following elements to open Gl Matrix
	glPushMatrix();
		// Push the following elements to -200 z value
		glTranslatef(0, 0, -200);  // translate back in z by 200  
		// Draw cam
		cam.draw(gui.getWidth(), gui.getHeight());
	// Pop previus values from GL matrix
	glPopMatrix();
	// Push the following styles to the internal stack
	ofPushStyle();
		// draw the squares
		drawSquares(xPos, yPos, newColor);
	// Remove the previus values from the style stack
	ofPopStyle();
}
//--------------------------------------------------------------
// On close disengage the camera 
//--------------------------------------------------------------
void ofApp::close() {
	cam.close();
}
//--------------------------------------------------------------
// When the socket connects print this in the debug window
//--------------------------------------------------------------
void ofApp::onConnect(ofxLibwebsockets::Event& args) {
	cout << "on connected" << endl;
}
//--------------------------------------------------------------
// When the socket opens
//--------------------------------------------------------------
void ofApp::onOpen(ofxLibwebsockets::Event& args) {
	cout << "on open" << endl;
}
//--------------------------------------------------------------
// When the socket closes
//--------------------------------------------------------------
void ofApp::onClose(ofxLibwebsockets::Event& args) {
	cout << "on close" << endl;
}
//--------------------------------------------------------------
// When the socket state is idle
//--------------------------------------------------------------
void ofApp::onIdle(ofxLibwebsockets::Event& args) {
	cout << "on idle" << endl;
}
//--------------------------------------------------------------
// When the socket recieves a message
//--------------------------------------------------------------
void ofApp::onMessage(ofxLibwebsockets::Event& args) {
	cout << "got message " << args.message << endl;
	// Parses the recieved message to JSON
	result.parse(args.message);
	// The message recieved should be 9 values long
	if (result.size() == 9) {
		//cout << "JSONRESULT" << result["color"] << endl;
		// Set toolarge to be false so the squares will grow
		tooLarge = false;
		newTime = result["dateTime"].asString();
		xPos = 0;
		yPos = 0;


		// Get all of the important values from the string
		auto tempColor = result["color"];
		newColor = tempColor.asString();
		// Make sure hex is message is in lowercase
		std::for_each(newColor.begin(), newColor.end(), [](char& c) {
			c = ::tolower(c);
		});
		
		if (result["hex"].asBool() == false) {
			cout << ColorDataMap.find(newColor)->second << endl;
			string JSONCOLOR = ColorDataMap.find(newColor)->second;
			MessageToWrite = "Color " + JSONCOLOR + " from " + result["source"].asString();
		}
		else{
			MessageToWrite = "Color #" + tempColor.asString() + " from " + result["source"].asString();

		}
		// If hex true 
		//    // add # to color value 
		// if hex false
		//    get colorw word  value from ColorDataMap and set that to newColor





		cout << newColor << endl;
		Red = result["red"].asInt();
		Green = result["green"].asInt();
		Blue = result["blue"].asInt();
		Source = result["source"].asString();
	}

	
}
//--------------------------------------------------------------
// 
//--------------------------------------------------------------
void ofApp::onBroadcast(ofxLibwebsockets::Event& args) {
	cout << "got broadcast " << args.message << endl;
}
//--------------------------------------------------------------
// Use this for testing of onMessage 
//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){
	for (map<string, string>::iterator it = ColorDataMap.begin(); it != ColorDataMap.end(); ++it) {
		// it->first contains the key
		cout << " this is the key " << it->first << endl;
		cout << " this is the value " << it->second << endl;

	}
	tooLarge =false;
	newTime = to_string(rand()*100);
	xPos = 0;
	yPos = 0;
	newColor = "Aqua";
	Red = rand() % 255;
	Green = rand() % 255;
	Blue = rand() % 255;
	Source = "Website";
	ofLog(newTime);

	for (map<string, string>::iterator it = ColorDataMap.begin(); it != ColorDataMap.end(); ++it) {
		// it->first contains the key
		cout << " this is the key " << it->first << endl;
		cout << " this is the key " << it->second<< endl;

		// it->second contains the value
	}
	
}

//--------------------------------------------------------------
// Draw the rotated squares to the screen and the message of where data was from
// xPos / yPos are global values from the rectangles
// color is a string from the socket message
//-------------------------------------------------------------- 
void ofApp::drawSquares(double xPos, double yPos, string color) {
	// Convert color to hexdecimal 
	int num = std::stoi(newColor, 0, 16);
	//If the xPos is 0 set the color to transparent. Done to fix bug of rectangles still showing up.
	if (xPos == 0) {
		ofSetColor(0, 0, 0,0);
	}
	else{
		// Make sure we rotate and move around the center of the rectangle. 
		ofSetRectMode(OF_RECTMODE_CENTER);
		// Push to the Matrix. 
		ofPushMatrix();
			// move the matrix 0,0 to be 1280,720 
			ofTranslate(width, height);
			// In our new matrix, push to the style stack
			ofPushStyle();
				// Set the following from our red, green, blue global values set from the message.
				ofSetColor(Red, Green, Blue);
				// Template for string value
				string myColorStringMessage = "Color " + color + " from " + Source;
				//cout << "(xPos/500) / ((int)myFont.stringWidth(myColorStringMessage)%100) CHARACTERS " << ((xPos / (int)myFont.stringWidth(myColorStringMessage)) )*1.1;
				
				// Matrix inside matrix to ensure our scale property does not affect our rectangles.
				ofPushMatrix();
					//ofScale(((xPos/500) / ((int)myFont.stringWidth(myColorStringMessage)%100))*50, ((xPos / 500) / ((int)myFont.stringWidth(myColorStringMessage) % 100)) * 50, 1);
					// Because we can't set a new font size for our font we have to scale it up. Because we don't know what size our string will be it must vary in size based on the size of the string. 
					ofScale((xPos / (int)myFont.stringWidth(myColorStringMessage) )*1.1 , (xPos / (int)myFont.stringWidth(myColorStringMessage))*1.1, 1);
					myFont.drawString(MessageToWrite, -1*(int)myFont.stringWidth(myColorStringMessage)/2, height/2 - 200);
				ofPopMatrix();
			// rotate our matrix 45 degrees so our rectangles look like diamonds. 
			ofRotateZDeg(45);
			// Set line width of rectangles. 
			ofSetLineWidth(10);
			// Make sure rectangles are just an outline by removing their fill. 
			ofNoFill();
			ofDrawRectangle(0, 0, xPos, yPos);
			ofDrawRectangle(0, 0, xPos+100, yPos + 100);
			ofDrawRectangle(0, 0, xPos + 200, yPos + 200);
			ofPopStyle();
		ofPopMatrix();
	}
}

/// <summary>
/// Loads the json string into the ColorDataMap variable
/// </summary>
/// <param name="jsonData"> Colors and their hex values</param>
/// <returns> Boolean </returns>
bool ofApp::loadColorsJSON(string jsonData) {
	ColorJSON.parse(jsonData);

	cout << "HELLO";
	for (auto it = ColorJSON.begin(); it != ColorJSON.end(); ++it)
	{
		cout << it.key().asString() << "\n";
		cout << ColorJSON[it.key().asString()].asString() << endl;
		string hexValue = ColorJSON[it.key().asString()].asString();
		ColorDataMap.insert({ hexValue, it.key().asString()});
		cout << hexValue << endl;

	}
	//cout << ColorJSON.getMemberNames() << endl;
	cout << ColorJSON["aliceblue"].asString() << endl;

	return true;
}
/////////////////////////////////

// Load colors.json 
// Create color map variable
// Loop through colors.json 
// Set key value to colors.json value, and key from colors.json as value  
// then you can do hex based lookups to get color names. 

/////////////////////////////////////