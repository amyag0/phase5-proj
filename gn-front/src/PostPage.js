import React from 'react'
import { useState, useEffect } from 'react'
import {useParams, Outlet, Link} from 'react-router-dom'

function PostPage({loggedInUser, savedPosts, setSavedPosts, likeInstances, setLikeInstances, loggedInUserId}) {
  const { post_id } = useParams()

  const [thePost, setThePost] = useState({})
  const [usersWhoSaved, setUsersWhoSaved] = useState([])
  const [usersWhoLiked, setUsersWhoLiked] = useState([])
  const [comments, setComments] = useState([])
  const [postLiked, setPostLiked]=useState(false)
  const [postSavedByUser, setPostSavedByUser]=useState(false)

  useEffect(()=>{
    fetch(`/posts/${post_id}`)
    .then(response=>response.json())
    .then(thePostViewing=>{
    console.log(thePostViewing)
      setThePost(thePostViewing)
      setComments(thePostViewing.comments)
      setUsersWhoSaved(thePostViewing.users_who_saved)
      setUsersWhoLiked(thePostViewing.users_who_liked)
      if(thePostViewing.users_who_saved.length>=1 ){
        thePostViewing.users_who_saved.map((eachUser)=>{
          if(eachUser.user_id==loggedInUserId){
            setPostSavedByUser(true)
          }
        })
      }
      if(thePostViewing.users_who_liked.length>=1 ){
        thePostViewing.users_who_liked.map((eachLikeFromFetch)=>{
          console.log("each like of this specific post",thePostViewing.users_who_liked)
          console.log("their id",eachLikeFromFetch.user_id)
          if(eachLikeFromFetch.user_id==loggedInUserId){
            setPostLiked(true)
          }
        })
      }

    })

  }, [])
  console.log("Users who liked this post:", usersWhoLiked)


  const onPostSave=(synthEvent)=>{
    fetch(`/saved_posts`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({post_id: thePost.id})
        }
    )
    .then(response=>response.json())
    .then(theSaveInstance=>{
        console.log("afterfetchfromclick:",theSaveInstance)
        setPostSavedByUser(true)
        fetch(`/user/${loggedInUser.id}/saved`)
        .then(response=>response.json())
        .then(response=>{
          console.log("response",response)
          if(!response.error){
            setSavedPosts(response)
          }
        }
      )
        
    }
    )
  }

  const onPostUnSave=(synthEvent)=>{
    console.log(synthEvent.target.value)
    fetch(`/saved_posts/${synthEvent.target.value}`, {method:'DELETE'})
    .then(response=>response.json())
    .then(message=>{
      console.log(message)
      setPostSavedByUser(false)
      fetch(`/user/${loggedInUser.id}/saved`)
      .then(response=>response.json())
      .then(response=>{
        console.log("response",response)
        if(!response.error){
        setSavedPosts(response)
        }
      })
    })
  }

  const onPostLike=(synthEvent)=>{
    synthEvent.preventDefault()
    setPostLiked(true)
    fetch(` /post_likes`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({post_id:thePost.id})
        }
    )
    .then(response=>response.json())
    .then(theLikeInstance=>{
        console.log("afterfetchfromclick:",theLikeInstance)
        //setPostSaved(true)
        fetch(`/user/${loggedInUserId}/liked`)
        .then(response=>response.json())
        .then(response=>{
        console.log("response",response)
            if(!response.error){
                setLikeInstances(response)
              }
        })
    })
  }

  const onPostUnLike=(synthEvent)=>{
    synthEvent.preventDefault()
    setPostLiked(false)
    console.log(synthEvent.target.value)
    const theIdWeFetch = synthEvent.target.value
    fetch(`/post_likes/${theIdWeFetch}`, {method:'DELETE'})
    .then(response=>response.json())
    .then(message=>{
        console.log(message)
        //setPostSaved(false)
        fetch(`/user/${loggedInUserId}/liked`)
        .then(response=>response.json())
        .then(response=>{
        console.log("response",response)
            if(!response.error){
                setLikeInstances(response)
                }
            }
        )
    })
  }


  const mappingOfComments = comments.map((eachComment)=>{
    if(eachComment.commenter_id==loggedInUser.id){
      //console.log("belongs to logged in user")
      return(
        <div key={eachComment.id}>
          <p>{eachComment.commenter}</p>
          <p>{eachComment.comment_content}</p>
          <button>delete comment</button>
        </div>
      )
    }else{
      return(
        <div key={eachComment.id}>
          <p>{eachComment.commenter}</p>
          <p>{eachComment.comment_content}</p>
          <button>like comment</button>
        </div>
      )
    }
  })

  const [commentToPost, setTheCommentToPost] = useState("")
  const handleNewCommentChange=(synthEvent)=>{
    setTheCommentToPost(synthEvent.target.value)
  }

  const handleNewCommentSubmit=(synthEvent)=>{
    synthEvent.preventDefault()
    fetch(`/comments`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({post_id:thePost.id, comment_content:commentToPost})
      }
    )
    .then(response=>response.json())
    .then(postedComment=>{
        console.log(postedComment)
        fetch(`/posts/${thePost.id}`)
        .then(response=>response.json())
        .then(thePostViewing=>{
          console.log(thePostViewing)
          setThePost(thePostViewing)
          setComments(thePostViewing.comments)
        })
      }
    )
  }




  return (
    <div>

      {
      
        postSavedByUser===true
      ?


        usersWhoSaved.map((eachUser)=>{
        if(eachUser.user_id==loggedInUser.id){
          return(
            <button onClick={onPostUnSave} value={eachUser.save_id} key={eachUser.save_id}> ★ </button>
          )}
        })
      

      :

        <button onClick={onPostSave} > ☆ </button>
      }

      <h4>{thePost.title}</h4>
      <br/>
            
      <span>Type:{thePost.post_type}</span>
      <br/>
      <span>{thePost.likes} likes</span>
      

      {
        postLiked==true
      ?

        usersWhoLiked.map((thePostLike)=>{
          console.log(thePostLike.like_id)
          if(thePostLike.user_id===loggedInUserId){
            return(
              <button onClick={onPostUnLike} value={thePostLike.like_id}> 💚 </button>
            )
          }
        })

      :

        <button onClick={onPostLike}> 🤍 </button>
      }

      <img src={thePost.img_url} alt=""/>
      <p>{thePost.content}</p>
      <p>published by: {thePost.publisher}</p>
      <br/>

      <h4>comments:</h4>
    
      {
        comments.length==0
      ?
        <><p>Be the first to comment!</p></>
      :
        mappingOfComments
      }

      <form onSubmit={handleNewCommentSubmit}>
        <input 
          className='comment-input'
          onChange={handleNewCommentChange}
        />
        <button>Comment</button>
      </form>

    </div>
  )
}

export default PostPage