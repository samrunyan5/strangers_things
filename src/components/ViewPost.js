import React from 'react';

const ViewPost = ({post, token, accountFormStatus, setAccountFormStatus}) => {
    const {_id, title, description, price, author, location, isAuthor} = post

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
        setAccountFormStatus('This post has been removed.')
    }

    return (<>
        <div className='view-post' key={_id}>
            {!accountFormStatus ? 
            <>
                <h3>{title}</h3>
                <p>{description}</p>
                <p>Price: {price}</p>
                <p>Seller: {author.username}</p>
                <p>Location: {location}</p>
                <br/>
                {token && isAuthor ? <button>Edit</button> : ''}
                {token && isAuthor ? <button onClick={handleDelete}>Delete</button> : ''}
            </>
            : ''}
        </div>
    </>)
}

export default ViewPost;