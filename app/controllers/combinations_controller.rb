class CombinationsController < ApplicationController
  def new
    @users = User.working(Time.now.wday)
    @others = User.holiday(Time.now.wday)
  end

  def create
    user_names = User.where(id: combination_params[:user_ids]).map(&:name)
    user_names.shuffle!
    @combinations = []
    (user_names.length / 2).floor.to_i.times do
      user_names.length == 3 ? @combinations << user_names : @combinations << user_names.slice!(0,2)
    end
    # binding.pry
  end

  private

  def combination_params
    params.permit(user_ids: [])
  end

end
