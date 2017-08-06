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
        if(window.screen.width > 780) 
          return (<nav>
                <div className="nav-wrapper">
                    <a id="showsDropDown" className='dropdown-button btn brand-logo center' style={{paddingTop:"18px",background:'transparent', height:"100%",width:"100%"}}  data-activates='dropdown1'>
                        Welcome to CodeBook, {this.props.username}! <span className="fa fa-arrow-circle-down"></span>
                    </a>
                    <ul id="dropdown1" className="dropdown-content">
                        <li><Link className=" text-center" to="/add">Search User</Link></li>
                        <li className="divider" />
                        <li className="center"><Link className=" text-center" to="">Profile</Link></li>
                        <li className="divider" />
                        <li><Link to="" className=" text-center">Friends</Link></li>
                        <li className="divider" />
                        <li><a className=" text-center" id="logout" onClick={this.handleLogout.bind(this)}>Logout</a></li>
                    </ul>

                </div>
            </nav>)
        else
            return (<div id="navigation">
                <div className='row'>
                    <div className="col-xs-6 col-md-6 col-lg-6 inCenter">
                        Welcome to CodeBook, {this.props.username}!
                    </div>
                    <div className="col-xs-6 col-md-6 col-lg-6 text-right inCenter">
                        <Link to="/add">Search User</Link> | <Link to="">Profile</Link> | <Link to="">Friends</Link> | <span id="logout" onClick={this.handleLogout.bind(this)}>Logout</span>
                    </div>
                </div>
            </div>
        );
    }
}