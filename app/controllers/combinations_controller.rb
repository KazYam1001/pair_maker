class CombinationsController < ApplicationController
  def new
    @users = User.working(Time.now.wday)
    @others = User.holiday(Time.now.wday)
  end

  def create
    user_names = User.where(id: combination_params[:user_ids]).map(&:name)
    user_names.concat(combination_params[:guest]) if combination_params[:guest]
    user_names.shuffle!
    @combinations = []
    (user_names.length / 2).floor.to_i.times do
      user_names.length == 3 ? @combinations << user_names : @combinations << user_names.slice!(0,2)
    end
    respond_to do |format|
      format.json
    end
  end

  private

  def combination_params
    params.permit(user_ids: [], guest: [])
  end

end
