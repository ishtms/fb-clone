import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Navigation from './Navigation';
export default class HomePage extends Component{
    
    constructor(props){
        super(props);
    }
    render(){
       return (
           <div>
            <Navigation username={this.props.username} />
            <div className="row" id="content">
                <div className="col-xs-4 col-md-4 col-lg-4" id="friend-section">
                    Friends
                </div>
                <div className="col-xs-7 col-md-7 col-lg-7" id="status-section">
                    Status
                </div>
            </div>
        </div>
       );
        
    }
}