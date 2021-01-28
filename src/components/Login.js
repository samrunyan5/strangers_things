import React from 'react';
import '../style.css';

const Login = ({username, setUsername, password, setPassword, setToken, setLogin}) => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('username: ', username)
        console.log('password: ', password)

        const response = await fetch(`https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username,
                    password
                }
            })
        })

        const data = await response.json()
        console.log('data: ', data)
        const token = !data.success ? '' : data.data.token
        setToken(token)
        setUsername('')
        setPassword('')
    }

    const handleLogin = (event) => {
        event.preventDefault()
        setLogin(false)
    }

    return (<>
        <h3>Login to Your Account</h3>
        <form onSubmit={handleSubmit}>
            <div className='login'>
            <div>
                <div>Username </div>
                <input type='text' value={username} placeholder='Username' minLength='8' maxLength='20' required onChange={event => setUsername(event.target.value)}></input>
            </div>
            <div>
                <div>Password </div>
                <input type='password' value={password} placeholder='Password' minLength='8' maxLength='20' required onChange={event => setPassword(event.target.value)}></input>
            </div>
            <button type='submit'>Login</button>
            </div>
        </form>
        <button onClick={handleLogin}>Not yet registered? Sign up here!</button>
    </>)
}

export default Login;