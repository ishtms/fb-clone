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
            <div className="navbar-fixed">
                <nav>
                    <div className='nav-wrapper'>
                        <div className="brand-logo lato">
                            Welcome to CodeBook, {this.props.username}!
                        </div>
                        <ul id="nav-mobile" className="right hide-on-med-and-down lato" style={{marginTop: "0px"}}>
                                <li><Link to="/add">Search User</Link></li>
                                <li><a>Profile</a></li>
                                <li><a>Friends</a></li>
                                <li id="logout" onClick={this.handleLogout.bind(this)}><a>Logout</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}