export function modal(state, emit) {
  if (!state.selectedEntry) return
  function exit(e) {
    if (e.target.id == 'modal') {
      emit('pushState', '/')
    }
  }
  return html`
    <div id="modal" class="open" onclick=${exit}>
      <div id="dialog">
        <div class="link">
          <a href="${state.selectedEntry.website}" target="_blank"><img src="media/link.svg" /></a>
        </div>
        <div class="row">
          <span class="title">${state.selectedEntry.name}</span>
          <span class="body">${state.selectedEntry.location.city}, ${state.selectedEntry.location.country}</span>
        </div>
        <div class="row">
          <span class="title">Skills</span>
          <span class="body">
            ${state.selectedEntry.skills.map(s => s.name).join(', ')}
          </span>
        </div>
        <div class="row">
          <span class="title">Software</span>
          <span class="body">
            ${state.selectedEntry.softwares.map(s => s.name).join(', ')}
          </span>
        </div>
      </div>
    </div>
  `
}
