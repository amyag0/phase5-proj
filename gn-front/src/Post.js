import React from 'react'
import {useEffect, useState} from 'react'
import {Link, Outlet} from 'react-router-dom'
import PostPage from './PostPage'

import {BrowserRouter, Route, Routes,} from 'react-router-dom'

function Post({eachPost, savedPosts, setSavedPosts, likeInstances, setLikeInstances, loggedInUserId}) {

    const [postLiked, setPostLiked]=useState(false)
    const [postSaved, setPostSaved]=useState(false)

    useEffect(()=>{
        likeInstances.map((eachLikeInstance)=>{
            if(eachLikeInstance.post.id===eachPost.id){
                return(
                    setPostLiked(true)
                )
            }
        })

        savedPosts.map((eachSavedPost)=>{
            if(eachSavedPost.post_id===eachPost.id){
                return(
                    setPostSaved(true)
                )
            }
        })
    }, [])
    
    


    const onPostSave=(synthEvent)=>{
        setPostSaved(true)
        fetch(`/saved_posts`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({post_id:eachPost.id})
            }
        )
        .then(response=>response.json())
        .then(theSaveInstance=>{
            console.log("afterfetchfromclick:",theSaveInstance)
            //setPostSaved(true)
            fetch(`/user/${loggedInUserId}/saved`)
            .then(response=>response.json())
            .then(response=>{
            console.log("response",response)
                if(!response.error){
                    setSavedPosts(response)
                    }
                }
            )
        })
    }

    const onPostUnSave=(synthEvent)=>{
        setPostSaved(false)
        console.log(synthEvent.target.value)
        fetch(`/saved_posts/${synthEvent.target.value}`, {method:'DELETE'})
        .then(response=>response.json())
        .then(message=>{
            console.log(message)
            //setPostSaved(false)
            fetch(`/user/${loggedInUserId}/saved`)
            .then(response=>response.json())
            .then(response=>{
                console.log("response",response)
                if(!response.error){
                setSavedPosts(response)
                }
            })
        })
    }
    



    
    return (
        <div className='post'>


            {
                postSaved===true

            ?


                savedPosts.map((eachSavedPost)=>{
                    if(eachSavedPost.post_id===eachPost.id){
                        return(
                            <button onClick={onPostUnSave} value={eachSavedPost.id} key={eachSavedPost.id}> ★ </button>
                            
                        )
                    }
                })
            

            :

                <button onClick={onPostSave} > ☆ </button>
            }

            <h4>{eachPost.title}</h4>
            
            
            <span>{eachPost.post_type}</span>
            <br/>
            <span>{eachPost.likes} likes</span>


            {
            postLiked==true?

            <button> 💚 </button>

            :

            <button> 🤍 </button>
            }
            

            

            <img src={eachPost.img_url} alt=""/>
            <p>{eachPost.content.substring(0,75)}...</p>
            <p>published by: {eachPost.publisher}</p>
            <Link to={`/posts/${eachPost.id}`}><button>View post</button></Link>
        </div>
    )
}

export default Post