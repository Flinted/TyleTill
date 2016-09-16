class RemoveLinksFromItems < ActiveRecord::Migration
  def change
    remove_column :items, :links, :string
  end
end
