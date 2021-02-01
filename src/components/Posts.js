import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route, Link, useHistory} from 'react-router-dom';

const Posts = ({token, postList, setPostList, setPost}) => {
    const history = useHistory()

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

    return (<>
        <h2>POSTS</h2>
        <form>
            <div>Search: <input type='text' ></input></div>
        </form>
        {postList.map(post => {
            const {_id, title, description, price, author, location, isAuthor} = post

            return <div className='post' key={_id}>
                {/* {console.log('post: ', post)} */}
                <h3>{title}</h3>
                <p>{description}</p>
                <p>Price: {price}</p>
                <p>Seller: {author.username}</p>
                <p>Location: {location}</p>
                {token && !isAuthor ? <Link to='/sendmessage'><button onClick={() => setPost(post)}>Send Message</button></Link> : ''}
                {token && isAuthor ? <Link to='/viewpost'><button onClick={() => setPost(post)}>View</button></Link> : ''}
            </div>
        })}
    </>)
}

export default Posts;