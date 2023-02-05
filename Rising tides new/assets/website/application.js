import { Application } from '@hotwired/stimulus'
import Autosave from 'autosave'
import Notification from 'stimulus-notification'
import Dropdown from 'stimulus-dropdown'
import Reveal from 'stimulus-reveal-controller'
import ScrollTo from 'stimulus-scroll-to'

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus = application

// External controllers
application.register('reveal', Reveal)
application.register('autosave', Autosave)
application.register('notification', Notification)
application.register('dropdown', Dropdown)
application.register('scroll-to', ScrollTo)

export { application };
