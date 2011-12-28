require 'newrelic_rpm'
require 'instagram'
require 'open-uri'
require 'json'
require 'date'
require 'time'

enable :sessions

CALLBACK_URL = "http://localhost:9393/oauth/callback"

def base_uri
  base_uri_raw = request.env["HTTP_HOST"]+request.env["SCRIPT_NAME"]
  path = URI.parse(request.env["REQUEST_URI"]).path
  base_uri = "http://"+base_uri_raw.split(path)[0]
end

def curr_path
  base_uri_raw = request.env["HTTP_REFERER"]
end

def match(path, opts={}, &block)
  get(path, opts, &block)
  post(path, opts, &block)
end