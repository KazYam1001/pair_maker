class CreateUsersHolidays < ActiveRecord::Migration[5.2]
  def change
    create_table :users_holidays do |t|
      t.references :user, foreign_key: true
      t.references :holiday, foreign_key: true

      t.timestamps
    end
  end
end
