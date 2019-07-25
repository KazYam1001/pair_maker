set :environment, ENV['RAILS_ENV']

every 1.minute do
  rake "reset_columns:reset_users_entry"
end
