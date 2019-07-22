class Holiday < ApplicationRecord
  has_many :users_holidays
  has_many :users, through: :users_holidays
end
