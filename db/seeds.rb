require "csv"

CSV.foreach('db/csv/users.csv', headers: true) do |row|
  User.where(name: row['name']).first_or_create do |user|
    user.id = row['id']
    user.job = row['job'].to_i
  end
end

Holiday.destroy_all
CSV.foreach('db/csv/holidays.csv', headers: true) do |row|
  Holiday.find_or_create_by(
    id: row['id'],
    user_id: row['user_id'],
    wday: row['wday']
  )
end
