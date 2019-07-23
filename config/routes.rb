Rails.application.routes.draw do
  root 'combinations#new'
  resources :combinations, only: :create
end
