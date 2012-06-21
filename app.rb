require 'rubygems'
require 'sinatra'
require './config/init'

#
# Before any route is run
before do
  @path = request.env['SCRIPT_NAME']
end

Instagram.configure do |config|
  config.client_id = '1af783f19440416b88ac66fa3943df55'
  config.client_secret = 'df798328326c408aadaff246dbab67b9'
end

#
# Routes

get '/' do
  if session[:access_token]
    client = Instagram.client(:access_token => session[:access_token])
    user = client.user
    @feed = client.user_recent_media

    erb :index
  else
    redirect '/oauth/connect'
    # '<a href="/oauth/connect">Connect with Instagram</a>'
  end
end

get '/oauth/connect' do
  redirect Instagram.authorize_url(:redirect_uri => CALLBACK_URL)
end

get '/oauth/callback' do
  response = Instagram.get_access_token(params[:code], :redirect_uri => CALLBACK_URL)
  session[:access_token] = response.access_token
  puts response.access_token
  redirect '/'
end

get '/location/?' do
  lat = params[:lat]
  lng = params[:lng]

  content_type :json
  Instagram.media_search(lat,lng).to_json
end

get '/search/?' do
  query = params[:q]

  Instagram.user_search(query).to_json
end

get '/user/:id/?' do
  Instagram.user_recent_media(params[:id]).to_json
end
