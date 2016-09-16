class Item < ActiveRecord::Base
  belongs_to :subtype
  has_many :related_subtypes, through: :itemto_subtype
  has_many :related_items, through: :itemto_item
end
