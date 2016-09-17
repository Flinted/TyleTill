class DivisionsController < ApplicationController
  respond_to :json
  def index
      divisions = Division.all
      render json: divisions.as_json(include: [{types: {include: {subtypes: {include: :items} }}}])
  end

  def show
      division = Division.find(params[:id])
      render json: division.as_json(include: [{types: {include: {subtypes: {include: :items} }}}])
  end

  def find
      division = Division.where(name: params[:title])
      render json: division.as_json(include: [{types: {include: {subtypes: {include: :items} }}}])
  end

end