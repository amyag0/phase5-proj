class CommentsController < ApplicationController
    def index
        render json: Comment.all
    end

    def show
        comment_to_find=Comment.find_by(id: params[:id])
        if comment_to_find
            render json:comment_to_find
        else
            render json: {error: "comment Not Found"}
        end
    end
    
    def create
        logged_in_user=User.find_by(id: session[:user_id])
        if logged_in_user
            new_comment=logged_in_user.comments.create(comment_create_params)
        # new_comment= comment.create(comment_create_params)
            if new_comment.valid?
                render json: new_comment
            else
                render json: {error: new_comment.errors.full_messages}
            end
        else
            render json: {error: logged_in_user.errors.full_messages}
        end
    end
    

    def destroy
        comment_to_find=Comment.find_by(id: params[:id])
        if comment_to_find
            comment_to_find.destroy
            render json:{"message":"deleted!!" }
        else
            render json: {error: "comment Not Found"}
        end
    end

    private
    def comment_create_params
        params.permit(:user_id, :comment_content, :post_id)
    end
end
