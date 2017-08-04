import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Navigation from './Navigation';
export default class HomePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            friends: ['ish',"pun","HarshDev"],
            status: {}
        }
    }
    render(){
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
                <div className="col-xs-8 col-md-8 col-lg-8" id="status-section">
                    Status
                </div>
            </div>
        </div>
       );
        
    }
}