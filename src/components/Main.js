import React from 'react';
import {Link} from 'react-router-dom';

export default class Main extends React.Component{
    render(){
        return (
            <div>
                <h2 className="text-center">Welcome to Codebook</h2>
                 <div className="text-center">
                    Already have an account?<Link to='/login'><button className="btn btn-primary">Login</button></Link><br />
                    Are you new? <Link to='/signup'><button className="btn btn-primary">SignUp</button></Link>
                </div>
            </div>
        );
    }
}