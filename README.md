# README

## DB設計
基本的に`null: false`をつける

### users
|column|type|options|
|-|-|-|
|name|str|-|
|holiday|str|-|
#### associations
```ruby
has_many combinations
```

### combinations
|column|type|options|
|-|-|-|
|first_user_id|int|-|
|second_user_id|int|-|
|third_user_id|int|null: true|
#### associations
```ruby
belongs_to first_user,  class_name: 'User'
belongs_to second_user, class_name: 'User'
belongs_to third_user,  class_name: 'User'
```
