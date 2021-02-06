import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link, useHistory} from 'react-router-dom';

import {
    AccountForm,
    Home,
    Posts,
    PostForm,
    ViewPost,
    SendMessage,
    Profile,
    EditPost
} from './components';

const App = () => {
    const [user, setUser] =React.useState({username : ''})
    const [token, setToken] = React.useState('')
    const [post, setPost] = React.useState({})
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [price, setPrice] = React.useState('')
    const [location, setLocation] = React.useState('')
    const [willDeliver, setWillDeliver] = React.useState(false)
    const history = useHistory()

    useEffect( () => {
        setToken(localStorage.getItem('token'))
        if (token) {
            const captureToken = async () => {
                const response = await fetch(`https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT/users/me`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                const meData = await response.json()
                setUser(meData.data)
            }
            captureToken()
        }
    }, [token])

    const handleLogout = (event) => {
        event.preventDefault()
        setUser({})
        setToken('')
        localStorage.clear()
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
            <PostForm token={token} title={title} setTitle={setTitle} description={description} setDescription={setDescription} price={price} setPrice={setPrice} location={location} setLocation={setLocation} willDeliver={willDeliver} setWillDeliver={setWillDeliver} />
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
            <ViewPost post={post} token={token} setTitle={setTitle} setDescription={setDescription} setPrice={setPrice} setLocation={setLocation} setWillDeliver={setWillDeliver} />
        </Route>
        <Route path='/sendmessage'>
            <SendMessage post={post} token={token} />
        </Route>
        <Route path='/profile'>
            <Profile token={token} user={user} setUser={setUser} />
        </Route>
        <Route path='/editpost'>
            <EditPost token={token} post={post} setPost={setPost} title={title} setTitle={setTitle} description={description} setDescription={setDescription} price={price} setPrice={setPrice} location={location} setLocation={setLocation} willDeliver={willDeliver} setWillDeliver={setWillDeliver} />
        </Route>
    </div>)
}

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
)