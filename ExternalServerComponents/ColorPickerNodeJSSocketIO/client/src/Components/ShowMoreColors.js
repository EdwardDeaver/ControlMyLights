import React from 'react';
import ListOfColorChoices from './ListOfColorChoices';

class ShowMoreColors extends React.Component {
    state = {
      name: "",
      showResults: false,
      buttonValue: "Show More Colors"

    };
  
    handleChange = e => {
      this.setState({
        name: e.target.value,
        showResults: false,
        colors: this.props.allColors,
        buttonValue: "Show More Colors"
      });
    };
  
    onClick = e => {
      
      this.setState({
        showResults: !this.state.showResults,
        buttonValue: "Hide More Colors"
      });
      if(this.state.buttonValue === "Show More Colors"){
        this.setState({
            buttonValue: "Hide More Colors"
          });
      }
      else{
        this.setState({
            buttonValue: "Show More Colors"
          });
      }
    };
    
    render() {
      return (
          <>
           <div className="row pt-4 h-100 w-100 "  >
        <div className="d-flex justify-content-center  h-100">

          <button className="btn btn-primary" type="button" onClick={this.onClick}>{this.state.buttonValue}</button>
          </div>
          </div>
          <div className="row pt-4 h-100 w-100 "  >

                                <div className="d-flex justify-content-center  h-100">

          <div className="showName"
            style={{ display: this.state.showResults ? "block" : "none" }}
          >
            <ListOfColorChoices colors="all" object={this.props.allColors} />

          </div>
          </div>
          </div>
          </>

      );
    }
  }
  


  export default ShowMoreColors;
