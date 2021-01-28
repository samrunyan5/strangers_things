import React from 'react';

const Register = ({username, setUsername, password, setPassword, setToken, setLogin}) => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('username: ', username)
        console.log('password: ', password)

        const response = await fetch(`https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT/users/register`, {
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
        const token = !data.success ? '' : data.data.token
        setToken(token)
        setUsername('')
        setPassword('')

        if (data.success) {
            return alert('heck')
            // alert(data.data.message)
        } else {
            return alert('double heck')
            // alert(data.error.message)

        // if (data.success) {
        //     return (<>
        //         {console.log(data.data.message)}
        //         <div id='register-success'>{data.data.message}</div>
        //     </>)
        // } else {
        //     return (<>
        //         {console.log(data.error.message)}
        //         <div id='register-error'>{data.error.message}</div>
        //     </>)
        }
    }

    const handleLogin = (event) => {
        event.preventDefault()
        setLogin(true)
    }

    return (<>
        <h3>Register for an Account</h3>
        <form onSubmit={handleSubmit}>
            <div className='register'>
            <div>
                <div>Create Username </div>
                <input type='text' value={username} placeholder='Username' minLength='8' maxLength='20' required onChange={event => setUsername(event.target.value)}></input>
            </div>
            <div>
                <div>Create Password </div>
                <input type='password' value={password} placeholder='Password' minLength='8' maxLength='20' required onChange={event => setPassword(event.target.value)}></input>
            </div>
            <button type='submit'>Register</button>
            </div>
        </form>
        <button onClick={handleLogin}>Already registered? Login here!</button>
    </>)
}

export default Register;