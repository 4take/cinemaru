class CreateMovies < ActiveRecord::Migration[5.1]
  def change
    create_table :movies do |t|
      t.integer :category, null: false, default: 0
      t.string :video_id, null: false
      t.string :channel_id
      t.string :name, null: false
      t.text :description, null: false
      t.datetime :screening_date

      t.timestamps
    end

    add_index :movies, :video_id, unique: true
  end
end
