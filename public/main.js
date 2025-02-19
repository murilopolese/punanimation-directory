console.log('loaded')

import { header } from './layout/header.js'
import { container } from './layout/container.js'
import { modal } from './layout/modal.js'

import { events } from './events.js'

const app = Choo({ hash: true })
app.use(events)
app.route('/:id', (state, emit) => {
  const id = state.params.id
  const selectedEntry = state.entries.find(entry => entry._id == id)
  if (selectedEntry) {
    state.selectedEntry = selectedEntry
    state.isModalOpen = true
  }
  return mainView(state, emit)
})
app.route('/', (state, emit) => {
  state.selectedEntry = null
  state.isModalOpen = false
  return mainView(state, emit)
})
app.mount('body')

function mainView(state, emit) {
  const noScrollClass = state.params.id ? 'no-scroll' : ''
  return html`
    <body class="${noScrollClass}">
      ${header(state, emit)}
      ${container(state, emit)}
      ${modal(state, emit)}
    </body>
  `
}
