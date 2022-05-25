class SavedPost < ApplicationRecord
  belongs_to :user
  belongs_to :post
  has_many :post_likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :comment_likes, through: :comments, dependent: :destroy
end
