class CombinationsController < ApplicationController
  def new
    @users = User.working(Time.now.wday)
    @others = User.holiday(Time.now.wday)
  end

  def create

  end
end
