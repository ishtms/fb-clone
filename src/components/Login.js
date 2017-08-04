import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import superagent from 'superagent';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory({forceRefresh:true});

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username : "",
            password : ""
        }
        this.renderChange = this.renderChange.bind(this);
    }
    renderChange(event){
        let Details = Object.assign({}, this.state);
        Details[event.target.id] = event.target.value;
        this.setState(Details);
    }
    handleLogin(){
        
        let Details = Object.assign({},this.state);
        superagent
            .get('/register')
            .query({username: Details.username, password: Details.password})
            .set("Accept","application/json")
            .end(function(err,response){
                if(err){
                    response.status(403).send()
                }else{
                     if(response.body.result.length>0){
                         document.getElementById('info').innerHTML = "Succesfully Logged in!";
                         history.push('/',{username:Details.username});
                     }else{
                         console.log('this is running')
                         document.getElementById('info').innerHTML = "Wrong username or password!";
                     }
                }
            });
    }
    render(){
        return(
            <div className="text-center" style={{textAlign:'center', height:"100%",width:"100%",margin:"auto"}}>
                <h2> Login to your account</h2><br/>
                <div className='row'>
                <div className="col-md-4 col-xs-4 col-lg-4">

                    </div>
                    <div className="col-md-4 col-xs-4 col-lg-4">
                        <div className="alert alert-info" style={{width: "100%"}} id="info">Login Please</div>
                        <input className="form-control" type="text" placeholder="Username" onChange={this.renderChange} id="username" /> <br />
                        <input className="form-control" type="password" placeholder="Password" onChange={this.renderChange} id="password" /> <br />
                        <button onClick={this.handleLogin.bind(this)} className="btn btn-block btn-success" id="login">Login</button>  
                        <Link to ="/signup"><button className="btn btn-block btn-warning" id="signup">SignUp</button></Link>  
                    </div>
                    <div className="col-md-4 col-xs-4 col-lg-4">
                        
                    </div>  
                </div>
            </div>
        );
    }
}
