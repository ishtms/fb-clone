import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import superagent from 'superagent';
import initReactFastclick from 'react-fastclick';
import ReactTouchEvents from "react-touch-events";

let available = false;
export default class Signup extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            details: {
                fname: "",
                lname: "",
                username: "",
                email: '',
                password: '',
                phone: '',
                state: ''
            },
            validation: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }
    handleSignUp(){
        console.log("This state is ", this.state.details)
        let Details = Object.assign({},this.state);

        if(Details.details.email.length==0 || Details.details.fname.length ==0 || Details.details.lname.length ==0 ||
        Details.details.password.length==0 || Details.details.phone.length==0 || Details.details.state.length ==0||
         Details.details.username.length==0){
            Details.validation = false;
            this.setState(Details)
        }else if(Details.details.username.length <5){
            document.getElementById('alert-message').innerHTML = "UserName Should be atleast 6 characters long";
        }else if(Details.details.email.indexOf('@')<0 || Details.details.email.indexOf('.com')<0){
            document.getElementById('alert-message').innerHTML = "Please enter a valid e-mail address";
        }else if(Details.details.password.length<8){
            document.getElementById('alert-message').innerHTML = "Password should be atleast 8 characters Long!";
        }else if(Details.details.phone.length!=10){
            document.getElementById('alert-message').innerHTML = "Phone number should be 10 digits long";
        }else{
            superagent
            .get('/register')
            .query({username: Details.details.username})
            .set("Accept", "application/json")
            .end(function(err,response){
                if(err){
                    console.log(err)
                    available = false;
                }else{
                    
                   if(response.body.result.length>0){
                       document.getElementById('alert-message').innerHTML = "Username already taken. Try any other";
                   }else 
                    {
                        superagent
                            .post('/register/signup')
                            .send(Details.details)
                            .set("Accept",'application/json')
                            .end((err,response) =>{
                                if(err){
                                    return err;
                                    }else{
                                        document.getElementById('alert-message').innerHTML = "SignUp Succesful! You can Login now.";
                                        document.getElementById('fname').value ="";
                                        document.getElementById('lname').value ="";
                                        document.getElementById('password').value ="";
                                        document.getElementById('username').value ="";
                                        document.getElementById('email').value ="";
                                        document.getElementById('phone').value ="";
                                        document.getElementById('state').value ="";
                                    }
                                });
                                //Creating username for friendreq,messages etc
                                console.log(typeof(Details.details.username))
                            superagent
                                .post('/register/profile')
                                .send({username: Details.details.username})
                                .set("Accept",'application/json')
                                .end((err,response) =>{
                                    if(err){
                                        return err;
                                        }else{
                                            console.log(response.body)
                                    }
                                });
                            }
                    }
                
                });
        }
    }
    
    handleChange(event){
        let Details = Object.assign({}, this.state);
        Details.details[event.target.id] = event.target.value;
        console.log(Details[event.target.id],event.target.value)
        this.setState(Details);
    }
    render(){
        console.log('calling render and state is ' + this.state.validation)
        return (
            <div style={{height: '100%', width: '100%'}} id="signup_div">
                <div className="row">
                    <div className="col-md-2 col-xs-2 col-lg-2">
                        {/*Empty Placeholders*/}
                    </div>
                    <div className="col-md-7 col-xs-7 col-lg-7">
                        <div className="row">
                        <h2 className="text-center text-primary">Please enter your details </h2><br /><br />
                            <div id="alert-message" className="text-center alert alert-info">{(this.state.validation) ? "Provide accurate information please." : "Please fill up all the blanks"}</div>
                            <br />

                            <div className="col-xs-3 col-md-3 col-lg-3">First Name: &nbsp;</div>
                            <div className="col-xs-9 col-md-9 col-lg-9"><input name="fname" type="text" id="fname" placeholder="First Name" onChange={this.handleChange} className="form-control" /></div><br />
                        </div>
                        <div className="row">
                            <div className="col-xs-3 col-md-3 col-lg-3">Last Name: &nbsp;</div>
                            <div className="col-xs-9 col-md-9 col-lg-9"><input type="text" name="lname" id="lname" placeholder="Last Name" onChange={this.handleChange} className="form-control" /></div><br />
                        </div>
                        <div className="row">
                            <div className="col-xs-3 col-md-3 col-lg-3">Username: &nbsp;</div>
                            <div className="col-xs-9 col-md-9 col-lg-9"><input type="text" id="username" placeholder="Desired Username" onChange={this.handleChange} className="form-control" name="username" /></div><br />
                        </div>
                        <div className="row">
                            <div className="col-xs-3 col-md-3 col-lg-3">Email Id: &nbsp;</div>
                            <div className="col-xs-9 col-md-9 col-lg-9"><input type="text" id="email" placeholder="Your Email" onChange={this.handleChange} className="form-control" name="email" /></div><br />
                        </div>
                        <div className="row">
                            <div className="col-xs-3 col-md-3 col-lg-3">Password: &nbsp;</div>
                            <div className="col-xs-9 col-md-9 col-lg-9"><input type="password" id="password" placeholder="Password" onChange={this.handleChange} className="form-control" name="password" /></div><br />
                        </div>
                        <div className="row">
                            <div className="col-xs-3 col-md-3 col-lg-3">Phone Number: &nbsp;</div>
                            <div className="col-xs-9 col-md-9 col-lg-9"><input type="number" id="phone" placeholder="Phone Number (Without +91,0)" onChange={this.handleChange} className="form-control" name="phone" /></div><br />
                        </div>
                        <div className="row">
                            <div className="col-xs-3 col-md-3 col-lg-3">State: &nbsp;</div>
                            <div className="col-xs-9 col-md-9 col-lg-9"><input type="text" id="state" placeholder="Current State" onChange={this.handleChange} className="form-control" name="state" /></div><br />
                        </div>
                        <ReactTouchEvents 
                            onTap={ this.handleSignUp.bind(this) }>
                            <button type="submit" id="signup" className="btn btn-block btn-success">Signup</button>
                            </ReactTouchEvents>
                            <br />

                        <Link style={{textDecoration:'none'}} to="/login"><button className="btn btn-block btn-success">Already have an account?</button></Link>
                        
                    </div>
                    <div className="col-md-3 col-xs-3 col-lg-3">
                        {/*Empty Placeholders*/}
                    </div>
                    
                </div>
            </div>
        );
    }
}