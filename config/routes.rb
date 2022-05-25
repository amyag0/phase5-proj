Rails.application.routes.draw do
  resources :comment_likes
  resources :comments
  resources :post_likes
  resources :saved_posts
  resources :posts
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post "/login", to: "sessions#create"
  get "/userInSession", to: "sessions#get_logged_in_user"
  delete "/logout", to: "sessions#destroy"
  get "/user/:id/saved", to: "users#get_user_saved_posts"
  patch "/user/:id", to: "users#update"
end
