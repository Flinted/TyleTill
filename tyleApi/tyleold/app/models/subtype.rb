class Subtype < ActiveRecord::Base
  belongs_to :type
  has_many :items
end
