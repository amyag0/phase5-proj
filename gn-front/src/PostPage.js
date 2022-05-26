import React from 'react'
import { useState, useEffect } from 'react'
import {useParams, Outlet, Link} from 'react-router-dom'

function PostPage({loggedInUser, savedPosts, setSavedPosts, likeInstances, setLikeInstances, loggedInUserId}) {
  // postSaved, setPostSaved, postLiked, setPostLiked

  const { post_id } = useParams()

  const [thePost, setThePost] = useState({})
  const [comments, setComments] = useState([])
  const [postLiked, setPostLiked]=useState(false)
  const [postSaved, setPostSaved]=useState(false)


  useEffect(()=>{
    fetch(`/posts/${post_id}`)
    .then(response=>response.json())
    .then(thePostViewing=>{
    //console.log(thePostViewing)
      setThePost(thePostViewing)
      setComments(thePostViewing.comments)
    })

          likeInstances.map((eachLikeInstance)=>{
            if(eachLikeInstance.post.id===thePost.id){
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
            if(eachSavedPost.post_id===thePost.id){
                return(
                    setPostSaved(true)
                    )
            }
        })


  }, [])
  console.log(comments)

  
  const mappingOfComments = comments.map((eachComment)=>{
    if(eachComment.commenter_id==loggedInUser.id){
      console.log("belongs to logged in user")
      return(
        <div key={eachComment.id}>
          <p>{eachComment.commenter_id}</p>
          <p>{eachComment.comment_content}</p>
          <button>delete comment</button>
        </div>
      )
    }else{
      return(
        <div key={eachComment.id}>
          <p>{eachComment.commenter_id}</p>
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
  //console.log(commentToPost)

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


  const onPostSave=(synthEvent)=>{
    fetch(`/saved_posts`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({post_id:thePost.id})
        }
    )
    .then(response=>response.json())
    .then(theSaveInstance=>{
        console.log("afterfetchfromclick:",theSaveInstance)
        setPostSaved(true)
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
        setPostSaved(false)
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


  return (
    <div>

        {
        postSaved===true?


        savedPosts.map((eachSavedPost)=>{
            if(eachSavedPost.post_id===thePost.id){
                return(
                    <button onClick={onPostUnSave} value={eachSavedPost.id} key={eachSavedPost.id}> ★ </button>
                    
                )
            }
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
        postLiked==true?

        <button> 💚 </button>

        :

        <button> 🤍 </button>
        }



      <button> heart </button>


      <img src={thePost.img_url} alt=""/>
      <p>{thePost.content}</p>
      <p>published by: {thePost.publisher}</p>
      <br/>

      <h4>comments:</h4>
      {/* {mappingOfComments()} */}


      {
        comments.length==0?
        <><p>Be the first to comment!</p></>
        :
        mappingOfComments

      }

      {/* { comments.map((eachComment)=>{
      console.log("inside map function",eachComment.comment_content)
      return(
        <p>{eachComment.comment_content}</p>
      )
    })} */}

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