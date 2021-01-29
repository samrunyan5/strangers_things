import React from 'react';

const Home = ({user, setAccountFormStatus}) => {
    setAccountFormStatus('')

    return (<>
        <h2>Welcome to Stranger's Things!</h2>
        {user.username ? 
        <div>Currently logged in as {user.username}.</div>
        : 
        <div>Please login above.</div>}
    </>)
}

export default Home;