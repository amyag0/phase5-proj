class ApplicationController < ActionController::API
    include ActionController::Cookies
#     rescue_from ActiveRecord::RecordInvalid, with: :render_invalid_record_response
#     rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found_response


# private 
#     def render_invalid_record_response(invalid)
#     render json: {errors: [invalid.record.errors]}, status: :unprocessable_entity
#     end

#     def render_record_not_found_response(invalid)
#     render json: {error: invalid}, status: :not_found
#     end


end
