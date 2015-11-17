
class LocationsController < ApplicationController
  before_filter :authorize

  def index
    @locations = Location.select(:city).distinct
  end

  # def find

  #   #url = Addressable::URI.parse("/locations/#{params[:city]}").normalize
  #   redirect_to "/locations/city?#{params[:city]}"
  # end

  def city
    @locations = Location.where(city: params[:city])

    render "city"
  end

end
