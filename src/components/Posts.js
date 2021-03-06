import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

const Posts = ({token, setPost}) => {
    const [postList, setPostList] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

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

    const filteredPosts = postList.filter(post => {
        if (post.title.toLowerCase().includes(searchTerm) || post.description.toLowerCase().includes(searchTerm)) {
            return true
        }
    })
    const postsToDisplay = searchTerm ? filteredPosts : postList

    return (<div className='posts'>
        <h2>POSTS</h2>
        <form onSubmit={async (event) => event.preventDefault() }>
            <div><input type='text' placeholder='Search' value={searchTerm} onChange={(event) => setSearchTerm(event.target.value.toLowerCase())} ></input></div>
        </form>
        {postsToDisplay.map(post => {
            const {_id, title, description, price, author, location, isAuthor} = post

            return <div className='post' key={_id}>
                <h3>{title.toUpperCase()}</h3>
                <div className='view-post'>
                    <p>{description}</p>
                    <p><b>Price</b>: {price}</p>
                    <p><b>Seller: {author.username}</b></p>
                    <p><b>Location</b>: {location}</p>
                    {token && !isAuthor ? <Link to='/sendmessage'><button onClick={() => setPost(post)}>SEND MESSAGE</button></Link> : ''}
                    {token && isAuthor ? <Link to='/viewpost'><button onClick={() => setPost(post)}>VIEW</button></Link> : ''}
                </div>
            </div>
        })}
    </div>)
}

export default Posts;