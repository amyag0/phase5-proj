class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :title
      t.string :content
      t.string :img_url
      t.string :post_type

      t.timestamps
    end
  end
end
