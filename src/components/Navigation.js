import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import superagent from 'superagent';

const history = createBrowserHistory({forceRefresh:true});

export default class Navigation extends Component{
    constructor(props){
        super(props);
    }
    handleLogout(){
        history.push("/");
        superagent
            .get('/register/logout')
            .query({})
            .set("Accept","application/json")
            .end((err,response)=>{
                if(err){
                    console.log("Error")
                }else{
                    console.log("Logged out");
                }
            })
    }
    render(){
        return (
            <div id="navigation">
                <div className='row'>
                    <div className="col-xs-6 col-md-6 col-lg-6 inCenter">
                        Welcome to CodeBook, {this.props.username}!
                    </div>
                    <div className="col-xs-6 col-md-6 col-lg-6 text-right inCenter">
                        <Link to="/add">Search User</Link> | Profile | Friends | <span id="logout" onClick={this.handleLogout.bind(this)}>Logout</span>
                    </div>
                </div>
            </div>
        );
    }
}