class UsersController < ApplicationController
    def index
        render json: User.all
    end

    def show
        user_to_find = User.find_by(id: params[:id])
        if user_to_find
            render json: user_to_find
        else
            render json: {error: user_to_find.errors.full_messages}
        end
    end

    def create
        new_user=User.new(
            name: params[:name],
            username: params[:username],
            email: params[:email],
            password: params[:password],
            bio: params[:bio]
        )
        if new_user.valid?
            new_user.save
            session[:user_id]=new_user.id
        
            render json: new_user
        else
            render json: {errors: new_user.errors.full_messages}
        end
    end

    def update
        user_to_find= User.find_by(id: params[:id])
        if user_to_find.update(user_update_params)
            render json:user_to_find
        else
            render json: {errors: user_to_find.errors.full_messages}
        end
    end

    def get_user_saved_posts
        user_to_find = User.find_by(id: params[:id])
        user_saved_posts = user_to_find.saved_posts
        if user_saved_posts
            render json: user_saved_posts, each_serializer: SavedPostSerializer
        else
            render json: {error: user_saved_posts.errors.full_messages}
        end
        
    end


    def get_user_liked_posts
        user_to_find = User.find_by(id: params[:id])
        user_liked_posts = user_to_find.post_likes
        if user_liked_posts
            render json: user_liked_posts, each_serializer: PostLikeSerializer
        else
            render json: {error: user_liked_posts.errors.full_messages}
        end
        
    end


    private
    def user_update_params
        params.permit(:name, :username, :email, :password, :bio)
    end


end
