class SubtypesController < ApplicationController

  def index
      subtypes = Subtype.all
      render json: subtypes.as_json(include: :items)
  end

  def show
      subtype = Subtype.find(params[:id])
      render json: subtype.as_json(include: :items)
  end

  def find
      type = Subtype.where(name: params[:title])
      render json: type.as_json(include:  :items)
  end

end