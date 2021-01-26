import React from 'react';


const Register = () => {
    const [username, setusername] = React.useState([])
    const [password, setPassword] = React.useState([])
    // ^^^ Possibly move to ./components/index.js later to use between Register and Login then pass in as props

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('username: ', username)
        console.log('password: ', password)
        setusername('')
        setPassword('')
    }
    
    return ( <>
        <div>hello from ./Register.js</div>
        <form onSubmit={handleSubmit}>
            <input type='text' value={username} placeholder='Username' onChange={event => setusername(event.target.value)}></input>
            <input type='password' value={password} placeholder='Password' onChange={event => setPassword(event.target.value)}></input>
            <button>Register</button>
        </form>
    </>)
}

export default Register;