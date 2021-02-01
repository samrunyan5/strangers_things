import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';

const Posts = ({token, setPost}) => {
    const [postList, setPostList] = React.useState([])
    const [searchTerm, setSearchTerm] = React.useState('')

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

    const postMatches = (post, text) => {
        if (post.title.includes(text) || post.description.includes(text)) {
            console.log('searchterm: ', searchTerm)
            return true
        }
    }

    const filteredPosts = postList.filter(post => {
        postMatches(post, searchTerm)
    })
    const postsToDisplay = searchTerm ? filteredPosts : postList

    return (<>
        <h2>POSTS</h2>
        <form onSubmit={async (event) => {
            event.preventDefault();

        }}>
            <div>Search: <input type='text' value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} ></input></div>
        </form>
        {postsToDisplay.map(post => {
            const {_id, title, description, price, author, location, isAuthor} = post

            return <div className='post' key={_id}>
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