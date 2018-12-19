const hogApi = "http://localhost:3000/hogs"
const hogContainer = document.querySelector('#hog-container')
const hogName = document.querySelector('input[name=name]')
const hogSpecialty = document.querySelector('input[name=specialty]')
const hogMedal = document.querySelector('input[name=medal]')
const hogWeight = document.querySelector('input[name=weight]')
const hogImage = document.querySelector('input[name=img]')
const hogGreased = document.querySelector('input[name=greased]')
const hogFormEl = document.querySelector('#hog-form')

let state

const fetchHogs = () => {
    fetch(hogApi)
        .then(res => res.json())
        .then(renderHogs)
}

const renderHogs = (hogArray) => {
    console.log(hogArray)

    hogArray.forEach(renderSingleHog)
}

const renderSingleHog = (hog) => {
    let checked = hog.greased == true ? 'checked' : ''
    const hogEl = document.createElement('div')
    hogEl.className = 'hog-card'
    hogEl.innerHTML = `
        <h1>${hog.name}</h1>
        <p>${hog.specialty}</p>
        <input class="toggle" type="checkbox" id="greased" name="greased" ${checked}><label for="greased">${hog.greased}</label>
        <p>${hog['weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water']}</p>
        <p>${hog['highest medal achieved']}</p>
        <img src=${hog.image}><br>
        <button class="delete-btn">Delete</button>
    `
    hogContainer.appendChild(hogEl)

    const hogDeleteBtn = hogEl.querySelector('.delete-btn')

    hogDeleteBtn.addEventListener('click', (e) => {
        state = hog.id
        event.preventDefault()
        fetch(hogApi + '/' + state, {
            method: 'DELETE'
        }).then(hogEl.remove())
        .then(res => res.json())
    })

    // const deleteHog = (event) => {
    //     event.preventDefault()
    //     fetch(hogApi + `/${state}`, {
    //         method: 'DELETE'
    //     }).then(hogFormEl.remove())
    //     .then(res => res.json())
    // }
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

    renderSingleHog({
        name: name,
        specialty: specialty,
        'highest medal achieved': medal,
        'weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water':  weight,
        image: image,
        greased: greased
    })

    fetch(hogApi, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            specialty: specialty,
            'highest medal achieved': medal,
            'weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water': weight,
            image: image,
            greased: greased
        })
    }).then(console.log)

}

fetchHogs()
hogFormEl.addEventListener('submit', saveNewHog)

