
import React from 'react';


  class YoutubeChat extends React.Component {


    constructor(props) {
      super(props);
      this.state = {completeURL: "https://www.youtube.com/live_chat?is_popout=1&v="+props.LiveStreamCode+"&embed_domain="+props.siteSource};

    }

    dealWithMobileError(){
      var iframe = document.getElementById('chat-messages');
      console.log(iframe);
    

    }
    render() {
        return (
          <>
            <iframe id="youtubechat" onLoad={this.dealWithMobileError} title={this.props.Title} alt={this.props.Title} src={this.state.completeURL}  width="100%" height="100%" loading="eager" ></iframe>
          </>
        );
    }
  }

  export default YoutubeChat;
