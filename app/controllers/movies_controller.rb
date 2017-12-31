class MoviesController < ApplicationController
  def index
    render json: Movie.where(category: params[:categories]).limit(100).order('RAND()')
  end
end