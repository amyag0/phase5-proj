import React from 'react'
import Post from './Post'
import {useState} from 'react'

function SavedPosts({savedPosts, loggedInUser}) {
    console.log("Inside Saved post", savedPosts)
    // console.log(" post", savedPosts.post)
   // const [theSavedPostToPost, setSavedPostToPost]= useState({})


    const mappingOfSavedPosts = savedPosts.map((eachSaved)=>{
        console.log(eachSaved.post)
        console.log(eachSaved.post.id)
        //setSavedPostToPost(eachSaved.post)
        return(
            <Post
                key={eachSaved.post.id}
                eachPost={eachSaved.post}
            />
        
        )

    })

    return (
        <div>
            <h3>{loggedInUser.name}'s Saved Posts below!</h3>
            {mappingOfSavedPosts}
        </div>
    )
}

export default SavedPosts