import React from 'react';

const EditPost = ({token, post, setPost, title, setTitle, description, setDescription, price, setPrice, location, setLocation, willDeliver, setWillDeliver}) => {
    const [editMessage, setEditMessage] = React.useState('')
    // const {_id, title, description, price, author, location, isAuthor} = post
    console.log('post: ', post)
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch(`https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT/posts/${post._id}`, {
            method: 'PATCH',
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
        console.log(data)
        setPost(data)
        setTitle('')
        setDescription('')
        setPrice('')
        setLocation('')
        setWillDeliver('')
        setEditMessage(data.success ? 'Your post has been updated.' : 'Oh no... An error occurred.')
    }

    return (<div className='post-form'>
        <h2>EDIT AN EXISTING POST</h2>
        {!editMessage ? 
        <>
        <form onSubmit={handleSubmit}>
            <div>
                <div>Title</div>
                <input required type='text' value={post.title} onChange={event => setTitle(event.target.value)}></input>
            </div>
            <div>
                <div>Description</div>
                <div><textarea required value={post.description} onChange={event => setDescription(event.target.value)} ></textarea></div>
            </div>
            <div>
                <div>Price</div>
                <input required type='text' value={post.price} onChange={event => setPrice(event.target.value)}></input>
            </div>
            <div>
                <div>Location</div>
                <input type='text' value={post.location} onChange={event => setLocation(event.target.value)}></input>
            </div>
            <div>
                <div>Willing to Deliver? <input className='post-form-checkbox' type='checkbox' value={post.willDeliver} onChange={event => setWillDeliver(!willDeliver)}></input></div>
            </div>
            <button type='submit'>EDIT POST</button>
        </form>
        </> 
        : <div className='post-success'>{editMessage}</div>}
    </div>)
}

export default EditPost;