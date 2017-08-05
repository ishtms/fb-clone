import React, {Component} from 'react';
import superagent from 'superagent';

export default class Status extends Component{
    constructor(props){
        super(props);
        this.state = {
            text: ""
        }
    }
    
    render(){
        console.log("CHILD RENDER CALLED")
        return (
            <div style={{width: "90%"}} className="text-center">
                <div className="row">
                    <div className="col-xs-10 col-md-9 col-lg-8">
                        <textarea onChange={this.props.callback} rows="3" id="status-text" className="form-control"/><br />
                    </div>
                    <div className="col-xs-2 col-md-3 col-lg-4">
                        <button onClick={this.props.callback_two} className="btn btn-block btn-info">Post</button>
                    </div>
                </div>
            </div>
        );
    }
}