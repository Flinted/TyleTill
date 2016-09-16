class CreateItemtosubtypes < ActiveRecord::Migration
  def change
    create_table :itemtosubtypes do |t|
      t.references :item, index: true, foreign_key: true
      t.references :subtype, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
