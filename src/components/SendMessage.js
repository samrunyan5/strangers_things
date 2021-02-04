import React from 'react';
import {Redirect} from 'react-router-dom';

const SendMessage = ({post, token}) => {
    const [content, setContent] = React.useState('')
    const [sentMessage, setSentMessage] = React.useState('')
    const {_id, title, description, price, author, location} = post

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const response = await fetch(`https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT/posts/${_id}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                message: {
                    content
                }
            })
        })
        const data = await response.json()
        setContent('')
        setSentMessage(data.success ? <div>Your message has been sent!</div> : <div>Oh no... An error occurred.</div>)
    }

    if (token) {
        return (<>
            <h2 className='message-heading'>SEND A MESSAGE</h2>

                {!sentMessage ? 
                <>
                <div className='post' key={_id}>
                <form onSubmit={handleSubmit}>
                    <h3>{title.toUpperCase()}</h3>
                    <div className='view-post'>
                        <p>{description}</p>
                        <p><b>Price</b>: {price}</p>
                        <p><b>Seller: {author.username}</b></p>
                        <p><b>Location</b>: {location}</p>
                        <br/>
                        <>{sentMessage}</>
                        <h3>Message {author.username} about this Post</h3>
                        <div><textarea required value={content} onChange={event => setContent(event.target.value)} ></textarea></div>
                        <button type='submit'>SEND MESSAGE</button>
                    </div>
                </form>
                </div>
                </>
                : <div className='message-success'>{sentMessage}</div>}
        </>)
    } else {
        return <Redirect to='/' />
    }
}

export default SendMessage;