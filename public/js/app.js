console.log('Client side javascript')

fetch('http://localhost:3000/weather?address=!').then((response) => {
    response.json().then((data) => {

        if (data.error) {
            console.log(data.error)
        }
        else {
            console.log(data.location)
            console.log(data.forcastData)
        }
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

console.log(search)



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const add = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''



    fetch(`http://localhost:3000/weather?address=${add}`).then((response) => {
        response.json().then((data) => {

            if (data.error) {

                messageOne.textContent = data.error
                // console.log(data.error)
            }
            else {

                messageOne.textContent = data.location
                messageTwo.textContent = data.forcastData
                // console.log(data.location)
                // console.log(data.forcastData)
            }
        })
    })


})