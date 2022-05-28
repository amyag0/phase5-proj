class PostLikeSerializer < ActiveModel::Serializer
  attributes :id, :post_id, :user_id
  has_one :post, serializer: PostSerializer

  def post_id
    object.post.id
  end

  def user_id
    object.user.id
  end

end
