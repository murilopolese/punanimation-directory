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
  const page = state.entries.slice(0, 9)
  if (page.length == 0) {
    return html`
    <div id="container">
      Loading...
    </div>
    `
  }
  return html`
    <div id="container">
      ${page.map(entry => item(entry))}
    </div>
  `
}
