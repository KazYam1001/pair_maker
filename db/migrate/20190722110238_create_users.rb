class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name, null: false, default: ''
      t.boolean :absence?, null: false, default: false
      t.timestamps
    end
  end
end
