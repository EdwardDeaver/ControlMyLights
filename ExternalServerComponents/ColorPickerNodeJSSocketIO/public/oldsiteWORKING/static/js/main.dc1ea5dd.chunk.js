(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{14:function(e,t,a){e.exports=a(24)},20:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},24:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(9),o=a.n(l),c=a(2),i=a(3),s=a(6),m=a(5),u=a(4),v=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={value:""},n.handleChange=n.handleChange.bind(Object(s.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(s.a)(n)),n}return Object(i.a)(a,[{key:"handleChange",value:function(e){this.setState({value:e.target.value})}},{key:"handleSubmit",value:function(e){alert("A name was submitted: "+this.state.value),e.preventDefault()}},{key:"render",value:function(){return r.a.createElement("nav",{id:this.props.id,className:"navbar navbar-expand-lg navbar-light bg-light text-center sticky-md-top"},r.a.createElement("div",{className:"container-fluid"},r.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarTogglerDemo01","aria-controls":"navbarTogglerDemo01","aria-expanded":"false","aria-label":"Toggle navigation"},r.a.createElement("span",{className:"navbar-toggler-icon"})),r.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarTogglerDemo01"},r.a.createElement("ul",{className:"ml-auto mx-auto navbar-nav mb-2 mb-lg-0"},r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"nav-link active","aria-current":"page",href:this.props.Link1Point},this.props.Link1Text)),r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"nav-link",href:this.props.Link2Point},this.props.Link2Text))),r.a.createElement("a",{className:"navbar-brand",href:this.props.Link1Point},r.a.createElement("h1",null,this.props.SiteTitle)),r.a.createElement("ul",{className:" ml-auto mx-auto navbar-nav mb-2 mb-lg-0"},r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"nav-link active","aria-current":"page",href:this.props.Link3Point},this.props.Link3Text)),r.a.createElement("li",{className:"nav-item"},r.a.createElement("a",{className:"nav-link",href:this.props.Link4Point},this.props.Link4Text))))))}}]),a}(r.a.Component),h=a(8),d=a.n(h),p=a(10),b=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).saveAndContinue=function(e){e.preventDefault();var t=new FormData;t.append("colorHex","#FFAABB"),fetch("/colorsubmit",{method:"POST",body:t,redirect:"follow"}).then((function(e){return e.text()})).then((function(e){return console.log(e)})).catch((function(e){return console.log("error",e)}))},n.state={value:""},n.handleChange=n.handleChange.bind(Object(s.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(s.a)(n)),n.divStyle={borderColor:e.Hex,borderWidth:"5px"},n}return Object(i.a)(a,[{key:"handleChange",value:function(e){this.setState({value:e.target.value})}},{key:"handleSubmit",value:function(e){e.preventDefault()}},{key:"postData",value:function(){var e=Object(p.a)(d.a.mark((function e(){var t,a,n,r=arguments;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=r.length>0&&void 0!==r[0]?r[0]:"",a=r.length>1&&void 0!==r[1]?r[1]:{},e.prev=2,e.next=5,fetch(t,{method:"POST",body:a});case 5:return n=e.sent,e.abrupt("return",n);case 9:return e.prev=9,e.t0=e.catch(2),e.abrupt("return",e.t0);case 12:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement("button",{type:"button",className:"btn btn-dark",id:this.props.Name,value:this.props.Hex,onClick:this.saveAndContinue,style:this.divStyle},this.props.Name)}}]),a}(r.a.Component),f=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;if(Object(c.a)(this,a),(n=t.call(this,e)).state={arrayOfColors:[],colorfromjson:[]},"default"===e.colors)for(var l in e.object)n.state.arrayOfColors.push(r.a.createElement("li",{className:"nav-item px-2",key:l},r.a.createElement(b,{Name:l,Hex:e.object[l]})));return n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return r.a.createElement("ul",{class:"nav colorNav",id:""},this.state.arrayOfColors)}}]),a}(r.a.Component),E=(a(20),a(11)),g=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={completeURL:"https://player.twitch.tv/?channel="+e.ChannelName+"&parent="+e.siteSource},n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return r.a.createElement("iframe",{src:this.state.completeURL,frameborder:"0",allowfullscreen:"true",scrolling:"no",width:"100%",height:"100%"})}}]),a}(r.a.Component),k={Red:"#FF0000",Orange:"#FFA500",Yellow:"#FFFF00",Green:"#00FF00",Blue:"#0000FF",Purple:"#3f50b5",Violet:"#EE82EE"};var N=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(E.a,null,r.a.createElement("title",null," TEST OF HELMET "),r.a.createElement("meta",{charset:"utf-8"}),r.a.createElement("meta",{name:"description",content:"Todos!"}),r.a.createElement("meta",{name:"theme-color",content:"#008f68"}),r.a.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1"})),r.a.createElement(v,{id:"TitleNavbar",SiteTitle:"Control My Lights",Link1Point:"#LiveControl",Link1Text:"Live Control",Link2Point:"#LiveChat",Link2Text:"Live Chat",Link3Point:"#About",Link3Text:"About",Link4Point:"#Creator",Link4Text:"Creator"}),r.a.createElement("div",{id:"LiveControl",href:"#LiveControl",className:"container-fluid mt-5",style:{height:"100vh",background:"black !important"}},r.a.createElement("div",{className:"d-flex justify-content-center  h-75"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col"},r.a.createElement(g,{ChannelName:"worldmerge",siteSource:window.location.hostname})))),r.a.createElement("div",{className:"row mt-5"},r.a.createElement("div",{className:"col"},r.a.createElement("div",{className:"d-flex justify-content-center "},r.a.createElement(f,{colors:"default",object:k}))))),r.a.createElement("div",{id:"LiveChat",href:"#LiveChat",className:"container-fluid",style:{height:"120vh"}},r.a.createElement("div",{className:"d-flex justify-content-center  h-75"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col"},r.a.createElement(g,{ChannelName:"worldmerge",siteSource:"localhost"})))),r.a.createElement("div",{className:"row mt-5"},r.a.createElement("div",{className:"col"},r.a.createElement("div",{className:"d-flex justify-content-center "},r.a.createElement(f,{colors:"default",object:k}))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[14,1,2]]]);
//# sourceMappingURL=main.dc1ea5dd.chunk.js.map