require "csv"

CSV.foreach('db/csv/users.csv', headers: true) do |row|
  User.where(name: row['name']).first_or_create do |user|
    user.id = row['id']
  end
end

CSV.foreach('db/csv/holidays.csv', headers: true) do |row|
  Holiday.find_or_create_by(
    id: row['id'],
    name: row['name']
  )
end

UsersHoliday.destroy_all
CSV.foreach('db/csv/users_holidays.csv', headers: true) do |row|
  UsersHoliday.create!(
    id: row['id'],
    user_id: row['user_id'],
    holiday_id: row['holiday_id']
  )
end
