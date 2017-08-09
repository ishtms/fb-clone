import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Navigation from './Navigation';
import superagent from 'superagent';
import Status from './Status';
import AllStatus from './AllStatus';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class HomePage extends Component{
    componentWillMount(){
        var friendArray = [];
        
        superagent
            .get('/register/profile')
            .query({username: this.props.username})
            .set("Accept", "application/json")
            .end((err, response) => {
                if(err){
                }else{
                    response.body.result[0].friends.map((user) => {
                        friendArray.push(user);
                    })
                    this.setState({
                        friends: friendArray
                    })
                }
            });
    }
        componentDidMount(){
            var self = this;
            var Details = Object.assign({}, this.state);
                       var socket = io();
                       socket.on('finalizeUpdate',function(data){
                           data.time = new Date()
                           Details.status.push(data);
                           self.setState(Details);
                       })


        }
    constructor(props){
        super(props);
        this.state = {
            friends: [],
            status: [
                {
                    username: "Ishtmeet",
                    message: "Hello this is a wonderful day",
                    time:  new Date()
                },
                {
                    username: "Tavleen",
                    message: "Hello despacito reached 3 Billion views!",
                    time:  new Date()
                }
            ],
            currentStatus: ""
        }
    }
    renderChange(event){
        let Details = Object.assign({},this.state);
        Details.currentStatus = event.target.value;
        this.setState(Details);
           keyDown(this.props.username);
    }
    submitChange(){
        var socket = io();
        let Details = Object.assign({},this.state);
        var status = {
            username: this.props.username,
            message : Details.currentStatus
        };
        if(Details.currentStatus==""){
            Materialize.toast("Sorry, you can't post an empty status!", 4000);
        }else{
            socket.emit('updateCall',status);
            socket.emit('blur');
        }
        Details.currentStatus = "";
        document.getElementById('status-text').value = "";
        document.getElementById('status-text').placeholder = "Type to chat..."
        this.setState(Details);
        

    }
    
    render(){
        var sortedStatus = this.state.status.sort((a,b) => {
            return (b.time - a.time);
        })
        

        var findFriends =
            this.state.friends.map((friend, index)=>{
                let url = "/show_user/"+this.state.friends[index]+"/"+this.props.username;
                return (
                  <Link to={url}>  <ListItem
                        primaryText={friend}
                        leftAvatar={<Avatar src="/images/loading.gif" />}
                        rightIcon={<CommunicationChatBubble />}
                    /></Link>
                );
            });
       return (
             <MuiThemeProvider>
           <div>
            <Navigation username={this.props.username} />
            <div className="row" id="content">
                <div className="col-xs-3 col-md-3 col-lg-3 text-center" id="friend-section">
                    <br />
                    <br />
                        <List>
                            <Subheader style={{fontSize: "2em"}}>Recent chats</Subheader>
                            {findFriends}
                        </List>

                </div>
                <div className="col-xs-9 col-md-9 col-lg-9" id="status-section" style={{marginTop:"0%"}}>
                    <Status username={this.props.username} callback={this.renderChange.bind(this)} callback_two={this.submitChange.bind(this)} />
                    <ul id="status-list">  
                        {
                            sortedStatus.map((status,index) => {
                                return (
                                    <li key={index}><AllStatus status={status}/></li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
        </MuiThemeProvider>
       );
        
    }
}