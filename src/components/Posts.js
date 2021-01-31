import React, { useEffect } from 'react';

const Posts = ({setAccountFormStatus, token, postList, setPostList}) => {
    setAccountFormStatus('')

    useEffect(async () => {
        const response = await fetch(`https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT/posts`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const { data: {posts} } = await response.json()
        setPostList(posts)
    }, [])

    // const handleDelete = async (event) => {
    //     event.preventDefault();

    //     // const response = await fetch(``)
    // }

    // const handleView = (event) => {
    //     event.preventDefault();


    // }

    return (<>
        <h2>POSTS</h2>
        {postList.map(post => {
            const {_id, title, description, price, author, location, isAuthor} = post

            return <div className='post' key={_id}>
                {console.log('post: ', post)}
                <h3>{title}</h3>
                <p>{description}</p>
                <p>Price: {price}</p>
                <p>Seller: {author.username}</p>
                <p>Location: {location}</p>
                {token && !isAuthor ? <button>Send Message</button> : ''}
                {token && isAuthor ? <button>View</button> : ''}
                {token && isAuthor ? <button>Delete</button> : ''}
            </div>
        })}
    </>)
}

export default Posts;