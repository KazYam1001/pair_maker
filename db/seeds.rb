require "csv"

CSV.foreach('db/csv/users.csv', headers: true) do |row|
  User.find_or_create_by(
    id: row['id'],
    name: row['name']
  )
end

CSV.foreach('db/csv/holidays.csv', headers: true) do |row|
  Holiday.find_or_create_by(
    id: row['id'],
    name: row['name']
  )
end

CSV.foreach('db/csv/users_holidays.csv', headers: true) do |row|
  UsersHoliday.create!(
    user_id: row['user_id'],
    holiday_id: row['holiday_id']
  )
end
