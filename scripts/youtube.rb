require 'rubygems'
require 'google/api_client'

DEVELOPER_KEY = 'AIzaSyC_GMAjf5FubAqNhOIWyDyK4cuax8feOu8'
YOUTUBE_API_SERVICE_NAME = 'youtube'
YOUTUBE_API_VERSION = 'v3'

def absorb(channel, nextToken = nil)
  client = Google::APIClient.new(
      key: DEVELOPER_KEY,
      authorization: nil,
      application_name: $PROGRAM_NAME,
      application_version: '1.0.0'
  )
  youtube = client.discovered_api(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION)

  search_response = client.execute!(
      api_method: youtube.search.list,
      parameters: {
          part: 'snippet',
          channelId: channel.channel_id,
          q: '映画|予告',
          type: 'video',
          maxResults: 50,
          pageToken: nextToken
      }
  )

  ids = search_response.data.items.map {|item| item['id']['videoId']}
  p channel.channel_id
  p nextToken
  p "取得件数: #{ids.size}"

  # 取得結果無い場合スルー
  return if ids.empty?

  already_video_ids = Movie.where(video_id: ids).pluck(:video_id)
  target_videos = search_response.data.items
                      .select {|item| !already_video_ids.include?(item['id']['videoId'])}

  p "保存件数: #{target_videos.size}"
  target_videos.each {|item|
    Movie.create(
        category: channel.category,
        channel_id: channel.channel_id,
        video_id: item['id']['videoId'],
        name: item['snippet']['title'],
        description: item['snippet']['description'],
        screening_date: item['snippet']['publishedAt']
    )
  }

  # tokenあれば再帰
  absorb(channel, search_response.data.nextPageToken) if search_response.data.nextPageToken.present?
end


Channel.where(invalided_at: nil).each do |channel|
  absorb(channel)
end