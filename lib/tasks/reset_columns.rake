namespace :reset_columns do
  desc "usersテーブルのentry?カラムをリセットする"
  task reset_users_entry: :environment do
    #ここから処理を書いていく
    #定期実行する際に、そのログを取っておくのは大事。ログがないと定期実行でエラーが起きても分からない。
    User.all.update_all(entry?: nil)
  end
end
