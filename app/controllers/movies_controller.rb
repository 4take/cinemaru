class MoviesController < ApplicationController
  def index
    render json: Movie.where(category: params[:categories]).order('RAND()')
  end
end