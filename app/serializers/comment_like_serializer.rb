class CommentLikeSerializer < ActiveModel::Serializer
  attributes :id, :user_id
  has_one :user
  has_one :comment
  def user_id
    object.user.id
  end
end
