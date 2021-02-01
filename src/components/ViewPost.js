import React from 'react';

const ViewPost = ({post, token}) => {
    const [deleteMessage, setDeleteMessage] = React.useState('')
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
        setDeleteMessage( data.success ? 'This post has been removed.' : 'Oh no... An error occurred.')
    }

    return (<>
        <div className='view-post' key={_id}>
            {!deleteMessage ? 
            <>
                <h2>VIEW POST</h2>
                <h3>{title}</h3>
                <p>{description}</p>
                <p>Price: {price}</p>
                <p>Seller: {author.username}</p>
                <p>Location: {location}</p>
                <br/>
                {token && isAuthor ? <button>Edit</button> : ''}
                {token && isAuthor ? <button onClick={handleDelete}>Delete</button> : ''}
            </>
            : <div>{deleteMessage}</div>}
        </div>
    </>)
}

export default ViewPost;