import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import superagent from 'superagent'
import Navigation from './Navigation';

export default class ShowUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            fullname: "",
            phone: "",
            state: "",
            email: "",
            currentuser: ""
        }
    }
    componentWillMount(){
        var  user = this.props.location.pathname.slice(11).split("/")[0];
        var  currentuser = this.props.location.pathname.slice(11).split("/")[1];
        let Details = Object.assign({},this.state);
        console.log(user,currentuser)
        superagent
            .get('/register/finduser')
            .query({username : user})
            .set("Accept","application/json")
            .end((err,response)=>{
                if(err){
                    console.log("Some error");
                }else{
                    if(response.body.result.length>0){
                        Details.fullname = response.body.result[0].fname + " " + response.body.result[0].lname;
                        Details.username = response.body.result[0].username;
                        Details.phone = response.body.result[0].phone;
                        Details.state = response.body.result[0].state;
                        Details.email = response.body.result[0].email;
                        Details.currentuser = currentuser;
                        this.setState(Details);
                    }else{
                        console.log('user not found');
                    }
                }
            });
    }
    render(){
        console.log(this.state);
        return (
            <div>
                <Navigation username={this.state.currentuser} />
                    <div style={{fontFamily:'Lato',marginTop:"4em"}} id="displaydatabox">
                        <div className="row" style={{width: "100%"}}>
                            <div className="col-xs-3 col-md-3 col-lg-4"></div>
                            <div className="col-xs-4 col-md-6 col-lg-4" id="display-data-box">
                                <div className="row" id="display-data-box">
                                    <div className="col-xs-5 col-md-5 col-lg-5">
                                        Username :
                                    </div>
                                    <div className="col-xs-7 col-md-7 col-lg-7">
                                        {this.state.username}               
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-5 col-md-5 col-lg-5">
                                        Full Name :
                                    </div>
                                    <div className="col-xs-7 col-md-7 col-lg-7">
                                        {this.state.fullname}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-5 col-md-5 col-lg-5">
                                        Email :
                                    </div>
                                    <div className="col-xs-7 col-md-7 col-lg-7">
                                        {this.state.email}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-5 col-md-5 col-lg-5">
                                        Phone No : 
                                    </div>
                                    <div className="col-xs-7 col-md-7 col-lg-7">
                                        {this.state.phone}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-5 col-md-5 col-lg-5">
                                        State :
                                    </div>
                                    <div className="col-xs-7 col-md-7 col-lg-7">
                                        {this.state.state}
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-3 col-md-3 col-lg-4"></div>
                        </div>
                        <br/>
                        <br/>
                    </div>
            </div>
        );
    }
}
