import React from 'react';


class CookieMessage extends React.Component {
constructor(props) {
super(props);
  }
 

  hideDiv() {
    document.getElementById("cookiesDiv").style.visibility = "hidden";

  }
  
    
  render() {
      return (
          <div id="cookiesDiv">

        <p> <b> This site uses cookies. </b>
        By using our site you agree to the sites use of cookies. The site functionality is dependent upon cookies. Blocking them will not allow color interactions.
        <button alt="Got It" title="Got it" id="cookiesDivGotIt" className="btn  btn-sm btn-warning" onClick={this.hideDiv}> Got it</button></p>


          </div>
       
    
      );
    }
  }

  export default CookieMessage;
