import { countries } from './data/countries.js'

function normalize(str) {
	return str.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()
}

function getFilterModel() {
  return {
    data: [],
    selected: [],
    isOpen: false,
    filtered: [],
    filterTerm: ''
  }
}

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

export function events(state, emitter) {
  state.requests = {
    entries: null,
    locations: null,
    skills: null,
    softwares: null
  }
  state.isModalOpen = false
  state.entries = []
  state.selectedEntry = null

  state.locations = getFilterModel()
  state.locations.data = {} // this one is an object instead of array
  state.skills = getFilterModel()
  state.softwares = getFilterModel()

  state.page = {
    current: 0,
    size: 9
  }
  state.position = 0
  state.isMenuHidden = false
  state.isMenuCollapsed = false

  fetch('data/entries.json')
    .then(r => r.json())
    .then((response) => {
      state.requests.entries = response
      state.entries = response.entries
      shuffle(state.entries)
      state.entries = state.entries.sort((a, b) => {
        const isADefault = a.coverImage == 'https://i.imgur.com/Hc0Ok0V.jpg'
        const isBDefault = b.coverImage == 'https://i.imgur.com/Hc0Ok0V.jpg'
        if (isADefault && !isBDefault) {
          return 1
        } else if (isBDefault && !isADefault) {
          return -1
        } else {
          return 0
        }
      })
      emitter.emit('render')
    })
  fetch('data/locations.json')
    .then(r => r.json())
    .then((response) => {
      state.requests.locations = response.locations
      // Create a dictionary with the full country name, not two letter code
      state.locations.data = response.locations.reduce((acc, location) => {
        const country = countries[location.country]
        if (acc[country]) {
          acc[country].push(location.city)
        } else {
          acc[country] = [location.city]
        }
        return acc
      }, {})
      emitter.emit('change-location-filter', '')
    })
  fetch('data/skills.json')
    .then(r => r.json())
    .then((response) => {
      state.requests.skills = response.skills
      // console.log(response.skills)
      state.skills.data = response.skills.map((a) => a.name)
      emitter.emit('change-skills-filter', '')
    })
  fetch('data/softwares.json')
    .then(r => r.json())
    .then((response) => {
      state.requests.softwares = response.softwares
      // console.log(response.softwares)
      state.softwares.data = response.softwares.map((a) => a.name)
      emitter.emit('change-softwares-filter', '')
    })

  emitter.on('DOMContentLoaded', () => {
    document.addEventListener('scroll', (e) => {
      const pos = window.pageYOffset
      const scrollingUp = pos < state.position
      const scrollingDown = pos > state.position

      // Hide and show fixed menu depending on scrolling direction
      if (scrollingUp && pos > 220) {
        state.isMenuShowing = true
      } else {
        state.isMenuShowing = false
      }
      if (scrollingDown) {
        state.isMenuShowing = false
      }

      // Next page only if it's scrolling down
      if (scrollingDown) {
        if (window.pageYOffset + 50 > document.body.clientHeight - window.screen.height) {
          state.page.current += 1
          emitter.emit('render')
        }
      }
      state.position = pos
      // Always close filters
      emitter.emit('close-filters')
    })


  })

  emitter.on('open-modal', () => {
    state.isModalOpen = true
    emitter.emit('render')
  })
  emitter.on('close-modal', () => {
    state.isModalOpen = false
    emitter.emit('render')
  })

  emitter.on('select-location', (city) => {
    if (state.locations.selected.indexOf(city) == -1) {
      state.locations.selected.push(city)
    }
    emitter.emit('render')
  })
  emitter.on('deselect-location', (city) => {
    const index = state.locations.selected.indexOf(city)
    if (index != -1) {
      state.locations.selected.splice(index, 1)
    }
    emitter.emit('render')
  })
  emitter.on('select-skill', (skill) => {
    if (state.skills.selected.indexOf(skill) == -1) {
      state.skills.selected.push(skill)
    }
    emitter.emit('render')
  })
  emitter.on('deselect-skill', (skill) => {
    const index = state.skills.selected.indexOf(skill)
    if (index != -1) {
      state.skills.selected.splice(index, 1)
    }
    emitter.emit('render')
  })
  emitter.on('select-software', (software) => {
    if (state.softwares.selected.indexOf(software) == -1) {
      state.softwares.selected.push(software)
    }
    emitter.emit('render')
  })
  emitter.on('deselect-software', (software) => {
    const index = state.softwares.selected.indexOf(software)
    if (index != -1) {
      state.softwares.selected.splice(index, 1)
    }
    emitter.emit('render')
  })
  emitter.on('toggle-filter', (name) => {
    if (name == 'location') {
      state.locations.isOpen = !state.locations.isOpen
      state.skills.isOpen = false
      state.softwares.isOpen = false
    }
    if (name == 'skills') {
      state.locations.isOpen = false
      state.skills.isOpen = !state.skills.isOpen
      state.softwares.isOpen = false
    }
    if (name == 'softwares') {
      state.locations.isOpen = false
      state.skills.isOpen = false
      state.softwares.isOpen = !state.softwares.isOpen
    }
    emitter.emit('render')
  })
  emitter.on('close-filters', () => {
    state.locations.isOpen = false
    state.skills.isOpen = false
    state.softwares.isOpen = false
    emitter.emit('render')
  })

  emitter.on('change-location-filter', (value) => {
    if (!value) {
      state.locations.filtered = state.locations.data
      state.locations.filterTerm = ''
    } else {
      state.locations.filterTerm = value
      state.locations.filtered = Object.keys(state.locations.data).sort().reduce((acc, key) => {
        const filtered = state.locations.data[key].filter(
          (a) => normalize(a).toLowerCase().indexOf(normalize(value).toLowerCase()) != -1
        )
        if (filtered.length > 0) {
          acc[key] = filtered
        }
        return acc
      }, {})
    }
    emitter.emit('render')
  })
  emitter.on('change-skills-filter', (value) => {
    if (!value) {
      state.skills.filtered = state.skills.data
      state.skills.filterTerm = ''
    } else {
      state.skills.filterTerm = value
      state.skills.filtered = state.skills.data.sort().filter(
        (a) => normalize(a).toLowerCase().indexOf(normalize(value).toLowerCase()) != -1
      )
    }
    emitter.emit('render')
  })
  emitter.on('change-softwares-filter', (value) => {
    if (!value) {
      state.softwares.filtered = state.softwares.data
      state.softwares.filterTerm = ''
    } else {
      state.softwares.filterTerm = value
      state.softwares.filtered = state.softwares.data.sort().filter(
        (a) => normalize(a).toLowerCase().indexOf(normalize(value).toLowerCase()) != -1
      )
    }
    emitter.emit('render')
  })
}
