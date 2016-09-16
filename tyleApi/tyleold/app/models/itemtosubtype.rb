class Itemtosubtype < ActiveRecord::Base
  belongs_to :item
  belongs_to :subtype
end
