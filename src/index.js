import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

import {
    Register,
    Login
} from './components';

const App = () => {
    const [login, setLogin] = React.useState(true)
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [token, setToken] = React.useState('')

    return (
        <div id='app'>
            <h1>Stranger's Things</h1>
            <nav>
                <span>HOME</span>
                <span>POSTS</span>
                <span>PROFILE</span>
                <span>LOGOUT</span>
            </nav>
            <br />
            {login ? 
                <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} setToken={setToken} setLogin={setLogin} /> 
            : 
                <Register username={username} setUsername={setUsername} password={password} setPassword={setPassword} setToken={setToken} setLogin={setLogin} />
            }

        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)