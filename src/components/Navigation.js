import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navigation extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return (
            <div id="navigation">
                <div className='row'>
                    <div className="col-xs-6 col-md-6 col-lg-6 inCenter">
                        Welcome to CodeBook, {this.props.username}!
                    </div>
                    <div className="col-xs-6 col-md-6 col-lg-6 text-right inCenter">
                        <Link to="/add">Search User</Link> | Profile | Friends | Logout
                    </div>
                </div>
            </div>
        );
    }
}