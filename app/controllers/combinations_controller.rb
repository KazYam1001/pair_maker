class CombinationsController < ApplicationController
  def new
    @users = User.working(Time.now.wday)
    @others = User.holiday(Time.now.wday)
  end

  def create
    user_names = User.where(id: combination_params[:user_ids]).map(&:name)
    user_names.concat(combination_params[:guest]) if combination_params[:guest]
    user_names.shuffle!
    create_pairs_with_group(user_names)
    respond_to do |format|
      format.json
    end
  end

  private

  def combination_params
    params.permit(user_ids: [], guest: [])
  end

  def create_pairs_with_group(user_names)
    combinations = []
    @groups = { A: [], B: [], C: [], D: [], E: [], F: [] }
    (user_names.length / 2).floor.to_i.times do
      user_names.length == 3 ? combinations << user_names : combinations << user_names.slice!(0,2)
    end
    combinations.each.with_index(1) do |pair, i|
      case i % 6
      when 1
        @groups[:A] << pair
      when 2
        @groups[:B] << pair
      when 3
        @groups[:C] << pair
      when 4
        @groups[:D] << pair
      when 5
        @groups[:E] << pair
      when 0
        @groups[:F] << pair
      end
    end
    @groups
  end

end
