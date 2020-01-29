require "csv"

CSV.foreach('db/csv/users.csv', headers: true) do |row|
  user = User.find_or_initialize_by(id: row['id'])
  user.update_attributes(
    name: row['name'],
    job: row['job'].to_i
  )
end

Holiday.destroy_all
CSV.foreach('db/csv/holidays.csv', headers: true) do |row|
  Holiday.find_or_create_by(
    id: row['id'],
    user_id: row['user_id'],
    wday: row['wday']
  )
end
