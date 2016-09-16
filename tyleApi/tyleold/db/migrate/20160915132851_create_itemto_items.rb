class CreateItemtoitems < ActiveRecord::Migration
  def change
    create_table :itemtoitems do |t|
      t.references :parentItem, index: true, foreign_key: true
      t.references :linkedItem, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
