import ReactOnRails from 'react-on-rails'
import * as injectTapEventPlugin from 'react-tap-event-plugin'
import Navigation from './components/navigation'
import Cinemaru from './components/cinemaru'

require('jquery')
require('jquery-ujs')
require('popper.js')
require('bootstrap')
require('moment')
require('snapsvg/dist/snap.svg.js')

injectTapEventPlugin()

ReactOnRails.register({
    Navigation,
    Cinemaru
})

require('./app.sass')


$(() => {
    // 代打
    $('[data-clicker]').on('click', (e) => {
        $($(e.target).data('click-target')).click()
    })
    // 画像
    $('[data-select-picture]').on('change', (e) => {
        const files = (e.target as HTMLInputElement).files
        const selectPicture = e.target
        if (files.length) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                $($(selectPicture).data('preview-target')).attr('src', (e as any).target.result)
            }
            fileReader.readAsDataURL(files[0])
        }
    })
})
