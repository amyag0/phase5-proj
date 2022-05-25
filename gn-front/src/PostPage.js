import React from 'react'
import { useState, useEffect } from 'react'
import {useParams, Outlet, Link} from 'react-router-dom'

function PostPage({loggedInUser}) {

  const { id } = useParams()

  const [thePost, setThePost] = useState({})
  const [comments, setComments] = useState([])

  useEffect(()=>{
    fetch(`/posts/${id}`)
    .then(response=>response.json())
    .then(thePostViewing=>{
    //console.log(thePostViewing)
      setThePost(thePostViewing)
      setComments(thePostViewing.comments)
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


  return (
    <div>

      <h4>{thePost.title}</h4>
      <br/>
            
      <span>Type:{thePost.post_type}</span>
      <br/>
      <span>{thePost.likes} likes</span>



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