class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :name
      t.references :subtype, index: true, foreign_key: true
      t.string :sizes
      t.string :prices
      t.string :links

      t.timestamps null: false
    end
  end
end
