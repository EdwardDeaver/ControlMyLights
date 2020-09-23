import React from 'react';


  class TwitchVideo extends React.Component {


    constructor(props) {
      super(props);
      let autoplay = "";
      console.log(props.Autoplay + "props.Autoplay");
      if(props.Autoplay === true){
        autoplay="true";
      }
      else{
        autoplay = "false";
      }
      this.state = {CompleteURL: "https://player.twitch.tv/?channel="+props.ChannelName+"&parent="+props.SiteSource +"&autoplay="+props.Autoplay +"&muted="+this.props.Muted, Autoplay: autoplay, Title: props.Title};

    
    }
    componentDidMount(){

    }
    render() {
        return (
          <>

            <iframe title={this.state.Title} src={this.state.CompleteURL} frameBorder="0" allowFullScreen={true} scrolling="no" width="100%" height="100%" loading="lazy" sandbox></iframe>
            </>
      );
    }
  }

  export default TwitchVideo;
