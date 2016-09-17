class TypesController < ApplicationController

  def index
      types = Type.all
      render json: types.as_json(include: {subtypes: {include: :items} })
  end

  def show
      type = Type.find(params[:id])
      render json: type.as_json(include: {subtypes: {include: :items} })
  end

  def find
      type = Type.where(name: params[:title])
      render json: type.as_json(include: {subtypes: {include: :items}})
  end

end