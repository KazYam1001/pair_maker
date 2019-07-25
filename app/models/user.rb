class User < ApplicationRecord
  has_many :users_holidays
  has_many :holidays, through: :users_holidays

  def self.working(wday)
    (all - joins(:holidays).where('holidays.id = ?', wday)) | where(entry?: true)
  end

  def self.holiday(wday)
    joins(:holidays).where('holidays.id = ?', wday) | where(entry?: false)
  end

end
