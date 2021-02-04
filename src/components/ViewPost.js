import React from 'react';
import {Link, Redirect} from 'react-router-dom';

const ViewPost = ({post, token, setTitle, setDescription, setPrice, setLocation, setWillDeliver}) => {
    const [deleteMessage, setDeleteMessage] = React.useState('')
    const {_id, title, description, price, author, location, isAuthor, willDeliver} = post

    const handleDelete = async (event) => {
        event.preventDefault();

        const response = await fetch(`https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT/posts/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json()
        setDeleteMessage( data.success ? 'This post has been removed.' : 'Oh no... An error occurred.')
    }

    const handleClick = () => {
        setTitle(title)
        setDescription(description)
        setPrice(price)
        setLocation(location)
        setWillDeliver(willDeliver)
    }

    if (token) {
        return (<div className='view-post'>
            <h2>VIEW POST</h2>
                <>
                {!deleteMessage ? 
                    <div className='post' key={_id}>
                        <h3>{title.toUpperCase()}</h3>
                        <div className='view-post'>
                            <p>{description}</p>
                            <p><b>Price</b>: {price}</p>
                            <p><b>Seller: {author.username}</b></p>
                            <p><b>Location</b>: {location}</p>
                            <br/>
                            {token && isAuthor ? <Link to='/editpost'><button onClick={handleClick}>EDIT</button></Link> : ''}
                            {token && isAuthor ? <button id='danger-button' onClick={handleDelete}>DELETE</button> : ''}
                        </div>
                </div>
                : <div className='delete-message'>{deleteMessage}</div>}
            </>
        </div>)
    } else {
        return <Redirect to='/' />
    }
}

export default ViewPost;