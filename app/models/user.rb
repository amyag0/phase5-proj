class User < ApplicationRecord
    has_secure_password
    has_many :posts, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :saved_posts, dependent: :destroy
    has_many :post_likes, dependent: :destroy
    has_many :comment_likes, dependent: :destroy
    
end
