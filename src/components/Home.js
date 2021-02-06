import React from 'react';

const Home = ({user}) => {

    return (<div className='home-page-text'>
        <h2>Welcome to Stranger's Things!</h2>
        {user.username ? 
        <div>Currently logged in as <b>{user.username}</b></div>
        : 
        <div>Please login above.</div>}
        <img className='home-pic' src="/strangers_things_home_pic.jpg" />
    </div>)
}

export default Home;