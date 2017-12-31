class CreateChannels < ActiveRecord::Migration[5.1]
  def change
    create_table :channels do |t|
      t.integer :category, null: false, default: 0
      t.string :name
      t.string :channel_id, null: false
      t.boolean :invalided_at, default: true

      t.timestamps
    end
  end
end
