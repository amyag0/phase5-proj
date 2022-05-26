class SavedPost < ApplicationRecord
  belongs_to :user
  belongs_to :post
  # validates_uniqueness_of :post, scope: :
  # has_many :comments, dependent: :destroy
end
