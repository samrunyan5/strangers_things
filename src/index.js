import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

import {
    Register,
    Login
} from './components';

const App = () => {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [token, setToken] = React.useState('')

    return (
        <div id='app'>
            <h1>Stranger's Things</h1>
            <br />
            <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} setToken={setToken} />
            <Register username={username} setUsername={setUsername} password={password} setPassword={setPassword} setToken={setToken} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)