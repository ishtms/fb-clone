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
        var socket = io();
        socket.emit('online', this.props.username);
    }
    componentWillUnmount(){
        var socket = io()
        socket.emit('userdc', this.props.username);
    }

        componentDidMount(){
            var Details = Object.assign({}, this.state);
        superagent
            .get('/comments')        
            .query()
            .set("Accept",'application/json')
            .end((err, response)=>{
                if(err){
                    Materialize.toast('An error occured while fetching data!', 8000);
                }else{
                    console.log(response.body.result)
                    var sortedarr = response.body.result.sort( (a,b) => {
                            return b.time - a.time;
                    })
                        Details.status = sortedarr;
                    this.setState(Details);
                }
            });
                  var socket = io();
            window.addEventListener("beforeunload", (ev) => 
                {  
                   socket.emit('userdc', this.props.username);
                });
            var self = this;
                       socket.on('showusers', function(data){
                            Details.online = data;
                            self.setState(Details);
                        })
                        
                       socket.on('finalizeUpdate',function(data){
                           data.time = new Date()
                           Details.status.push(data);
                           self.setState(Details);
                           var audio = new Audio('/notification.mp3');
                            audio.play();
                       })


        }
    constructor(props){
        super(props);
        this.state = {
            online: [],
            status: [],
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
            
            superagent
            .post('/comments')
            .send(status)
            .set('Accept', "application/json")
            .end( (err, response) => {
                if(err){
                    Materialize.toast("An error occured while saving your message! Please try again later.", 5000);
                }else{
                    console.log('message saved');
                }
            }); 
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
            this.state.online.map((onlineuser, index)=>{
                let url = "/show_user/"+this.state.online[index]+"/"+this.props.username;
                return (
                  <Link style={{backgroundColor: 'rgba(0,255,0,0.5)'}} key={index} to={url}>  <ListItem
                        primaryText={onlineuser}
                        leftAvatar={<Avatar src="/images/online.jpg" />}
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
                            <Subheader style={{fontSize: "2em"}}>Online Users</Subheader>
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