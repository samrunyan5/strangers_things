import React from 'react';

const ViewPost = ({post, token}) => {
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
        console.log(data)
        alert('are you super sure?')
    }

    return (<>
        <div className='post' key={_id}>
            <h3>{title}</h3>
            <p>{description}</p>
            <p>Price: {price}</p>
            <p>Seller: {author.username}</p>
            <p>Location: {location}</p>
            <br/>
            {token && isAuthor ? <button>Edit</button> : ''}
            {token && isAuthor ? <button onClick={handleDelete}>Delete</button> : ''}
        </div>
    </>)
}

export default ViewPost;