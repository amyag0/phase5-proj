class SessionController < ApplicationController

        include ActionController::Cookies
         
           def create
               user_to_find_to_login=User.find_by(username: params[:username])
               if user_to_find_to_login
                   if user_to_find_to_login.authenticate(params[:password])
         
                       session[:user_id]=user_to_find_to_login.id
                       render json: user_to_find_to_login
                   else
                       render json: {error: "Check password"}
                   end
               else
                   render json: {error: "Username OR Password dont match"}
               end
           end
         
         
           def get_logged_in_user
          
               user_already_logged_in=User.find_by(id: session[:user_id])
               render json: user_already_logged_in
         
           end
         
           def destroy
               session.delete :user_id
               head :no_content
           end
         
        
        
end
