import { countries } from './data/countries.js'

export function events(state, emitter) {
  console.log('store')
  state.isModalOpen = false
  state.entries = []
  state.selectedEntry = null
  state.locations = []
  state.selectedLocations = []
  state.skills = []
  state.selectedSkills = []
  state.softwares = []
  state.selectedSoftwares = []
  state.isLocationOpen = false
  state.locationFilter = ''
  state.filteredLocations = []
  state.isSkill

  fetch('data/entries.json')
    .then(r => r.json())
    .then((response) => {
      state.entries = response.entries
      emitter.emit('render')
    })
  fetch('data/locations.json')
    .then(r => r.json())
    .then((response) => {
      // Create a dictionary with the full country name, not two letter code
      state.locations = response.locations.reduce((acc, location) => {
        const country = countries[location.country]
        if (acc[country]) {
          acc[country].push(location.city)
        } else {
          acc[country] = [location.city]
        }
        return acc
      }, {})
      emitter.emit('render')
    })
  fetch('data/skills.json')
    .then(r => r.json())
    .then((response) => {
      // consotle.log(response.skills)
      state.skills = response.skills
      emitter.emit('render')
    })
  fetch('data/softwares.json')
    .then(r => r.json())
    .then((response) => {
      // console.log(response.softwares)
      state.softwares = response.softwares
      emitter.emit('render')
    })

  emitter.on('DOMContentLoaded', () => {
    document.addEventListener('scroll', () => {
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
    if (state.selectedLocations.indexOf(city) == -1) {
      state.selectedLocations.push(city)
    }
    emitter.emit('render')
  })
  emitter.on('deselect-location', (city) => {
    const index = state.selectedLocations.indexOf(city)
    if (index != -1) {
      state.selectedLocations.splice(index, 1)
    }
    emitter.emit('render')
  })
  emitter.on('select-skill', (skill) => {
    if (state.selectedSkills.indexOf(skill) == -1) {
      state.selectedSkills.push(skill)
    }
    emitter.emit('render')
  })
  emitter.on('deselect-skill', (skill) => {
    const index = state.selectedSkills.indexOf(skill)
    if (index != -1) {
      state.selectedSkills.splice(index, 1)
    }
    emitter.emit('render')
  })
  emitter.on('select-software', (software) => {
    if (state.selectedSoftwares.indexOf(software) == -1) {
      state.selectedSoftwares.push(software)
    }
    emitter.emit('render')
  })
  emitter.on('deselect-software', (software) => {
    const index = state.selectedSoftwares.indexOf(software)
    if (index != -1) {
      state.selectedSoftwares.splice(index, 1)
    }
    emitter.emit('render')
  })
  emitter.on('toggle-filter', (name) => {
    if (name == 'location') {
      state.isLocationOpen = !state.isLocationOpen
      state.isSkillsOpen = false
      state.isSoftwaresOpen = false
    }
    if (name == 'skills') {
      state.isLocationOpen = false
      state.isSkillsOpen = !state.isSkillsOpen
      state.isSoftwaresOpen = false
    }
    if (name == 'softwares') {
      state.isLocationOpen = false
      state.isSkillsOpen = false
      state.isSoftwaresOpen = !state.isSoftwaresOpen
    }
    emitter.emit('render')
  })
  emitter.on('close-filters', () => {
    state.isLocationOpen = false
    state.isSkillsOpen = false
    state.isSoftwaresOpen = false
    emitter.emit('render')
  })
}
