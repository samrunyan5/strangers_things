import React, {useEffect} from 'react';

const Profile = ({token, user, setUser}) => {

    useEffect(async () => {
        const response = await fetch(`https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT/users/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const meData = await response.json()
        console.log(meData)
        setUser(meData.data)
    }, [])

    return (<div className='profile'>
        <h2>MESSAGES TO ME</h2>
        {user.messages.map(message => {
            const {fromUser, post, content, _id} = message
            return user.username !== fromUser.username ? 
            <div className='messages' key={_id}>
                <h3>{post.title.toUpperCase()}</h3>
                {console.log(post.title)}
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
                <p className='view-message'>{content}</p>
            </div>
            : ''
        })}
    </div>)

}

export default Profile;