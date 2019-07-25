set :environment, ENV['RAILS_ENV']

every 1.day, at: '18:00 am' do
  rake "reset_columns:reset_users_entry"
end
