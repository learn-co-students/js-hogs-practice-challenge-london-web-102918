const apiURL = 'http://localhost:3000/hogs'
const hogContainer = document.getElementById('hog-container')
let hogs
const hogName = document.querySelector('input[name=name]')
const hogSpecialty = document.querySelector('input[name=specialty]')
const hogMedal = document.querySelector('input[name=medal]')
const hogWeight = document.querySelector('input[name=weight]')
const hogImage = document.querySelector('input[name=img]')
const hogGreased = document.querySelector('input[name=greased]')
const hogFormEl = document.querySelector('#hog-form')

const getHogs = () => {
  fetch(apiURL)
    .then(response => response.json())
    .then(json => {
      hogs = json
      console.log(hogs)
      showAllHogs(json)
    })
}

const showAllHogs = (json) => {
  for (const hog of json) {
    console.log(hog)
    showOneHog(hog)
  }
}

const showOneHog = (hog) => {
  let checked = hog.greased == true ? 'checked' : ''
  let hogDiv = document.createElement('div')
  hogDiv.className = 'hog-card'
  hogContainer.appendChild(hogDiv)
  hogDiv.innerHTML = `
  <h2>${hog.name}</h2>
  <img src='${hog.image}' alt='image of ${hog.name}.'>
  <p>Specialty: ${hog.specialty}</p>
  <p>Weight: ${hog['weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water']} tonnes
  `
  let hogCheckboxLabel = document.createElement('label')
  let hogCheckbox = document.createElement('input')
  hogCheckbox.type = 'checkbox'
  hogCheckbox.defaultChecked = checked
  hogCheckboxLabel.innerText = 'Greased?'
  hogDiv.appendChild(hogCheckboxLabel)
  hogCheckboxLabel.appendChild(hogCheckbox)
  hogCheckbox.addEventListener('click', () => patchHog(hog))
  let hogDeleteButtonDiv = document.createElement('div')
  let hogDeleteButton = document.createElement('button')
  hogDeleteButton = document.createElement('button')
  hogDeleteButton.innerText = `Send ${hog.name} to the abbatoir`
  hogDeleteButtonDiv.appendChild(hogDeleteButton)
  hogDiv.appendChild(hogDeleteButtonDiv)
  hogDeleteButton.addEventListener('click', () => deleteHog(hog))
}

const deleteHog = (hog) => {
  fetch(apiURL + '/' + hog.id, {
    method: 'DELETE'
  }).then(hogContainer.removeChild(hogContainer.childNodes[hog.id]))
}


const saveNewHog = (event) => {
  event.preventDefault()
  console.log(event)
  const name = hogName.value
  const specialty = hogSpecialty.value
  const medal = hogMedal.value
  const weight = hogWeight.value
  const image = hogImage.value
  const greased = hogGreased.checked

  showOneHog({
    name: name,
    specialty: specialty,
    'highest medal achieved': medal,
    'weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water':  weight,
    image: image,
    greased: greased
  })

  fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      specialty: specialty,
      'highest medal achieved': medal,
      'weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water': weight,
      image: image,
      greased: greased
    })
  })
}
const patchHog = (hog) => {
  let isGreased = () => {
    if (hog.greased) {
      return false
    } else {
      return true
    }
  }
  fetch(apiURL + '/' + hog.id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ greased: isGreased() })
  }).then(console.log(hog))
}
hogFormEl.addEventListener('submit', saveNewHog)
getHogs()
