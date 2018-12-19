const apiURL = "http://localhost:3000/hogs"
const hogFormEl = document.querySelector('#hog-form')
const hogContainerEl = document.querySelector('#hog-container')
const nameInputEl = document.querySelector('#nameInput')
const specialtyInputEl = document.querySelector('#specialtyInput')
const medalInputEl = document.querySelector('#medalInput')
const weightInputEl = document.querySelector('#weightInput')
const imgInputEl = document.querySelector('#imgInput')
const greasedInputEl = document.querySelector('#greasedInput')
let state

const fetchHogs = () => {
  fetch(apiURL)
    .then(response => response.json())
    .then(renderHogs)
}



const renderHogs = (hogsArray) => {
  console.log(hogsArray)
  hogsArray.forEach(renderSingleHog)
}

const renderSingleHog = (hog) => {
  let checked = hog.greased == true ? 'checked' : ''

const hogEl = document.createElement('div')
  hogEl.className = 'hog-card'
  hogEl.innerHTML = `<h1>${hog.name}</h1>
  <p>${hog.specialty}</p>
  <input type="checkbox" id="myCheck" value='greased' ${checked}>
  <p>${hog["weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water"]}</p>
  <p>${hog["highest medal achieved"]}</p>
  <img src=${hog.image}>
  <br>
  <button type="button" id='delete_button' data-id=${hog.id}>Delete</button>
  `

  let checkBoxHog = document.querySelector('#myCheck')

  const deleteButton = hogEl.querySelector('#delete_button')

  deleteButton.addEventListener('click', (e) => {
    state = hog.id
    event.preventDefault()
      fetch(apiURL + "/" + state,{
        method: 'DELETE'
      }).then(function(){
        hogEl.remove()
      })

  })


  hogContainerEl.append(hogEl)
}

const saveNewHog = (e) => {
  e.stopPropagation()
  console.log(e)
  const name = nameInputEl.value
  const specialty = specialtyInputEl.value
  const medal = medalInputEl.value
  const weight = weightInputEl.value
  const imgURL = imgInputEl.value
  const greased = greasedInputEl.checked

  renderSingleHog({
    name: name,
    specialty: specialty,
    greased: greased,
    "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": weight,
    "highest medal achieved": medal,
    image: imgURL
  })

  fetch(apiURL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      specialty: specialty,
      greased: greased,
      "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": weight,
      "highest medal achieved": medal,
      image: imgURL
    })
  }).then(console.log)
}

hogFormEl.addEventListener('submit', saveNewHog)

fetchHogs()
