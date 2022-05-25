class PostSerializer < ActiveModel::Serializer
  attributes :id, :publisher, :publisher_id, :post_type, :title, :img_url, :content,  :likes
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


end
