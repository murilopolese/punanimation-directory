function locationFilter(state, emit) {
  const countries = Object.keys(state.filteredLocations).sort()
  function itemHeader(country) {
    return html`<div class="item-header">${country}</div>`
  }
  const item = (country) => {
    const cities = state.filteredLocations[country]
    if (cities.length == 0) return
    return html `
      <div class="item-header">${country}</div>
      ${cities.map((city) => {
        if (state.selectedLocations.indexOf(city) != -1) {
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

export function filters(state, emit) {
  const locationSelectedClass = state.selectedLocations.length > 0 ? 'selected' : ''
  const locationOpenClass = state.isLocationOpen ? 'open' : 'closed'
  const skillsSelectedClass = state.selectedSkills.length > 0 ? 'selected' : ''
  const skillsOpenClass = state.isSkillsOpen ? 'open' : 'closed'
  const softwaresSelectedClass = state.selectedSoftwares.length > 0 ? 'selected' : ''
  const softwaresOpenClass = state.isSoftwaresOpen ? 'open' : 'closed'

  return html`
    <div class="filters">
      <div class="filter ${locationSelectedClass}">
        <div class="label" onclick=${() => emit('toggle-filter', 'location')}>Location</div>
        <div class="icon" onclick=${() => emit('toggle-filter', 'location')}>
          <img src="media/arrowdown.svg" alt="arrow down" />
        </div>
        <div class="drawer ${locationOpenClass}">
          <div class="search">
            <input type="text" value=${state.locationFilterTerm} onkeyup=${(e) => emit('change-location-filter', e.target.value)} />
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
            <input type="text" />
            <img src="media/search.svg" alt="search" />
          </div>
          <div class="list">
            ${state.skills.map((skill) => {
              if (state.selectedSkills.indexOf(skill.name) != -1) {
                return html`
                  <div class="item selected" onclick=${() => emit('deselect-skill', skill.name)}>${skill.name}</div>
                `
              } else {
                return html`
                  <div class="item" onclick=${() => emit('select-skill', skill.name)}>${skill.name}</div>
                `
              }
            })}
          </div>
        </div>
      </div>
      <div class="filter ${softwaresSelectedClass}">
        <div class="label" onclick=${() => emit('toggle-filter', 'softwares')}>Software</div>
        <div class="icon" onclick=${() => emit('toggle-filter', 'softwares')}>
          <img src="media/arrowdown.svg" alt="arrow down" />
        </div>
        <div class="drawer ${softwaresOpenClass}">
          <div class="search">
            <input type="text" />
            <img src="media/search.svg" alt="search" />
          </div>
          <div class="list">
            ${state.softwares.map((software) => {
              if (state.selectedSoftwares.indexOf(software.name) != -1) {
                return html`
                  <div class="item selected" onclick=${() => emit('deselect-software', software.name)}>${software.name}</div>
                `
              } else {
                return html`
                  <div class="item" onclick=${() => emit('select-software', software.name)}>${software.name}</div>
                `
              }
            })}
          </div>
        </div>
      </div>
    </div>
  `
}
