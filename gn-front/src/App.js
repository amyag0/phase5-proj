
import './App.css';
import {BrowserRouter, Route, Routes,} from 'react-router-dom'
import {useEffect, useState} from 'react'


import PostsList from './PostsList';
import Menu from './Menu';
import CreatePost from './CreatePost';
import EntryWelcome from './EntryWelcome';
import SavedPosts from './SavedPosts';
import PostPage from './PostPage';
import EditProfile from './EditProfile';
import UsersPage from './UsersPage';
import EditPost from './EditPost';

function App() {

  const [loggedInUser, setLoggedInUser]=useState({})
  const [savedPosts, setSavedPosts]= useState([])
  const [publishedPosts, setPublishedPosts]= useState([])
  const [likeInstances, setLikeInstances]= useState([])
  console.log("User in Session:", loggedInUser)
  console.log("Users saved posts:", savedPosts)
  console.log("Users published posts:", publishedPosts)
  console.log("Users likes:", likeInstances)

  useEffect(()=>{
    fetch("/userInSession")
      .then(response=>response.json())
      .then(userAlreadyLoggedIn=>{
        console.log("user from useEffect",userAlreadyLoggedIn)
        if(userAlreadyLoggedIn){
          setLoggedInUser(userAlreadyLoggedIn)
          setPublishedPosts(userAlreadyLoggedIn.published)
          setLikeInstances(userAlreadyLoggedIn.liked_posts)
          fetch(`http://localhost:3000/user/${userAlreadyLoggedIn.id}/saved`)
            .then(response=>response.json())
            .then(response=>{
              console.log("response",response)
              if(!response.error){
                setSavedPosts(response)
              }
            }
          ) 
        }
      }
    )
  }, [])

  const [userToLogin, setUserToLoginInfo]=useState({
    username: "",
    password: "", 
  })
  const [userToSignUp, setUserToSignUpInfo]= useState({})

  const handleSignUpOnChange=(synthEvent)=>{setUserToSignUpInfo({...userToSignUp, [synthEvent.target.name]: synthEvent.target.value})}
  const handleLoginOnChange=(synthEvent)=>{setUserToLoginInfo({...userToLogin, [synthEvent.target.name]: synthEvent.target.value})}

  const handleLoginSubmit=(synthEvent)=>{
    synthEvent.preventDefault()
    fetch("/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(userToLogin)
      })
      .then(response=>response.json())
      .then(hopefullyAUser=>{
        setLoggedInUser(hopefullyAUser)
        setPublishedPosts(hopefullyAUser.published)
        setLikeInstances(hopefullyAUser.liked_posts)
          fetch(`/user/${hopefullyAUser.id}/saved`)
            .then(response=>response.json())
            .then(response=>{
              if(!response.error){
                setSavedPosts(response.post)
                
              }
            }
          )
        }
      )
  }

  const handleSignUpSubmit=(synthEvent)=>{
    synthEvent.preventDefault()
    fetch("/users", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(userToSignUp)
      }
    )
      .then(response=>response.json())
      .then(newUser=>{
        setLoggedInUser(newUser)
        }
      )
  }

  const handleLogOut=()=>{
    fetch("/logout", {method: "DELETE"})
    .then((nothing)=>{
      setLoggedInUser({})
      setSavedPosts([])
      setPublishedPosts([])
      setLikeInstances([])
    })
  }

  return (
    <div className="App">
      <header className="entire-page">
        

        {
          loggedInUser.name?

          <div id="user-logged-in">
            <BrowserRouter>

              <Menu
                handleLogOut={handleLogOut}
              />

              <Routes>

                <Route path="/" element={<EntryWelcome/>}/>
            
                <Route path="/new" element={<CreatePost/>}/>

                <Route path="/posts" element={
                  <PostsList
                  savedPosts={savedPosts}
                  setSavedPosts={setSavedPosts}
                  loggedInUser={loggedInUser}
                  likeInstances={likeInstances}
                  setLikeInstances={setLikeInstances}
                  loggedInUserId={loggedInUser.id}
                  />
                }/>

                <Route path="/posts/:post_id" element={
                  <PostPage
                    savedPosts={savedPosts}
                    setSavedPosts={setSavedPosts}
                    loggedInUser={loggedInUser}
                    likeInstances={likeInstances}
                    setLikeInstances={setLikeInstances}
                    loggedInUserId={loggedInUser.id}
                    savedPosts={savedPosts}
                    setSavedPosts={setSavedPosts}
                  />
                }/>

                <Route path="/saved-posts" element={
                  <SavedPosts
                    savedPosts={savedPosts}
                    setSavedPosts={setSavedPosts}
                    loggedInUser={loggedInUser}
                    likeInstances={likeInstances}
                    setLikeInstances={setLikeInstances}
                  />
                }/>

                <Route path="/profile" element={
                  <UsersPage
                  loggedInUser={loggedInUser}
                  setLoggedInUser={setLoggedInUser}
                  publishedPosts={publishedPosts}
                  setPublishedPosts={setPublishedPosts}
                  />
                }/>

                <Route path="/profile/edit" element={
                  <EditProfile
                    loggedInUser={loggedInUser}
                    setLoggedInUser={setLoggedInUser}
                    //setPublishedPosts={setPublishedPosts}
                  />
                }/>

                <Route path="/profile/post-edit/:id" element={
                  <EditPost
                    setPublishedPosts={setPublishedPosts}
                  />
                }/>

                {/* <Route path="/" element={}/> */}
                {/* route to saved posts, view users posts, edit posts,  */}

              </Routes>
          
            </BrowserRouter>
          </div>

        
        :
        <div id="no-user">
          <h4>Sign in:</h4>
          <form 
            id="sign-in-form"
            onSubmit={handleLoginSubmit}
          >
            <span>Username:</span>
            <input 
              className='sign-up-input'
              onChange={handleLoginOnChange}
              name="username"
            />
          <br/>
          <span>Password:</span>
            <input 
              className='sign-up-input'
              type="password" 
              onChange={handleLoginOnChange}
              name="password"
            />
          <br/>
            <button type="submit">Submit</button>
          </form>

          <h4>Or Sign Up!</h4>

          <form
            id="sign-up-form"
            onSubmit={handleSignUpSubmit}
          >

            <span>Name:</span>
            <input 
              className='sign-up-input'
              onChange={handleSignUpOnChange}
              name="name"
            />
          <br/>

            <span>Username:</span>
            <input 
              className='sign-up-input'
              onChange={handleSignUpOnChange}
              name="username"
            />
          <br/>

            <span>Email:</span>
            <input 
              className='sign-up-input'
              onChange={handleSignUpOnChange}
              name="email"
            />
          <br/>

            <span>Password:</span>
            <input 
              className='sign-up-input'
              type="password" 
              onChange={handleSignUpOnChange}
              name="password"
            />
          <br/>

            <span>Bio:</span>
            <input 
              className='sign-up-input'
              onChange={handleSignUpOnChange}
              name="bio"
            />
          <br/>

            <button>Join The Neighborhood!</button>

          </form>

        </div>

        }

      </header>
    </div>
  );
}

export default App;
