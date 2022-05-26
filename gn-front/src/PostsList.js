import React from 'react'
import {useEffect, useState} from 'react'
import PageFilter from './PageFilter'
import Post from './Post'
import {Link} from 'react-router-dom'


function PostsList({savedPosts, setSavedPosts, likeInstances, setLikeInstances, loggedInUser, loggedInUserId}) {
    
    const [allPosts, setAllPosts]= useState([])
    const [postsFromFilter, setPostsFromFilter]=useState([])
    
    useEffect(()=>{
        fetch("/posts")
        .then(response=>response.json())
        .then(postsFromFetch=>{
            setAllPosts(postsFromFetch)
            setPostsFromFilter(postsFromFetch)
        })
    }, [])
    
    //const [filterType, setFilterType]= useState("all")
    function filterActions(synthEvent){
        if(synthEvent.target.value==="announcement"){
            const filterOfPosts = allPosts.filter ( (postItem)=>{
                return postItem.post_type.includes("announcement")
                }
            )
            const arrayOfAnnouncements = filterOfPosts;
            setPostsFromFilter(arrayOfAnnouncements)

        }else if(synthEvent.target.value==="barter"){
            const filterOfPosts = allPosts.filter ( (postItem)=>{
                return postItem.post_type.includes("barter")
                }
            )
            const arrayOfBarters = filterOfPosts;
            setPostsFromFilter(arrayOfBarters)

        }else if(synthEvent.target.value==="giveaway"){
            const filterOfPosts = allPosts.filter ( (postItem)=>{
                return postItem.post_type.includes("giveaway")
                }
            )
            const arrayOfGiveAways = filterOfPosts;
            setPostsFromFilter(arrayOfGiveAways)

        }else if(synthEvent.target.value==="sale"){
            const filterOfPosts = allPosts.filter ( (postItem)=>{
                return postItem.post_type.includes("sale")
                }
            )
            const arrayOfSales = filterOfPosts;
            setPostsFromFilter(arrayOfSales)

        }else if(synthEvent.target.value==="tip"){
            const filterOfPosts = allPosts.filter ( (postItem)=>{
                return postItem.post_type.includes("tip")
                }
            )
            const arrayOfTips = filterOfPosts;
            setPostsFromFilter(arrayOfTips)
        }else if(synthEvent.target.value==="all"){
            // const arrayOfAllPosts = [...allPosts]
            setPostsFromFilter(allPosts)
        }
    }
    
    const mappingOfOurPosts = postsFromFilter.map((eachPost)=>{
        //console.log(eachPost)
        if(eachPost.publisher_id==loggedInUser.id){
            
            return(
                <div key={eachPost.id} className="post-mapped-from-list">
                    <Post
                    key={eachPost.id}
                    eachPost={eachPost}
                    likeInstances={likeInstances}
                    setLikeInstances={setLikeInstances}
                    loggedInUserId={loggedInUserId}
                    savedPosts={savedPosts}
                    setSavedPosts={setSavedPosts}

                    />
                    <Link to={`/profile/post-edit/${eachPost.id}`}><button>Edit</button></Link>
                </div>
            )
        }else{
    
            return(
                <Post
                key={eachPost.id}
                eachPost={eachPost}
                likeInstances={likeInstances}
                setLikeInstances={setLikeInstances}
                savedPosts={savedPosts}
                setSavedPosts={setSavedPosts}
                loggedInUserId={loggedInUserId}
                />
            )
        }        
    })
    
    
    return (
        <div className='post-list'>
            
            <PageFilter
                //setFilterType={setFilterType}
                filterActions={filterActions}
            />

            {mappingOfOurPosts}
        </div>
    )
}

export default PostsList;