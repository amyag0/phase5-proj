class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment_content, :commenter, :commenter_id


  def commenter
    object.user.username
  end

  def commenter_id
    object.user.id
  end


  
end
