puts "XXX STARTING OLD SEED DESTROY XXX"
CommentLike.destroy_all
Comment.destroy_all
PostLike.destroy_all
SavedPost.destroy_all
Post.destroy_all
User.destroy_all

puts "XXX OLD SEEDS DESTROYED XXX"
puts "SEEDING CAN NOW BEGIN"

puts "Seeding Users..."
sam=User.create(
    name:"Sam",
    username:"Sambob",
    email: "sam@woobly.net",
    password:"123",
    bio:"This is Sam's Account!!!!"
)
amy=User.create(
    name:"Amy",
    username:"AmyYay",
    email: "amy@woobly.net",
    password:"123",
    bio:"This is Amy's Account!!!!"
)
sakinah=User.create(
    name:"Sakinah",
    username:"sankinahhh",
    email: "sakinah@woobly.net",
    password:"123",
    bio:"This is Sakinah's Account!!!!"
)
puts "Users seeded!!!!"

puts "Seeding Posts..."
ecobrick=Post.create(
    user:sam,
    title:"Recycling plastic?",
    content:"I have a bunch of plastic wrappers Ive been saving. Any one know anything about eco bricking and drop off locations? Would be greatly appreciated!!",
    img_url:"",
    post_type:"question"
)
nightstand=Post.create(
    user:sam,
    title:"Night stand!",
    content:"Good afternoon Green Neighborhood!! I have a night stand I was looking to rehome, anyone interested?",
    img_url:"",
    post_type:"giveaway"
)
mirror=Post.create(
    user:amy,
    title:"Refinished oak mirror with white detailing",
    content:"Hello neighbors! I found this mirror at a flea market, stripped, restained, and painted the detailing. Turns out it doesnt fit the dresser I was gonna mount it on sooo anyone up for a trade? Looking to start growing micro-greens at home so if anyone with a starter kit that is looking for a mirror, hit me up!",
    img_url:"",
    post_type:"barter"
)
compost=Post.create(
    user:amy,
    title:"NYC's composing initiative",
    content:"Guys!! If you havent heard, you can drop off food scraps at composting locations near you or you can sign up to have a composting bin in your community!!",
    img_url:"",
    post_type:"tip"
)
loveseats=Post.create(
    user:sakinah,
    title:"Matching loveseats",
    content:"Hi everyone! I have these two loveseats that I was hoping to refabric to match my new couch. I bought some fabric but it doesnt match the color Id like, anyone willing to make a trade? Either for the fabric or if you have two loveseats that would match the new couch, let me know!",
    img_url:"",
    post_type:"barter"
)
puts "Posts seeded!!!"

puts "Seeding Comments..."
amyloveseatcomment=Comment.create(
    user:amy,
    post:loveseats,
    comment_content:"Hi Sakinah! I have some fabric from a past project Ive been saving that would be a great match to your new couch! However, instead of trading for the material you have, can I borrow whatever tool youre using to secure the fabric? I have an ottomon Ive been wanting to reupholster but no staple gun!!",
)
samcompostcomment=Comment.create(
    user:sam,
    post:compost,
    comment_content:"Thank you so much for this information!! My family has been talking about how beneficial composting can be for the environment!"
)
puts "Comments seeded!!!"

puts "Seeding SavedPosts..."
SavedPost.create(
    user:sam,
    post:compost
)
SavedPost.create(
    user:amy,
    post:loveseats
)
SavedPost.create(
    user:amy,
    post:nightstand
)
puts "SavedPosts seeded!!!"

puts "Seeding PostLikes..."
PostLike.create(
    user:sam,
    post:compost
)
PostLike.create(
    user:sakinah,
    post:compost
)
PostLike.create(
    user:amy,
    post:loveseats
)
puts "PostLikes seeded!!!"

puts "Seeding CommentLikes..."
CommentLike.create(
    user: amy,
    comment: samcompostcomment
)
CommentLike.create(
    user: sakinah,
    comment: samcompostcomment
)
CommentLike.create(
    user: sakinah,
    comment: amyloveseatcomment
)
puts "CommentLikes seeded!!!"