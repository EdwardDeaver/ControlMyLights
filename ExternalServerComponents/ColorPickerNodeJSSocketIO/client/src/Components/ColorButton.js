import React from 'react';

class ColorButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.divStyle = {borderColor:props.Hex, borderWidth: '5px'};
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      event.preventDefault();
    }
    
    // So this gets my button's data once it's clicked, it's ran on click and the event or object data is sent to it. So then from here we could POST the data and disable the button for a bit.
    saveAndContinue = (e) => {
        e.preventDefault();
        //console.log(e.target);
        //console.log(e.target.value); //will give you the value continue

        var formdata = new FormData();
        formdata.append("colorHex", e.target.value);
        formdata.append("hex", false);

        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };

        fetch("/colorsubmit", requestOptions)
          .then(response => response.text())
          .catch(error => console.log('error', error));
                /*
                var formdata = new FormData();
                formdata.append("colorHex", e.target.value);
                this.postData('/colorsubmit', formdata).then(data => {console.log(data.ok);});
                */


               function startTimer(duration) {
                let divs = document.getElementsByClassName( 'colorButton' );

                [].slice.call( divs ).forEach(function ( div ) {
                  div.disabled = true;
                });
                var timer = duration, minutes, seconds;
                let display = document.getElementById('timeout');
                let customTimeout = document.getElementById("submitCustomColor");
                customTimeout.disabled = true;
                let intervalTimer = setInterval(function () {
                    minutes = parseInt(timer / 60, 10)
                    seconds = parseInt(timer % 60, 10);
            
                    minutes = minutes < 10 ? "0" + minutes : minutes;
                    seconds = seconds < 10 ? "0" + seconds : seconds;
            
                    display.textContent =  "Choose another color in: " + seconds;
            
                    if (--timer < 0) {
                        timer = duration;
                        [].slice.call( divs ).forEach(function ( div ) {
                          div.disabled = false;
                          display.innerHTML = "";

                      });
                      customTimeout.disabled = false;

                      clearInterval(intervalTimer);

                    }
                }, 1000);
            }
            startTimer(5);
            /*
                  // Disabled all the buttons
                  let divs = document.getElementsByClassName( 'colorButton' );
                  [].slice.call( divs ).forEach(function ( div ) {
                      div.disabled = true;
                      setTimeout(function() {
                        div.disabled = false;
                      }, 10000);
                  });

*/


            }
    render() {
      return (
              <button type="button" className="btn btn-dark colorButton" alt={this.props.Name} title={this.props.Name} id={this.props.Name} value={this.props.Hex} onClick={this.saveAndContinue} style={this.divStyle}>{this.props.Name}</button>
      );
    }
  }

  export default ColorButton;
