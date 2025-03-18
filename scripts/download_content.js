console.log("TODO: Download content")

const fs = require('fs')
const apiUrl = 'http://localhost:3000/api'

console.log("downloading entries")
fetch(`${apiUrl}/entries`)
.then(r => r.json())
.then(r => {
  console.log("saving", r.entries.length, "entries")
  fs.writeFileSync('entries.json', JSON.stringify(r))
})
console.log("downloading locations")
fetch(`${apiUrl}/locations`)
.then(r => r.json())
.then(r => {
  console.log("saving", r.locations.length, "locations")
  fs.writeFileSync('locations.json', JSON.stringify(r))
})
console.log("downloading skills")
fetch(`${apiUrl}/skills`)
.then(r => r.json())
.then(r => {
  console.log("saving", r.skills.length, "skills")
  fs.writeFileSync('skills.json', JSON.stringify(r))
})
console.log("downloading softwares")
fetch(`${apiUrl}/softwares`)
.then(r => r.json())
.then(r => {
  console.log("saving", r.softwares.length, "softwares")
  fs.writeFileSync('softwares.json', JSON.stringify(r))
})
