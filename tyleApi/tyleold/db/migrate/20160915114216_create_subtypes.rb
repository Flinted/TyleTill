class CreateSubtypes < ActiveRecord::Migration
  def change
    create_table :subtypes do |t|
      t.string :name
      t.references :type, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
