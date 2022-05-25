class PostsController < ApplicationController
    def index
        render json: Post.all
    end

    def show
        post_to_find=Post.find_by(id: params[:id])
        if post_to_find
            render json:post_to_find
        else
            render json: {error: "post Not Found"}
        end
    end
    
    def create
        logged_in_user=User.find_by(id: session[:user_id])
        if logged_in_user
            new_post=logged_in_user.posts.create(post_create_params)
        # new_post= Post.create(post_create_params)
            if new_post.valid?
                render json: new_post
            else
                render json: {error: new_post.errors.full_messages}
            end
        else
            render json: {error: logged_in_user.errors.full_messages}
        end
    end
    
    def update
        post_to_edit= Post.find_by(id: params[:id])
        if post_to_edit.update(post_update_params)
            render json:post_to_edit
        else
            render json: {errors: post_to_edit.errors.full_messages}
        end
    end

    def destroy
        post_to_find=Post.find_by(id: params[:id])
        if post_to_find
            post_to_find.destroy
            render json:{"message":"deleted!!" }
        else
            render json: {error: "post Not Found"}
        end
    end

    private
    def post_create_params
        params.permit(:user_id, :title, :content, :img_url, :post_type)
    end

    def post_update_params
        params.permit(:title, :content, :img_url, :post_type)
    end

end
