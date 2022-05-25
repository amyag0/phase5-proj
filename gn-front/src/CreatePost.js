import React from 'react'
import {useEffect, useState} from 'react'

function CreatePost() {
  const [newPost, setNewPost]= useState({
    user_id:0,
    title:"",
    content:"",
    post_type:""
  })

  const handleNewPostChange=(synthEvent)=>{
    setNewPost({...newPost, [synthEvent.target.name]: synthEvent.target.value})
  }

  const handleNewPostSubmit=(synthEvent)=>{
    synthEvent.preventDefault();
    fetch("/posts", {
      method: "POST",
      headers:{"Content-Type":"Application/json",
    },
      body: JSON.stringify(newPost)
    })
    .then(response=>response.json())
    .then(theNewPost=>{
      console.log("newpost from fetch!!!!:", theNewPost)
    })
  }
  
  
  return (
    <div className='create-post-form'>
        <form 
          onSubmit={handleNewPostSubmit}

        >

          <span>Post title</span>
          <input 
            className='create-post-input'
            onChange={handleNewPostChange}
            name="title"
          />
        <br/>
          <span>Info</span>
          <input 
            className='create-post-input'
            onChange={handleNewPostChange}
            name="content"
          />
        <br/>
          <span>Post type</span>
          <select 
            name="post_type"
            onChange={handleNewPostChange}
          >
            <option value="announcement">Announcement</option>
            <option value="barter">Barter</option>
            <option value="giveaway">Give Away</option>
            <option value="sale">Sale</option>
            <option value="tip">Tip</option>
          </select>
        <br/>
          <button type="submit">Create Post!</button>
        </form>
    </div>
  )
}

export default CreatePost