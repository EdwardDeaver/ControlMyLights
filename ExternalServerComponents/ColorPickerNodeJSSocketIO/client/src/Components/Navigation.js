import React from 'react';

class Navigation extends React.Component {
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
  
  render() {
      return (
        <>
        <nav id={this.props.id} className="navbar navbar-expand-lg navbar-light bg-light text-center sticky-md-top">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <a className="navbar-brand mx-auto" href={this.props.Link1Point}><h1>{this.props.SiteTitle}</h1></a>

    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <ul className="mr-auto navbar-nav mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href={this.props.Link1Point}><h3>{this.props.Link1Text}</h3></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href={this.props.Link2Point}><h3>{this.props.Link2Text}</h3></a>
        </li>
      </ul>

      <ul className="ml-auto navbar-nav mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href={this.props.Link3Point}><h3>{this.props.Link3Text}</h3></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href={this.props.Link4Point}><h3>{this.props.Link4Text}</h3></a>
        </li>
      </ul>

    </div>

  </div>
</nav>


   </>
      );
    }
  }

  export default Navigation;
