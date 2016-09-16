class CreateTypes < ActiveRecord::Migration
  def change
    create_table :types do |t|
      t.string :name
      t.references :division, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
