require 'rubygems'
require 'google/apis/youtube_v3'

class YoutubeJob < ApplicationJob
  queue_as :default

  DEVELOPER_KEY = 'google developerで取得したキー'
  YOUTUBE_API_SERVICE_NAME = 'youtube'
  YOUTUBE_API_VERSION = 'v3'

  def perform(*args)
    client = Google::APIClient.new(
        key: 'AIzaSyC_GMAjf5FubAqNhOIWyDyK4cuax8feOu8',
        authorization: nil,
        application_name: $PROGRAM_NAME,
        application_version: '1.0.0'
    )
    youtube = client.discovered_api(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION)

    begin
      search_response = client.execute!(
          api_method: youtube.search.list,
          parameters: {
              part: 'snippet'
          }
      )
      puts search_response

    rescue Google::APIClient::TransmissionError => e
      puts e.result.body
    end
  end
end
