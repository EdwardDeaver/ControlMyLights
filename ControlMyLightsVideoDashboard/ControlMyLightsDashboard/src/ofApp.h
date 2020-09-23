#pragma once

#include "ofMain.h"
#include "ofApp.h"
#include "ofxGui.h"
#include "ofxLibwebsockets.h"
#include "ofxJSON.h"

using namespace std;

class ofApp : public ofBaseApp{

	public:
		// -- Default OpenFramework Functions 
		void setup();
		void update();
		void draw();
		void close();
		void mousePressed(int x, int y, int button);

		// ---- Draw effects
		void drawSquares(double xPos, double yPos, string color);
		bool tooLarge;
		int xPos;
		int yPos;
		string oldColor;
		string oldTime;
		string newColor;
		string newTime;
		int Red;
		int Green;
		int Blue;
		// ---- Cammera 
		ofVideoGrabber cam;
		ofVec2f  p1, p2, p3;
		ofImage myImage;
		ofPixels OldImagePixels;
		int camWidth;
		int camHeight;

		// ---- GUI
		string Source;
		ofxFloatSlider height;
		ofxFloatSlider width;
		ofxFloatSlider maxCircleSize;
		ofxFloatSlider CircleSpeed;
		ofxToggle IdleStateEngage;
		ofxPanel gui;
		ofTrueTypeFont myFont;

		// ---- Web Socket
		ofxLibwebsockets::Client client;
		ofxJSONElement result;

		// ---- websocket methods
		void onConnect(ofxLibwebsockets::Event& args);
		void onOpen(ofxLibwebsockets::Event& args);
		void onClose(ofxLibwebsockets::Event& args);
		void onIdle(ofxLibwebsockets::Event& args);
		void onMessage(ofxLibwebsockets::Event& args);
		void onBroadcast(ofxLibwebsockets::Event& args);

		// ------ Colors 
		map<string, string> images;
		ofxJSONElement ColorJSON;

		map<string, string> ColorDataMap;
		bool loadColorsJSON(string jsonData);


		string MessageToWrite;
};
