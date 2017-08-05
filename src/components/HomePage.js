import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Navigation from './Navigation';
import superagent from 'superagent';

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