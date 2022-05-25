import React from 'react'
import {useParams, Outlet, Link} from 'react-router-dom'
import {useEffect, useState} from 'react'

function EditPost({setPublishedPosts}) {
    const { id } = useParams()

    const [thePostToEdit, setThePostToEdit] = useState({})
    useEffect(()=>{
        fetch(`/posts/${id}`)
        .then(response=>response.json())
        .then(thePostViewing=>{
        setThePostToEdit(thePostViewing)
        })
    }, [])

    const [editedPost, setTheEditedPost] = useState({})
    const handleEditPostChange=(synthEvent)=>{
        setTheEditedPost({...editedPost, [synthEvent.target.name]: synthEvent.target.value})
    }
    console.log(editedPost)

    const handleEditPostSubmit=(synthEvent)=>{
        synthEvent.preventDefault()
        
        fetch(`/posts/${id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(editedPost)
        })
        .then(response=>response.json())
        .then(editedPost=>{
            setThePostToEdit(editedPost)

            fetch("/userInSession")
            .then(response=>response.json())
            .then(userAlreadyLoggedIn=>{
                setPublishedPosts(userAlreadyLoggedIn.published)
    
            })
        })
    }

  return (
    <div>
        <h4>{thePostToEdit.title}</h4>
        <br/>
        <span>Type:{thePostToEdit.post_type}</span>
        <br/>
        <img src={thePostToEdit.img_url} alt={thePostToEdit.title}/>
        <br/>
        <p>{thePostToEdit.content}</p>

        <h3>Make changes below!</h3>
        
            <div className='edit-post-form'>
                <form 
                    onSubmit={handleEditPostSubmit}

                >

                    <span>Title</span>
                    <input 
                    className='edit-post-input'
                    onChange={handleEditPostChange}
                    name="title"
                    //placeholder={thePostToEdit.title}
                    />
                <br/>
                    <span>Content</span>
                    <input 
                    className='edit-post-input'
                    onChange={handleEditPostChange}
                    name="content"
                    //placeholder={thePostToEdit.content}
                    />
                <br/>
                    <span>Img Url</span>
                    <input 
                    className='edit-post-input'
                    onChange={handleEditPostChange}
                    name="img_url"
                    //placeholder={thePostToEdit.content}
                    />
                <br/>
                    <span>Post type</span>
                    <select 
                    name="post_type"
                    onChange={handleEditPostChange}
                    
                    >
                    <option value="announcement">Announcement</option>
                    <option value="barter">Barter</option>
                    <option value="giveaway">Give Away</option>
                    <option value="sale">Sale</option>
                    <option value="tip">Tip</option>
                    </select>
                <br/>
                    <button type="submit">edit Post!</button>
                </form>
            </div>
    </div>

  )
}

export default EditPost