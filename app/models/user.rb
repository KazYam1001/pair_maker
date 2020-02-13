class User < ApplicationRecord
  has_many :holidays

  enum job: { holiday: 0, tc_sales: 1, life_coach: 2, mentor: 3, carrier: 4, exp_sales: 5, all_day: 6 }

  def self.working(wday)

    # holiday, salesで無い→休日がwday出ない→もしくはentry?がtrue の人が基本出席
    base = (where(entry?: nil).where.not(job: [ :holiday, :tc_sales, :exp_sales]) - joins(:holidays)
    .where('holidays.wday = ?', wday)) | where(entry?: true)
    case wday
    when 1, 4
      # 月・木曜はLCおやすみ
      base - where(job: :life_coach)
    when 2, 5
      # 火・金曜はCAおやすみ
      base - where(job: :carrier)
    when 3
      # 水曜はメンターおやすみ
      base - where(job: :mentor)
    when 0,6
      # 土日は昼会無いのでボタン押せるように全部出しとく
      all
    end
  end

  def self.holiday(wday)
    # expセールス(非表示)以外から出社組を引く→もしくは欠席押してる人が欠席
    where.not(job: [:exp_sales]) - working(wday) | where(entry?: false)
  end

end
