const hogsURL = 'http://localhost:3000/hogs'


document.addEventListener('DOMContentLoaded', () => {


    const addNewHog = (e) => {
        e.preventDefault()
        const inputName = e.target.querySelector('input[name="name"]')
        const inputSpecialty = e.target.querySelector('input[name="specialty"]')
        const inputMedal = e.target.querySelector('input[name="medal"]')
        const inputWeight = e.target.querySelector('input[name="weight"]')
        const inputImg = e.target.querySelector('input[name="img"]')
        const inputGrease = e.target.querySelector('input[name="greased"]')

        const newHog = {
            name: inputName.value,
            specialty: inputSpecialty.value,
            greased: inputGrease.checked,
            "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water": inputWeight.value,
            "highest medal achieved": inputMedal.value,
            image: inputImg.value
        }

        fetch(hogsURL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify(newHog)
        }).then(response => response.json())
        .then(renderSingleHog)

    }

    const hogForm = document.querySelector('#hog-form')
    hogForm.addEventListener('submit', addNewHog)



    fetch(hogsURL)
    .then(response => response.json())
    .then(renderHogs)

})

const renderHogs = hogs => {
    hogs.forEach(renderSingleHog)
}

const renderSingleHog = hog => {
    const displayHogs = document.querySelector('#hog-container')
    let newHogDiv = document.createElement('div')
    newHogDiv.className = 'hog-card'

    newHogDiv.innerHTML =
    `
    Name: ${hog.name} 
    <br>
    Specialty: ${hog.specialty}
    <br>
    Greased: <input type="checkbox" data-id=${hog.id} name="greased" value="greased"></span>
    <br>
    Weight: ${hog["weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water"]}
    <br>
    Highest Medal Achieved: ${hog["highest medal achieved"]}
    <br>
    <img src="${hog.image}">
    <br>
    <button> Delete Hog </button
    `
    


    displayHogs.appendChild(newHogDiv)

    const checkBox = newHogDiv.querySelector(`[data-id="${hog.id}"]`)
    hog.greased === true ? checkBox.checked = true : checkBox.checked = false

    const editHog = () => {
        const currentHog = {
        
            greased: checkBox.checked
          
        }

        fetch(`${hogsURL}/${hog.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(currentHog)
        }).then(response => response.json())
        .then(data => console.log(currentHog))
    }



    checkBox.addEventListener('click', editHog)

    const deleteButton = newHogDiv.querySelector('button')

    deleteButton.addEventListener('click', () => {
        fetch(`${hogsURL}/${hog.id}`, {
            method: 'DELETE'
        }).then(newHogDiv.remove())
    })

}