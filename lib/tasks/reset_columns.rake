namespace :reset_columns do
  desc "usersテーブルのentry?カラムをリセットする"
  task reset_users_entry: :environment do
    #ここから処理を書いていく
    #定期実行する際に、そのログを取っておくのは大事。ログがないと定期実行でエラーが起きても分からない。
    logger = Logger.new 'log/reset_columns.log'
    User.find_each do |user|
      begin
        user.update!(entry?: nil)
      rescue => e
        #何かしらエラーが起きたら、エラーログの書き込み ただし次のユーザーの処理へは進む
        logger.error "user_id: #{user.id}でエラーが発生"
        logger.error e
        logger.error e.backtrace.join("\n")
        next
      end
    end
  end
end
