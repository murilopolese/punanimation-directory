function filterEntries(state) {
  let entries = state.entries

  // filter by location
  if (state.locations.selected.length > 0) {
    entries = entries.filter((entry) => {
      return entry.location
          && state.locations.selected.indexOf(entry.location.city) != -1
    })
  }
  if (state.skills.selected.length > 0) {
    entries = entries.filter((entry) => {
      const entrySkills = entry.skills.map(s => s.name)
      return state.skills.selected.reduce(
        (acc, skill) => {
          if (entrySkills.indexOf(skill) == -1) {
            acc = false
          }
          return acc
        },
        true
      )
    })
  }
  if (state.softwares.selected.length > 0) {
    entries = entries.filter((entry) => {
      const entrySoftwares = entry.softwares.map(s => s.name)
      return state.softwares.selected.reduce(
        (acc, software) => {
          if (entrySoftwares.indexOf(software) == -1) {
            acc = false
          }
          return acc
        },
        true
      )
    })
  }

  return entries
}

function item(entry) {
  return html`
    <div class="item">
      <a href="#${entry._id}">
        <img src="${entry.coverImage}" />
        <span class="name">
          <span class="fullname">${entry.name}</span>
          <span class="location">(${entry.location.city}, ${entry.location.country})</span>
        </span>
      </a>
    </div>
  `
}

export function container(state, emit) {
  let entries = filterEntries(state)
  entries = entries.slice(0, (state.page.current+1)*state.page.size)
  const svg = raw`<svg width="44" height="44"><circle stroke="#fcc438" cx="22" cy="22" r="20" fill="none" stroke-width="3.6"></circle></svg>`
  if (entries.length == 0) {
    return html`
    <div id="container">
      <div id="loading">
        ${svg}
      </div>
    </div>
    `
  }
  return html`
    <div id="container">
      ${entries.map(entry => item(entry))}
    </div>
  `
}
