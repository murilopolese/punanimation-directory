export function events(state, emitter) {
  console.log('store')
  state.isModalOpen = false
  state.entries = []
  state.selectedEntry = null

  fetch('data/entries.json')
    .then(r => r.json())
    .then((response) => {
      // console.log(response.entries)
      state.entries = response.entries
      emitter.emit('render')
    })

  emitter.on('open-modal', () => {
    state.isModalOpen = true
    emitter.emit('render')
  })
  emitter.on('close-modal', () => {
    state.isModalOpen = false
    emitter.emit('render')
  })

}
