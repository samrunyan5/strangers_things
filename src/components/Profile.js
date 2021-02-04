import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';

const Profile = ({token, user, setUser}) => {

    if (token) {
        useEffect(async () => {
            const response = await fetch(`https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT/users/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const meData = await response.json()
            setUser(meData.data)
        }, [])

        return (<div className='profile'>
            <h2>MESSAGES TO ME</h2>
            {user.messages.map(message => {
                const {fromUser, post, content, _id} = message
                return user.username !== fromUser.username ? 
                <div className='messages' key={_id}>
                    <h3>{post.title.toUpperCase()}</h3>
                    <p><b>From: {fromUser.username}</b></p>
                    <p className='view-message'>{content}</p>
                </div>
                : ''
            })}
            <h2>MESSAGES FROM ME</h2>
            {user.messages.map(message => {
                const {fromUser, post, content, _id} = message
                return user.username === fromUser.username ?
                <div className='messages' key={_id}>
                    <h3>{post.title.toUpperCase()}</h3>
                    <p><b>From: {user.username}</b></p>
                    <p className='view-message'>{content}</p>
                </div>
                : ''
            })}
        </div>)
    } else {
        return <Redirect to='/' />
    }
}

export default Profile;