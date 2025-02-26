function locationFilter(state, emit) {
  const countries = Object.keys(state.locations.filtered).sort()
  function itemHeader(country) {
    return html`<div class="item-header">${country}</div>`
  }
  function item(country) {
    const cities = state.locations.filtered[country]
    if (cities.length == 0) return
    return html `
      <div class="item-header">${country}</div>
      ${cities.map((city) => {
        if (state.locations.selected.indexOf(city) != -1) {
          return html`
            <div class="item selected" onclick=${() => emit('deselect-location', city)}>${city}</div>
          `
        } else {
          return html`
            <div class="item" onclick=${() => emit('select-location', city)}>${city}</div>
          `
        }
      })}
    `
  }
  return html`
    <div class="list">
      ${countries.map(item)}
    </div>
  `
}
function skillsFilter(state, emit) {
  function item(value) {
    if (state.skills.selected.indexOf(value) != -1) {
      return html`
        <div class="item selected" onclick=${() => emit('deselect-skill', value)}>${value}</div>
      `
    } else {
      return html`
        <div class="item" onclick=${() => emit('select-skill', value)}>${value}</div>
      `
    }
  }
  return html`
    <div class="list">
      ${state.skills.filtered.sort().map(item)}
    </div>
  `
}
function softwaresFilter(state, emit) {
  function item(value) {
    // const value = a.name
    if (state.softwares.selected.indexOf(value) != -1) {
      return html`
        <div class="item selected" onclick=${() => emit('deselect-software', value)}>${value}</div>
      `
    } else {
      return html`
        <div class="item" onclick=${() => emit('select-software', value)}>${value}</div>
      `
    }
  }
  return html`
    <div class="list">
      ${state.softwares.filtered.sort().map(item)}
    </div>
  `
}

export function filters(state, emit) {
  const locationSelectedClass = state.locations.selected.length > 0 ? 'selected' : ''
  const locationOpenClass = state.locations.isOpen ? 'open' : 'closed'
  const skillsSelectedClass = state.skills.selected.length > 0 ? 'selected' : ''
  const skillsOpenClass = state.skills.isOpen ? 'open' : 'closed'
  const softwaresSelectedClass = state.softwares.selected.length > 0 ? 'selected' : ''
  const softwaresOpenClass = state.softwares.isOpen ? 'open' : 'closed'

  return html`
    <div class="filters">
      <div class="filter ${locationSelectedClass}">
        <div class="label" onclick=${() => emit('toggle-filter', 'location')}>Location</div>
        <div class="icon" onclick=${() => emit('toggle-filter', 'location')}>
          <img src="media/arrowdown.svg" alt="arrow down" />
        </div>
        <div class="drawer ${locationOpenClass}">
          <div class="search">
            <input type="text" value=${state.locations.filterTerm} onkeyup=${(e) => emit('change-location-filter', e.target.value)} />
            <img src="media/search.svg" alt="search" />
          </div>
          ${locationFilter(state, emit)}
        </div>
      </div>
      <div class="filter ${skillsSelectedClass}">
        <div class="label" onclick=${() => emit('toggle-filter', 'skills')}>Skills</div>
        <div class="icon" onclick=${() => emit('toggle-filter', 'skills')}>
          <img src="media/arrowdown.svg" alt="arrow down" />
        </div>
        <div class="drawer ${skillsOpenClass}">
          <div class="search">
            <input type="text" value=${state.skills.filterTerm} onkeyup=${(e) => emit('change-skills-filter', e.target.value)}/>
            <img src="media/search.svg" alt="search" />
          </div>
          ${skillsFilter(state, emit)}
        </div>
      </div>
      <div class="filter ${softwaresSelectedClass}">
        <div class="label" onclick=${() => emit('toggle-filter', 'softwares')}>Software</div>
        <div class="icon" onclick=${() => emit('toggle-filter', 'softwares')}>
          <img src="media/arrowdown.svg" alt="arrow down" />
        </div>
        <div class="drawer ${softwaresOpenClass}">
          <div class="search">
            <input type="text" value=${state.softwares.filterTerm} onkeyup=${(e) => emit('change-softwares-filter', e.target.value)}/>
            <img src="media/search.svg" alt="search" />
          </div>
          ${softwaresFilter(state, emit)}
        </div>
      </div>
    </div>
  `
}
