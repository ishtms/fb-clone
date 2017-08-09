import React, {Component} from 'react';

export default class AllStatus extends Component{
    handleLike(){
        Materialize.toast('You liked the post!', 4000)
    }
    render(){
        var timeString = new Date(this.props.status.time).toString();
        
        var time = timeString.substring(16,21)+ " "+timeString.substring(0,4)+" "+ timeString.substring(4,11);
        return (
            <div className="row" id="status-row" style={{width: '90%', fontFamily: "Lato"}}>
                <div className="col s12 m11 l10">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                    <span className="card-title">{this.props.status.username}</span>
                    <p>{this.props.status.message}</p>
                    </div>
                    <div className="card-action">
                    <a href="#" onClick={this.handleLike.bind(this)} style={{height:"100%",padding:"0 20px"}}><span className="fa fa-heart"></span> Like</a>
                    <a href="#" style={{float:'right'}}><span className="fa fa-clock-o"></span> {time}</a>
                    </div>
                </div>
                </div>
                <br />
                <hr />
            </div>
        );
            {/*<div >
                <div className="row" style={{padding: 8, borderTopRightRadius: '50px'}}>
                    <div className="col-xs-8 col-md-8 col-lg-8">
                        <br />
                        <br />
                        
                    </div>
                    <div className="col-xs-4 col-md-4 col-lg-4">
                        
                    </div>
                </div>
            </div>*/}
        
    }
}