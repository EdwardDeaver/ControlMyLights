import React from 'react';
import ColorButton from './ColorButton';


  class ListOfColorChoices extends React.Component {
    // return JSON data from any file path (asynchronous)


    constructor(props) {
      super(props);
      this.state = {arrayOfColors: [], colorfromjson:[]};
      // load JSON data; then proceed
      if(props.colors === "default"){
        for ( const property in props.object) {
          //console.log("COMP MOUNTED");
          //console.log(`${property}: ${props.object[property]}`);
          this.state.arrayOfColors.push(<li className="nav-item px-2 pt-2" key={property}><ColorButton  Name={property} Hex={props.object[property]} /></li>);
        }
      }

    

    if(props.colors === "all"){
      for ( const property in props.object) {
        //console.log("COMP MOUNTED");
        //console.log(`${property}: ${props.object[property]}`);
        this.state.arrayOfColors.push(<li className="nav-item px-2 pt-2" key={property}><ColorButton  Name={property} Hex={props.object[property]} /></li>);
      }
    }

    if(props.colors === "allText"){
      for ( const property in props.object) {


        this.state.arrayOfColors.push(<li className=" px-2 pt-2 textItem mx-2 mt-2 mb-2" style={{color: "white", border: "5px solid "+ props.object[property], backgroundColor: "black"}}  alt={"!"+property} title={"!"+property} key={property}>{"!"+property}</li>);
      }
    }

  }
    componentDidMount(){

    }
    render() {
        return (
          <ul className="nav colorNav d-flex justify-content-center">
        
        {this.state.arrayOfColors}
      </ul>
      );
    }
  }

  export default ListOfColorChoices;
