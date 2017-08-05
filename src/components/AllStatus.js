import React, {Component} from 'react';

export default class AllStatus extends Component{
    render(){
        var timeString = this.props.status.time.toString();
        var time = timeString.substring(16,21)+ " "+timeString.substring(0,4)+" "+ timeString.substring(4,11);
        return (
            <div style={{width: '90%', backgroundColor: "cyan", fontFamily: "Lato"}}>
                <div className="row" style={{padding: 8, borderTopRightRadius: '50px'}}>
                    <div className="col-xs-8 col-md-8 col-lg-8">
                        {this.props.status.username}
                        <br />
                        <br />
                        {this.props.status.message}
                    </div>
                    <div className="col-xs-4 col-md-4 col-lg-4">
                        {time}
                    </div>
                </div>
            </div>
        )
    }
}