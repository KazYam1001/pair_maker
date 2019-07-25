set :environment, ENV['RAILS_ENV']

every 1.day, at: '17:30 am' do
  rake "reset_columns:reset_users_entry"
end
