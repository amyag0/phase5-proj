class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :email, :bio, :published, :liked_posts, :saved_for_later

  def published
    array_of_published_posts=[]
    object.posts.each do |each_post|
      each_post_item={
        post_id: each_post.id,
        post: each_post
      }
      array_of_published_posts<<each_post
    end
    array_of_published_posts
    
  end

  def liked_posts
    array_of_liked_posts = []
    object.post_likes.each do |each_post_like|
      each_like_item = {
        like_id: each_post_like.id,
        post: each_post_like.post, 
        post_id:each_post_like.post.id
      }
      array_of_liked_posts<<each_like_item
    end
    array_of_liked_posts 
  end

  def saved_for_later
    array_of_saved_posts=[]

    object.saved_posts.each do |each_saved_post|
      each_saved_item ={
        save_id: each_saved_post.id,
        post:each_saved_post.post
      }

      array_of_saved_posts<<each_saved_item
    end
    array_of_saved_posts
  end


end
