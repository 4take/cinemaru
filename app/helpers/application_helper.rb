module ApplicationHelper
  def default_meta_tags
    {
        site: 'Cinemaru',
        description: '映画館で上映待ってる時にずっと流れてるやつ、そうあれ。',
        og: {
            title: :title,
            type: 'website',
            url: request.original_url,
            # image: 'https://s3-ap-northeast-1.amazonaws.com/skireer/images/logo.png',
            site_name: 'Cinemaru（シネマル）',
            description: :description,
            locale: 'ja_JP'
        },
        # fb: {
        #     app_id: '1949768178579756'
        # },
        twitter: {
            card: 'summary'
        }
    }
  end
end
