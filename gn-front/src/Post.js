import React from 'react'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

function Post({eachPost, savedPosts, setSavedPosts, likeInstances, setLikeInstances}) {

    
    
    const [postLiked, setPostLiked]=useState(false)
    const [postSaved, setPostSaved]=useState(false)

    useEffect(()=>{
        likeInstances.map((eachLikeInstance)=>{
            if(eachLikeInstance.post.id===eachPost.id){
                return(
                    setPostLiked(true)
                )
            }else{
                return(
                    setPostLiked(false)
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
        fetch(`/saved_posts`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({post_id:eachPost.id})
            }
        )
        .then(response=>response.json())
        .then(theSaveInstance=>{
            console.log(theSaveInstance)
            //setSavedPosts(...savedPosts, theSaveInstance)
            setPostSaved(true)
            
        }
        )
    }

    const onPostUnSave=(synthEvent)=>{
        //console.log(synthEvent.target.value)
        // fetch(`/saved_posts/${}`, {method:'DELETE'})
        // .then(response=>response.json())
        // .then(message=>{
        //     console.log(message)
        //     fetch("/userInSession")
        //     .then(response=>response.json())
        //     .then(userAlreadyLoggedIn=>{
        //         setPublishedPosts(userAlreadyLoggedIn.published)
        //     })
        // })
    }



    
    return (
        <div className='post'>
            {
            postSaved===true?

            <button> ★ </button>

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