class SavedPostsController < ApplicationController
    def index
        render json: SavedPost.all
    end

    def show
        saved_post_to_find=SavedPost.find_by(id: params[:id])
        if saved_post_to_find
            render json:saved_post_to_find
        else
            render json: {error: "saved_post Not Found"}
        end
    end
    
    def create
        # byebug
        logged_in_user=User.find_by(id: session[:user_id])
        # byebug
        if logged_in_user
            new_saved_post=logged_in_user.saved_posts.create(saved_post_create_params)
        # byebug
            if new_saved_post.valid?
                render json: new_saved_post
            else
                render json: {error: new_saved_post.errors.full_messages}
            end
        else
            render json: {error: logged_in_user.errors.full_messages}
        end
    end
    

    def destroy
        saved_post_to_find=SavedPost.find_by(id: params[:id])
        if saved_post_to_find
            saved_post_to_find.destroy
            render json:{"message":"deleted!!" }
        else
            render json: {error: "saved_post Not Found"}
        end
    end

    private
    def saved_post_create_params
        params.permit(:user_id, :post_id)
    end

end
