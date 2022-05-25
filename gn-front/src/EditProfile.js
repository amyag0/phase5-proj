import React from 'react'
import { useState} from 'react'

function EditProfile({loggedInUser, setLoggedInUser}) {
    
    const [userInfoToEdit, setUserInfoToEdit]= useState({})
    const handleEditOnChange=(synthEvent)=>{setUserInfoToEdit({...userInfoToEdit, [synthEvent.target.name]: synthEvent.target.value})}
    
    const handleEditSubmit=(synthEvent)=>{
        synthEvent.preventDefault()
        
        fetch(`/users/${loggedInUser.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userInfoToEdit)
        })
        .then(response=>response.json())
        .then(editedUser=>{
            setLoggedInUser(editedUser)
        })
    }


    return (
        <div>
            <form
            id="edit-form"
            onSubmit={handleEditSubmit}
            >

            <span>Name:</span>
                <input 
                    className='sign-up-input'
                    onChange={handleEditOnChange}
                    name="name"
                />
            <br/>

            <span>Username:</span>
                <input 
                    className='sign-up-input'
                    onChange={handleEditOnChange}
                    name="username"
                />
            <br/>

            <span>Email:</span>
                <input 
                    className='sign-up-input'
                    onChange={handleEditOnChange}
                    name="email"
                />
            <br/>

            <span>Password:</span>
                <input 
                    className='sign-up-input'
                    type="password" 
                    onChange={handleEditOnChange}
                    name="password"
                />
            <br/>

            <span>Bio:</span>
                <input 
                    className='sign-up-input'
                    onChange={handleEditOnChange}
                    name="bio"
                />
            <br/>

            <button>Save Edits</button>

            </form>
        </div>
    )
}

export default EditProfile