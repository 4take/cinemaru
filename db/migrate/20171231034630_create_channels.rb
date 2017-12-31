class CreateChannels < ActiveRecord::Migration[5.1]
  def change
    create_table :channels do |t|
      t.integer :category, null: false, default: 0
      t.string :channel_id, null: false

      t.timestamps
    end
  end
end
