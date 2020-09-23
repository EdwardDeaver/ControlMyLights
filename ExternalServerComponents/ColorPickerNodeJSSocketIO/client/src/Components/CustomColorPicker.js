import React from 'react';
import '@simonwep/pickr/dist/themes/nano.min.css';      // 'nano' theme

// Modern or es5 bundle (pay attention to the note below!)
import Pickr from '@simonwep/pickr/dist/pickr.es5.min';


class CustomColorPicker extends React.Component {
constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }
 
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    
  }
  async postData(url = '', data = {}) {
    // Default options are marked with *
    try{
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: data // body data type must match "Content-Type" header
      });
      return response;
    }
    catch(error){
      return error;
    }
    }
  componentDidMount(){

    const pickr = Pickr.create({
        el: '.pickr-container-button',
        theme: 'nano', // or 'monolith', or 'nano'
        position: 'top-middle',
        useAsButton: true,

        swatches: [
            'red',
            'orange',
            'yellow',
            'green',
            'blue',
            'indigo',
            'violet'
    
        ],
    
        components: {
    
            // Main components
            preview: true,
            opacity: false,
            hue: true,
    
            // Input / output Options
            interaction: {
                hex: false,
                rgba: true,
                hsla: false,
                hsva: false,
                cmyk: false,
                input: false,
                clear: false,
                save: true
            }
        }
    });
    document.getElementsByClassName("pcr-save")[0].value = "SEND TO LIGHTS";
    pickr.on('init', instance => {

        console.log('init', instance);



    }).on('hide', instance => {
        console.log('hide', instance);
    }).on('show', (color, instance) => {
        console.log('show', color, instance);
    }).on('save', (color, instance) => {
        pickr.hide();
        var formdata = new FormData();
        formdata.append("colorHex", color.toHEXA().toString());
        formdata.append("hex", true);
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };

        fetch("/colorsubmit", requestOptions)
          .then(response => response.text())
          .catch(error => console.log('error', error));
          

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
    });
    }
    
  render() {
      return (
    <button alt="Pick a custom color" title="Pick a custom color" id="submitCustomColor" className="pickr-container-button  btn  btn-lg pcr-button" > </button>
       
    
      );
    }
  }

  export default CustomColorPicker;
