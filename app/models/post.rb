class Post < ApplicationRecord
  belongs_to :user
  has_many :saved_posts,dependent: :destroy
  has_many :post_likes,dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :comment_likes, through: :comments, dependent: :destroy
end
