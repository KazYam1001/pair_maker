class CreateHolidays < ActiveRecord::Migration[5.2]
  def change
    create_table :holidays do |t|
      t.integer :wday, null: false, default: 0
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end
