import React from 'react';
import {Link, useHistory} from 'react-router-dom';

const AccountForm = ({type, setToken, setUser}) => {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [loginMessage, setLoginMessage] = React.useState('')
    const history = useHistory()
    const title = type === 'login' ? 'LOGIN' : 'REGISTER'
    const oppositeTitle = type === 'login' ? 'Not yet registered? Sign up here!' : 'Already registered? Login here!'
    const oppositeType = type === 'login' ? 'register' : 'login'

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch(`https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT/users/${type}`, {
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
        setLoginMessage(data.success ? <div>{data.data.message}</div> : <div>{data.error.message}.</div>)

        const token = data.success ? data.data.token : ''
        if (token) {
            setToken(token)
            const response = await fetch(`https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT/users/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const meData = await response.json()
            setUser(meData.data)
            setUsername('')
            setPassword('')
            history.push('/')
        }
    }

    return (<div className='account-form'>
        <>{loginMessage}</>
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <div>Username </div>
                <input type='text' value={username} minLength='8' maxLength='20' required onChange={event => setUsername(event.target.value)}></input>
            </div>
            <div>
                <div>Password </div>
                <input type='password' value={password} minLength='8' maxLength='20' required onChange={event => setPassword(event.target.value)}></input>
            </div>
            <button type='submit'>{title}</button>
        </form>
        <div className='opposite-account-form'><Link to={`/${oppositeType}`}>{oppositeTitle}</Link></div>
    </div>)
}

export default AccountForm;