import React from 'react';
import Navigation from './Components/Navigation';
import ListOfColorChoices from './Components/ListOfColorChoices';
import imageofme from './pictureofme.png';
//import './Style.css';
import {Helmet} from "react-helmet";
import TwitchVideo from './Components/TwitchVideo';
import CookieMessage from './Components/CookieMessage';

import TwitchChat from './Components/TwitchChat';
import YoutubeChat from './Components/YoutubeChat';
import CustomColorPicker from './Components/CustomColorPicker';

import ShowMoreColors from './Components/ShowMoreColors';
import '@simonwep/pickr/dist/themes/nano.min.css';      // 'nano' theme

let defaultColors = { Red: "#FF0000", Orange: "#FFA500", Yellow: "#FFFF00", Green: "#00FF00", Blue: "#0000FF", Purple: "#3f50b5", Violet: "#EE82EE", White: "#FFFFFF", Black: "#000000" };
let allColors = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff","beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887","cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff","darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkgrey":"#a9a9a9","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f","darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkslategrey":"#2f4f4f","darkturquoise":"#00ced1","darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dimgrey":"#696969","dodgerblue":"#1e90ff","firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff","gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","goldenrod":"#daa520","gold":"#ffd700","gray":"#808080","green":"#008000","greenyellow":"#adff2f","grey":"#808080","honeydew":"#f0fff0","hotpink":"#ff69b4","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c","lavenderblush":"#fff0f5","lavender":"#e6e6fa","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2","lightgray":"#d3d3d3","lightgreen":"#90ee90","lightgrey":"#d3d3d3","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightslategrey":"#778899","lightsteelblue":"#b0c4de","lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6","magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370db","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee","mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5","navy":"#000080","oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6","palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#db7093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080","rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1","saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","slategrey":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4","tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0","violet":"#ee82ee","wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5","yellow":"#ffff00","yellowgreen":"#9acd32"};
let TwitchChannelName = "worldmerge";
let TwitchLiveStreamLink = 'https://bit.ly/worldmergetwitch'; 

let YoutubeLiveStreamCode = "_M-S6292Gd8";
let YoutubeLiveStreamLink = 'https://www.youtube.com/watch?v=' + YoutubeLiveStreamCode; 

let TiltifyUsernameCampaign = "@worldmerge/controlmylights"
let TiltifyDonateLink = "https://bit.ly/controlmylightsdonate";
function App() {

   
  return (
    <div className="App">
      <Helmet>

        <title> Control My Lights</title>
        <meta charset="utf-8" />
        <meta name="description" content="Todos!" />
          <meta name="theme-color" content="#008f68" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <Navigation id="TitleNavbar" SiteTitle="Control My Lights"
      Link1Point="#LiveControl" Link1Text="Live Control" 
      Link2Point="#LiveChat" Link2Text="Live Chat"
      Link3Point="#AboutProject" Link3Text="About Project"
      Link4Point="#AboutCreator" Link4Text="About Project Creator" />
                  <a className="btn btn-warning  d-flex justify-content-center"  href={TiltifyDonateLink} target="_blank" rel="noopener noreferrer"> Donate to this projects fundraising campaign for Feeding America </a>

            <CookieMessage />
            <CustomColorPicker /> 
            <div  className="container-fluid ">

              {/* TOP DIV - Color Buttons */}
              <div id="LiveControl" class="pb-10 h-100"href="#LiveControl" style={{minheight:"100%", height: "100vh",   background:'black !important'}} >
                <div className="mt-4 row " style={{minheight:"100%", height: "75vh",   background:'black !important'}}>
                  <div className="col">
                    <div className="d-flex justify-content-center  h-100">
                      <TwitchVideo ChannelName={TwitchChannelName} SiteSource={window.location.hostname} Autoplay={true} Title="Main Twitch video banner" Muted={false}></TwitchVideo>
                    </div>
                  </div>
                </div>
                <div className="row pt-4 h-100"  >
                  <h1 style={{color: "white"}} id="timeout" className="d-flex justify-content-center"></h1>
                  <ListOfColorChoices colors="default" object={defaultColors} />
                </div>
                <ShowMoreColors allColors={allColors}></ShowMoreColors>
              </div>


              {/* MIDDLE DIV - CHAT CONTROL */}
              <div id="LiveChat" class="pb-10 h-100"href="#LiveChat" style={{minheight:"100%", height: "100vh",   background:'black !important'}} >
                <div className="mt-4 row " style={{minheight:"100%",    background:'black !important'}}>
                  <div className="col h-100">
                    <div class="list-group">
                      <div className="d-flex justify-content-center  h-100 list-group-item list-group-item-action">
                        <h1 className="colorTitles"><a  rel="noopener noreferrer" ariaCurrent="true" className="active" target="_blank" href={TwitchLiveStreamLink}> Twitch </a> </h1>                        
                      </div>
                    </div>
                  </div>
                  <div className="col h-100">
                    <div class="list-group">
                      <div className="d-flex justify-content-center  h-100 list-group-item list-group-item-action">
                        <h1 className="colorTitles">
                          <a  ariaCurrent="true" className="active" rel="noopener noreferrer" target="_blank" href={YoutubeLiveStreamLink}> 
                            YouTube 
                          </a> 
                        </h1>                      
                      </div>
                    </div>
                    <sub className="colorTitles"> Note: YouTube has blocked access to live stream chat embeds on mobile browsers. Please use a desktop browser to view YouTube chat.</sub> 
                  </div>
                </div>
                <div className="mt-4 row mb-5" style={{minheight:"100%", height: "50vh",   background:'black !important'}}>
                  <div className="col h-100">
                    <div className="d-flex justify-content-center  h-100">
                      <TwitchChat Title="Main Twitch video chat" ChannelName={TwitchChannelName} siteSource={window.location.hostname}></TwitchChat> 
                    </div>
                  </div>
                  <div className="col h-100 ">
                    <div className="d-flex justify-content-center  h-100">
                      <YoutubeChat Title="Main YouTube video chat" LiveStreamCode={YoutubeLiveStreamCode} siteSource={window.location.hostname}></YoutubeChat>
                    </div>
                  </div>
                </div>
                <div className="row pt-4 h-100"  >
                  <div className=" d-flex justify-content-center align-content-center"  >
                    <h1 className="colorTitles"> Chat commands: </h1>
                  </div>
                </div>
                <div className="row pt-4 h-100 w-100 "  >
                  <div className=" d-flex justify-content-center align-content-center"  >
                    <p className="colorTitles"> Type these commmands in the chat windows (you need to login to Youtube or Twitch to make it work, "!" must be in front of the color you want). <br></br> The chat also supports hex colors: #AABBCC</p>
                  </div>
                </div>
                <div className="row pt-5 h-100"  >
                  <div className="textItem">
                    <ListOfColorChoices colors="allText" object={allColors} />
                  </div>
                </div>
              </div>


            {/* ThIRD DIV - CHAT CONTROL */}
              <div id="AboutProject" class="pb-10 h-75"href="#AboutProject" style={{ height: "20vh", background:'black !important'}} >
                <div className="mt-4 row " style={{minheight:"100%",    background:'black !important'}}>
                  <div className="col h-75">
                    <div class="list-group">
                      <div className="d-flex justify-content-center  h-100 list-group-item ">
                        <h1 >
                            About this project:  
                        </h1>                      
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 row mb-5" style={{minheight:"100%",  background:'black !important'}}>
                  <div className="col-lg h-75">
                    <div className="d-flex justify-content-center  h-100">
                      <p className="colorTitles">
                      This project allows users to control the color of my custom LED tubes via Twitch chat, YouTube chat and a website. The website front-end was made using ReactJS in combination with Bootstrap v5 for responsive CSS, and uses an ExpressJS backend. A user's color choice on the website is sent over a SocketIO instance to an external listener component on my desktop made using NodeJS. Another external listener made in NodeJS uses Twitch’s API to get real time chat data, and a Python component using Selenium retrieves YouTube chat data. That data is sent internally via POST method, to an internal router that sends the data to an internal SocketIO room. An internal listener adds what colors a user chose and their interaction source to a MongoDB database, and another writes the hex color code chosen to an Arduino via serial. The Arduino is connected to a semi-custom perf board that connects to the LED tubes, and is designed to easily add more LEDs. I based the PWM based color control circuit on a Adafruit guide but sourced different mosfets so as to handle the 24v power supply I’m using.
                      </p>
                    </div>
                  </div>
                  <div className="col-lg h-75 ">
                        <ul id="githubinks" >
                          <li >  <a href="http://bit.ly/controlmylightsgithub" rel="noopener noreferrer" target="_blank"> <span style={{fontSize: "20px", color: "white"}}><i class="fab fa-github-square"></i>  Github for the Control My Lights repository</span></a> </li>
                        </ul>
                  </div>
                </div>
              </div>            
              
              {/* ThIRD DIV - CHAT CONTROL */}
              <div id="AboutCreator" class="pb-10 h-100" href="#AboutCreator" style={{minheight:"100%", height: "150vh",   background:'black !important'}} >
                <div className="mt-1 row " style={{minheight:"100%",    background:'black !important'}}>
                  <div className="col h-100">
                    <div class="list-group">
                      <div className="d-flex justify-content-center  h-100 list-group-item ">
                        <h1 >
                            The creator of this project:  
                        </h1>                      
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 row mb-5 h-100" style={{minheight:"100%", height: "150vh",  background:'black !important'}}>
                  <div className="col-lg h-100">
                      <p className="colorTitles">
                        I, Edward Deaver, am a recent graduate from Le Moyne College (2020) in Syracuse, New York where I recieved a B.A. in Computer Science.
                        I am interested in creating innovative expereinces that can change the world. 
                        I worked for the City of Syracuse Innovation team for almost two years completing my Bachelors capstone there creating a interactive installation explaining tech of smart cities using an Arduino, Raspberry Pi, LEDs and other technologies.

                        If you would like to work together please reach out: <br>
                        </br>
                      </p>
                      <ul id="githubinks" className="w-50"style={{fontSize: "30px", listStyle: "none", textDecoration: "none"}}>
                          <li >  <a href = "mailto: edwardcdeaveriv@gmail.com"target="_blank"rel="noopener noreferrer"> <span style={{color: "white"}}><i class="fas fa-envelope"></i>edwardcdeaveriv [at] gmail.com</span></a> </li>
                          <li >  <a href = "https://bit.ly/edwarddeaverlinkedin"target="_blank"rel="noopener noreferrer"> <span style={{color: "white"}}><i class="fab fa-linkedin"></i>Edward Deaver's Linkedin</span></a> </li>
                          <li >  <a href = "https://bit.ly/edwarddeaverme"target="_blank"rel="noopener noreferrer"> <span style={{color: "white"}}><i class="fas fa-id-badge"></i>Edward Deaver's Website</span></a> </li>
                          <li >  <a href = "https://bit.ly/edwarddeaverinstagram" target="_blank"rel="noopener noreferrer"> <span style={{color: "white"}}><i class="fab fa-instagram"></i>Edward Deaver's Instagram</span></a> </li>


                        </ul>
                  </div>
                  <div className="col-lg h-100 mb-5">
                      <img alt="Professional photo of Edward Deaver" className="h-50 w-50" src={imageofme} ></img>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col colorTitles">
                  <h1> Created by Edward Deaver, IV</h1> <br></br>
                  <h1>  Powered by <span style={{fontSize: "100%", color: "white"}}><i class="fab fa-node"></i></span> and Express.Js, front-end made with <span style={{fontSize: "100%", color: "white"}}><i class="fab fa-react"></i> </span>, hosted on Heroku</h1><br></br>
                  <h1> Icons from FontAwesome and <a  className=" colorTitles"href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a  className=" colorTitles" href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></h1> <br></br>

                    </div> 


                </div>
              </div>

              </div>

                      </div>




  );
}

export default App;
