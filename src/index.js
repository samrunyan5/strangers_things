import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './style.css';

import {
    AccountForm
} from './components';

const App = () => {
    const [user, setUser] =React.useState({})
    const [token, setToken] = React.useState('')

    return (<div id='app'>
        <h1>Stranger's Things</h1>
        <nav>
            <span>HOME</span>
            <span>POSTS</span>
            <span>PROFILE</span>
            <span>LOGOUT</span>
        </nav>
        <br />
        {user.username ? <div>Hello {user.username}!</div> : ''}
        <Route path='/login'>
            <AccountForm type={'login'} setToken={setToken} setUser={setUser} /> 
        </Route>
        <Route path='/register'>
            <AccountForm type={'register'} setToken={setToken} setUser={setUser} /> 
        </Route>
    </div>)
}

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
)