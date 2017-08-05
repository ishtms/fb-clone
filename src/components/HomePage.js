import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Navigation from './Navigation';
import superagent from 'superagent';
import Status from './Status';
import AllStatus from './AllStatus';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class HomePage extends Component{
    componentWillMount(){
        var friendArray = [];
        
        superagent
            .get('/register/profile')
            .query({username: this.props.username})
            .set("Accept", "application/json")
            .end((err, response) => {
                if(err){
                    console.log("Some error "+ err);
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
    constructor(props){
        super(props);
        this.state = {
            friends: [],
            status: [
                {
                    username: "Ishtmeet",
                    message: "Hello this is a wonderful day",
                    time: new Date()
                },
                {
                    username: "Tavleen",
                    message: "Hello despacito reached 3 Billion views!",
                    time: new Date()
                }
            ],
            currentStatus: ""
        }
    }
    renderChange(event){
        let Details = Object.assign({},this.state);
        Details.currentStatus = event.target.value;
        this.setState(Details);
    }
    submitChange(){
        let Details = Object.assign({},this.state);
        Details.status.push({username: this.props.username, message: Details.currentStatus, time: new Date()});
        this.setState(Details)
        document.getElementById('status-text').value = ""
    }
    render(){
        var sortedStatus = this.state.status.sort((a,b) => {
            return (b.time - a.time);
        })
        var findStatus = 
            sortedStatus.map((status,index) => {
                return (
                    <ReactCSSTransitionGroup 
                    transitionName="fade"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                    >
                    <li key={index}><AllStatus status={status}/></li>
                    </ReactCSSTransitionGroup>
                );
            })
        console.log("render from parent");
        var findFriends =
            this.state.friends.map((friend, index)=>{
                let url = "/show_user/"+this.state.friends[index]+"/"+this.props.username;
                return (<Link to={url} key={index}><li>{friend}</li></Link>);
            });
        
       return (
           <div>
            <Navigation username={this.props.username} />
            <div className="row" id="content">
                <div className="col-xs-3 col-md-3 col-lg-3 text-center" id="friend-section">
                    <span id="title">Friends</span>
                    <br />
                    <br />
                    <ul id="friend-list" >
                    {findFriends}
                    </ul>
                </div>
                <div className="col-xs-8 col-md-8 col-lg-8" id="status-section" style={{marginTop:"5%"}}>
                    <Status username={this.props.username} callback={this.renderChange.bind(this)} callback_two={this.submitChange.bind(this)} />
                    <ul id="status-list">
                    {findStatus}
                    </ul>
                </div>
            </div>
        </div>
       );
        
    }
}