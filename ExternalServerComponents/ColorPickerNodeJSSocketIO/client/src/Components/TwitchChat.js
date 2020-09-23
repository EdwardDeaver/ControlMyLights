import React from 'react';


  class TwitchChat extends React.Component {


    constructor(props) {
      super(props);
      this.state = {completeURL: "https://www.twitch.tv/embed/"+props.ChannelName+"/chat?parent="+props.siteSource};
    }
    componentDidMount(){

    }
    render() {
        return (
            <iframe title={this.props.Title} alt={this.props.Title} src={this.state.completeURL} width="100%" height="100%" loading="lazy" sandbox></iframe>
      );
    }
  }

  export default TwitchChat;
