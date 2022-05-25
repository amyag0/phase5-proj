class SavedPostSerializer < ActiveModel::Serializer
  attributes :id, :post_id, :publisher, :publisher_id, :post_type, :title, :img_url, :content,  :likes
  has_one :post, serializer: PostSerializer
  # has_many :comments
  # attributes :id, :post_id
  # , :publisher
  # # , :publisher_id, :post_type, :title, :img_url, :content,  :likes
  # #has_one :post

  # def publisher
  #   object.post.user_id
  # end

  def likes 
    object.post.post_likes.length()
  end

  def publisher
    object.post.user.username
  end

  def publisher_id
    object.post.user.id
  end

  def post_type
    object.post.post_type
  end

  def title
    object.post.title
  end

  def img_url
    object.post.img_url
  end

  def content
    object.post.content
  end

  


  

end
