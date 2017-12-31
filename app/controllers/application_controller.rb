class ApplicationController < ActionController::Base
  include ApplicationHelper
  helper_method :back
  protect_from_forgery with: :exception

  before_action do
    I18n.locale = :ja
    RecordWithOperator.operator = current_user

    # backヘルパー対応
    if session[:request_from]
      @request_from = session[:request_from]
    end
    # 現在のURLを保存しておく
    session[:request_from] = request.original_url
  end

  # 前の画面に戻る
  def back
    if request.referer
      redirect_back(fallback_location: root_path)
    elsif @request_from
      redirect_to @request_from
    end
  end

  # LIKE句用エスケープ
  def escape_like(string)
    string.gsub(/[\\%_]/) {|m| "\\#{m}"}
  end

  def base64_conversion(uri_str, filename = 'img')
    image_data = split_base64(uri_str)
    if image_data.nil?
      return nil
    end
    image_data_string = image_data[:data]
    image_data_binary = Base64.decode64(image_data_string)

    temp_img_file = Tempfile.new(filename)
    temp_img_file.binmode
    temp_img_file << image_data_binary
    temp_img_file.rewind

    img_params = {:filename => "#{filename}.#{image_data[:extension]}", :type => image_data[:type], :tempfile => temp_img_file}
    ActionDispatch::Http::UploadedFile.new(img_params)
  end

  def split_base64(uri_str)
    if uri_str.present? && uri_str.match(%r{data:(.*?);(.*?),(.*)$})
      uri = Hash.new
      uri[:type] = $1
      uri[:encoder] = $2
      uri[:data] = $3
      uri[:extension] = $1.split('/')[1]
      uri
    else
      nil
    end
  end

end
