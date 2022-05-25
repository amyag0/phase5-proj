import React from 'react'
import EditProfile from './EditProfile'
import {Link} from 'react-router-dom'
import {useEffect} from 'react'

function UsersPage({loggedInUser, setLoggedInUser, publishedPosts, setPublishedPosts}) {

    useEffect(()=>{
        fetch("/userInSession")
        .then(response=>response.json())
        .then(userAlreadyLoggedIn=>{
        setPublishedPosts(userAlreadyLoggedIn.published)
        })
    }, [])


    const onDeleteClick=(synthEvent)=>{
        console.log(synthEvent.target.value)
        fetch(`/posts/${synthEvent.target.value}`, {method:'DELETE'})
        .then(response=>response.json())
        .then(message=>{
            console.log(message)
            fetch("/userInSession")
            .then(response=>response.json())
            .then(userAlreadyLoggedIn=>{
                setPublishedPosts(userAlreadyLoggedIn.published)
            })
        })
    }

    const mappingPublishedPosts = publishedPosts.map((eachPost)=>{
        console.log(eachPost.id)
        return(
            <div key={eachPost.id} className='published-post-div'>
                <h3>{eachPost.title}</h3>
                <Link to={`/profile/post-edit/${eachPost.id}`}><button>Edit</button></Link>
                <button value={eachPost.id} onClick={onDeleteClick}>delete </button>
            </div>
        )
    })

    return (
        <div id= 'the-users-page'>

            <Link to={`/profile/edit`}><button>Edit Account Info!!</button></Link>

            {mappingPublishedPosts}

        </div>
    )
}

export default UsersPage