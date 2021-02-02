import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link, useHistory} from 'react-router-dom';

import {
    AccountForm,
    Home,
    Posts,
    PostForm,
    ViewPost,
    SendMessage,
    Profile
} from './components';

const App = () => {
    const [user, setUser] =React.useState({})
    const [token, setToken] = React.useState('')
    const [post, setPost] = React.useState({})
    const history = useHistory()

    const handleLogout = (event) => {
        event.preventDefault()
        setUser({})
        setToken('')
        history.push('/')
    }

    return (<div id='app'>
        <div className='header-container'>
            <h1>STRANGER'S THINGS</h1>
            <nav>
                <div className='nav-links'>
                <Link to='/'>HOME</Link>
                <Link to='/newpost' className={user.username ? '' : 'loggedOut'} >NEW POST</Link>
                <Link to='/posts'>POSTS</Link>
                <Link to='/profile' className={user.username ? '' : 'loggedOut'} >PROFILE</Link>
                <Link to='/' className={user.username ? '' : 'loggedOut'} onClick={handleLogout}>LOGOUT</Link>
                <Link to='/login' className={!user.username ? '' : 'loggedOut'} >LOGIN</Link>
                </div>
            </nav>
        </div>
        <br />
        <Route exact path='/'>
            <Home user={user} />
        </Route>
        <Route path='/newpost'>
            <PostForm token={token} />
        </Route>
        <Route path='/posts'>
            <Posts token={token} setPost={setPost} />
        </Route>
        <Route path='/login'>
            <AccountForm type={'login'} setToken={setToken} setUser={setUser} /> 
        </Route>
        <Route path='/register'>
            <AccountForm type={'register'} setToken={setToken} setUser={setUser} /> 
        </Route>
        <Route path='/viewpost'>
            <ViewPost post={post} token={token} />
        </Route>
        <Route path='/sendmessage'>
            <SendMessage post={post} token={token} />
        </Route>
        <Route path='/profile'>
            <Profile token={token} user={user} setUser={setUser} />
        </Route>
    </div>)
}

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
)