class Type < ActiveRecord::Base
  belongs_to :division
  has_many :subtypes
end
