Rails.application.routes.draw do
  root 'combinations#new'
  resources :combinations, only: :create
  resources :users, only: :update
end
