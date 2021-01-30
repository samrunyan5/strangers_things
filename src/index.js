import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import {
    AccountForm,
    Home,
    Posts
} from './components';

const App = () => {
    const [user, setUser] =React.useState({})
    const [token, setToken] = React.useState('')
    const [accountFormStatus, setAccountFormStatus] = React.useState('')
    console.log('user:', user)

    const handleLogout = (event) => {
        event.preventDefault()
        setUser({})
        setToken('')
        setAccountFormStatus("You have been logged out. Sign back in when you're ready.")
    }

    return (<div id='app'>
        <h1>Stranger's Things</h1>
        <nav>
            <Link to='/'>HOME</Link>
            <Link to='/posts'>POSTS</Link>
            <Link to='/profile' className={user.username ? '' : 'loggedOut'}>PROFILE</Link>
            <Link to='/' className={user.username ? '' : 'loggedOut'} onClick={handleLogout}>LOGOUT</Link>
            <Link to='/login' className={!user.username ? '' : 'loggedOut'}>LOGIN</Link>
        </nav>
        <br />
        {accountFormStatus ? accountFormStatus : ''}
        <Route exact path='/'>
            <Home user={user} setAccountFormStatus={setAccountFormStatus} />
        </Route>
        <Route path='/posts'>
            <Posts setAccountFormStatus={setAccountFormStatus} token={token} />
        </Route>
        <Route path='/login'>
            <AccountForm type={'login'} setToken={setToken} setUser={setUser} setAccountFormStatus={setAccountFormStatus} /> 
        </Route>
        <Route path='/register'>
            <AccountForm type={'register'} setToken={setToken} setUser={setUser} setAccountFormStatus={setAccountFormStatus} /> 
        </Route>
    </div>)
}

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
)