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
        setUser(meData.data)
    }, [])

    return (<>
        <h2>MESSAGES TO ME</h2>
        {user.messages.map(message => {
            console.log(message)
            const {fromUser, post, content, _id} = message
            return user.username !== fromUser.username ? 
            <div key={_id}>
                <h3>{post.title}</h3>
                <h4>From: {fromUser.username}</h4>
                <p>{content}</p>
                <br />
            </div>
            : ''
        })}
        <h2>MESSAGES FROM ME</h2>
        {user.messages.map(message => {
            const {fromUser, post, content, _id} = message
            return user.username === fromUser.username ?
            <div key={_id}>
                <h3>{post.title}</h3>
                <p>{content}</p>
                <br />
            </div>
            : ''
        })}
    </>)

}

export default Profile;