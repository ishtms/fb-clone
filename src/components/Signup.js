import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            fname: "",
            lname: "",
            username: "",
            email: '',
            password: '',
            phone: '',
            state: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        let Details = Object.assign({}, this.state);
        Details[event.target.id] = event.target.value;
        this.setState(Details);
    }
    render(){
        return (
            <div style={{height: '100%', width: '100%'}}>
                <div className="row">
                    <div className="col-md-2 col-xs-2 col-lg-2">
                        {/*Empty Placeholders*/}
                    </div>
                    <div className="col-md-7 col-xs-7 col-lg-7">
                        <div className="row">
                        <h2>Please enter your details </h2>
                            <div className="col-xs-3 col-md-3 col-lg-3">First Name: &nbsp;</div>
                            <div className="col-xs-9 col-md-9 col-lg-9"><input type="text" id="fname" placeholder="First Name" onChange={this.handleChange} className="form-control" /></div><br />
                        </div>
                        <div className="row">
                            <div className="col-xs-3 col-md-3 col-lg-3">Last Name: &nbsp;</div>
                            <div className="col-xs-9 col-md-9 col-lg-9"><input type="text" id="lname" placeholder="Last Name" onChange={this.handleChange} className="form-control" /></div><br />
                        </div>
                        <div className="row">
                            <div className="col-xs-3 col-md-3 col-lg-3">Username: &nbsp;</div>
                            <div className="col-xs-9 col-md-9 col-lg-9"><input type="text" id="username" placeholder="Desired Username" onChange={this.handleChange} className="form-control" /></div><br />
                        </div>
                        <div className="row">
                            <div className="col-xs-3 col-md-3 col-lg-3">Email Id: &nbsp;</div>
                            <div className="col-xs-9 col-md-9 col-lg-9"><input type="text" id="email" placeholder="Your Email" onChange={this.handleChange} className="form-control" /></div><br />
                        </div>
                        <div className="row">
                            <div className="col-xs-3 col-md-3 col-lg-3">Password: &nbsp;</div>
                            <div className="col-xs-9 col-md-9 col-lg-9"><input type="password" id="password" placeholder="Password" onChange={this.handleChange} className="form-control" /></div><br />
                        </div>
                        <div className="row">
                            <div className="col-xs-3 col-md-3 col-lg-3">Phone Number: &nbsp;</div>
                            <div className="col-xs-9 col-md-9 col-lg-9"><input type="number" id="phone" placeholder="Phone Number (Without +91,0)" onChange={this.handleChange} className="form-control" /></div><br />
                        </div>
                        <div className="row">
                            <div className="col-xs-3 col-md-3 col-lg-3">State: &nbsp;</div>
                            <div className="col-xs-9 col-md-9 col-lg-9"><input type="text" id="state" placeholder="Current State" onChange={this.handleChange} className="form-control" /></div><br />
                        </div>
                        <button className="btn btn-block btn-success">Signup</button><br />
                        <Link to="/login"><button className="btn btn-block btn-success">Already have an account?</button></Link>
                    </div>
                    <div className="col-md-3 col-xs-3 col-lg-3">
                        {/*Empty Placeholders*/}
                    </div>
                </div>
            </div>
        );
    }
}