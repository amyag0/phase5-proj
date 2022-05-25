import React from 'react'
import {Link} from 'react-router-dom'

function Menu({handleLogOut}) {
  return (
    <div id="menu">
        <div className='menu-button'><Link to="/">Home</Link></div>
            
        <div className='menu-button'><Link to="/posts">Posts</Link></div>
            
        <div className='menu-button'><Link to="/new">Create New Post</Link></div>
        <div className='menu-button'><Link to="/saved-posts">View Saved Posts</Link></div>
        <div className='menu-button'><Link to="/profile">UserHome</Link></div>

        <button className='menu-button' onClick={handleLogOut}><Link to="/">Logout</Link></button>
    </div>

  )
}

export default Menu