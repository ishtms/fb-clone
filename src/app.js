import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Main from './components/Main';
import createHistory from 'history/createBrowserHistory';

var history = createHistory();
let flag = false;

var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;

class App extends React.Component{
    render(){
        return(
            <Router history={history}>
                <div>
                    <Route exact path="/" component={Main} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App />,document.getElementById('app'));