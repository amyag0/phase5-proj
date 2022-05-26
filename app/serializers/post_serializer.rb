class PostSerializer < ActiveModel::Serializer
  attributes :id, :publisher, :publisher_id, :post_type, :title, :img_url, :content,  :likes, :users_who_saved
  has_many :comments
  #has_many :post_likes

  def likes 
    object.post_likes.length()
  end

  def publisher
    object.user.username
  end

  def publisher_id
    object.user.id
  end

  def users_who_saved
    array_of_users_who_saved=[]

    object.saved_posts.each do |each_saved_post|
      each_save_user_item = {
        save_id: each_saved_post.id,
        user_id: each_saved_post.user.id
      }
      array_of_users_who_saved<<each_save_user_item
    end
    array_of_users_who_saved
  end


  # array_of_liked_posts = []
  # object.post_likes.each do |each_post_like|
  #   each_like_item = {
  #     like_id: each_post_like.id,
  #     post: each_post_like.post, 
  #     post_id:each_post_like.post.id
  #   }
  #   array_of_liked_posts<<each_like_item
  # end
  # array_of_liked_posts 


end
