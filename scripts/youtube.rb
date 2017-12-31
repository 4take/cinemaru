require 'rubygems'
require 'google/api_client'

DEVELOPER_KEY = 'AIzaSyC_GMAjf5FubAqNhOIWyDyK4cuax8feOu8'
YOUTUBE_API_SERVICE_NAME = 'youtube'
YOUTUBE_API_VERSION = 'v3'

client = Google::APIClient.new(
    key: DEVELOPER_KEY,
    authorization: nil,
    application_name: $PROGRAM_NAME,
    application_version: '1.0.0'
)
youtube = client.discovered_api(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION)

begin
  Channel.all.each do |channel|
    search_response = client.execute!(
        api_method: youtube.search.list,
        parameters: {
            part: 'snippet',
            channelId: channel.channel_id
        }
    )

    ids = search_response.data.items.map {|item| item['id']['videoId']}

    already_video_ids = Movie.where(video_id: ids).pluck(:video_id)
    search_response.data.items
        .select {|item| !already_video_ids.include?(item['id']['videoId'])}
        .each {|item|
          Movie.create(
              category: channel.category,
              channel_id: channel.channel_id,
              video_id: item['id']['videoId'],
              name: item['snippet']['title'],
              description: item['snippet']['description'],
              screening_date: item['snippet']['publishedAt']
          )
        }
  end

rescue Google::APIClient::TransmissionError => e
  puts e.result.body
end