class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name, null: false, default: ''
      t.integer :job, null: false, default: 0
      t.boolean :entry?
      t.timestamps
    end
  end
end
