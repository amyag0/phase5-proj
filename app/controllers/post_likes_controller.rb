class PostLikesController < ApplicationController
    def index
        render json: PostLike.all
    end

    def show
        like_to_find=PostLike.find_by(id: params[:id])
        if like_to_find
            render json:like_to_find
        else
            render json: {error: "like Not Found"}
        end
    end
    
    def create
        logged_in_user=User.find_by(id: session[:user_id])
        #byebug
        if logged_in_user
            #byebug
            new_like=logged_in_user.post_likes.create(like_create_params)
            #byebug
            if new_like.valid?
                render json: new_like
            else
                render json: {error: new_like.errors.full_messages}
            end
        else
            render json: {error: logged_in_user.errors.full_messages}
        end
    end
    

    def destroy
        like_to_find=PostLike.find_by(id: params[:id])
        if like_to_find
            like_to_find.destroy
            render json:{"message":"deleted like!!" }
        else
            render json: {error: "like Not Found"}
        end
    end

    private
    def like_create_params
        params.permit(:user_id, :post_id)
    end
    
end
