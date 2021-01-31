import React from 'react';

const PostForm = ({token}) => {
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [price, setPrice] = React.useState('')
    const [location, setLocation] = React.useState('')
    const [willDeliver, setWillDeliver] = React.useState(false)

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
        setTitle('')
        setDescription('')
        setPrice('')
        setLocation('')
        setWillDeliver('')
    }
    
    return (<>
        <h2>CREATE A NEW POST</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <div>Title</div>
                <input required type='text' value={title} onChange={event => setTitle(event.target.value)}></input>
            </div>
            <div>
                <div>Description</div>
                <input required type='text' value={description} onChange={event => setDescription(event.target.value)}></input>
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
                <div>Willing to Deliver? <input type='checkbox' value={willDeliver} onChange={event => setWillDeliver(!willDeliver)}></input></div>
            </div>
            <button type='submit'>Add New Post</button>
        </form>
    </>)
}

export default PostForm;