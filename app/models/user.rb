class User < ApplicationRecord
  has_many :users_holidays
  has_many :holidays, through: :users_holidays

  def self.working(wday)
    (where(entry?: nil) - joins(:holidays).where('holidays.id = ?', wday)) | where(entry?: true)
  end

  def self.holiday(wday)
    where(entry?: nil).joins(:holidays).where('holidays.id = ?', wday) | where(entry?: false)
  end

end
