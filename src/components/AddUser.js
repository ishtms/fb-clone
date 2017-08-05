import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import superagent from 'superagent';

export default class AddUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            message: 'Type the correct username'
        }
    }
    handleChange(event){
        let Details = Object.assign({},this.state);
        Details.username = event.target.value;

        this.setState(Details);
    }
    handleSubmit(){
        console.log("THIS WAS CLICKED")
        let Details = Object.assign({},this.state);
        var url = "/register/profile/addfriend/" + this.state.username;
        console.log(url);
        superagent
            .put(url)
            .send({somedata: "lsdkjf"})
            .set("Accept",'application/json')
            .end((err,response) => {
                if(err){
                    Details.message = "User not found"
                    this.setState(Details);
                    console.log(err)
                    document.getElementById("search-user").value = "";
                }else{
                    console.log(response.body)
                    Details.message = response.body.message;
                    this.setState(Details);
                    document.getElementById("search-user").value = "";
                }
            });
    }
    render(){
        console.log(this.state)
        return (
            <div style={{marginTop: '20%'}}>
                <div className="row">
                    <div className="col-xs-2 col-md-3 col-lg-4"/>
                    <div className="col-xs-8 col-md-6 col-lg-4 text-center">
                        Search by Username<br /><br />
                        <p className="alert alert-info">{this.state.message}</p>

                        <input type="text" id="search-user" className="form-control text-center" placeholder="Username" onChange={this.handleChange.bind(this)} />
                        <button className="btn btn-primary" onClick={this.handleSubmit.bind(this)} style={{marginTop:20}}>Search</button>
                    </div>
                    <div className="col-xs-2 col-md-3 col-lg-4"/>
                </div>
            </div>
        );
    }
}