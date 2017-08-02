import React, {Component} from 'react';
import {Link} from 'react-router-dom';
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
    render(){
        return(
            <div className="text-center" style={{textAlign:'center', height:"100%",width:"100%",margin:"auto"}}>
                <h2> Login to your account</h2><br/>
                <div className='row'>
                <div className="col-md-4 col-xs-4 col-lg-4">

                    </div>
                    <div className="col-md-4 col-xs-4 col-lg-4">
                        <input className="form-control" type="text" placeholder="Username" onChange={this.renderChange} id="username" /> <br />
                        <input className="form-control" type="text" placeholder="Password" onChange={this.renderChange} id="password" /> <br />
                        <button className="btn btn-block btn-success" id="login">Login</button>  
                        <Link to ="/signup"><button className="btn btn-block btn-warning" id="signup">SignUp</button></Link>  
                    </div>
                    <div className="col-md-4 col-xs-4 col-lg-4">
                        
                    </div>  
                </div>
            </div>
        );
    }
}
