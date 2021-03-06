import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';

const PostForm = ({token, title, setTitle, description, setDescription, price, setPrice, location, setLocation, willDeliver, setWillDeliver }) => {
    const [postMessage, setPostMessage] = useState('')

    useEffect(() => {
        setTitle('')
        setDescription('')
        setPrice('')
        setLocation('')
        setWillDeliver(false)
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()

        const response = await fetch(`https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                post: {
                    title,
                    description,
                    price,
                    location,
                    willDeliver
                }
            })
        })
        const data = await response.json()
        setPostMessage(data.success ? 'Your post has been added.' : 'Oh no... An error occurred.')
    }

    if (token) {
        return (<div className='post-form'>
            <h2>CREATE A NEW POST</h2>
            {!postMessage ? 
            <>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>Title</div>
                    <input required type='text' value={title} onChange={event => setTitle(event.target.value)}></input>
                </div>
                <div>
                    <div>Description</div>
                    <div><textarea required value={description} onChange={event => setDescription(event.target.value)} ></textarea></div>
                </div>
                <div>
                    <div>Price</div>
                    <input required type='text' value={price} onChange={event => setPrice(event.target.value)}></input>
                </div>
                <div>
                    <div>Location</div>
                    <input type='text' value={location} onChange={event => setLocation(event.target.value)}></input>
                </div>
                <div>
                    <div>Willing to Deliver? <input className='post-form-checkbox' type='checkbox' value={willDeliver} onChange={event => setWillDeliver(!willDeliver)}></input></div>
                </div>
                <button type='submit'>ADD NEW POST</button>
            </form>
            </> 
            : <div className='post-success'>{postMessage}</div>}
        </div>)
    } else {
        return <Redirect to='/' />
    }
}

export default PostForm;