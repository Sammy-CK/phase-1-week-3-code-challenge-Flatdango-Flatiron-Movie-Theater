const listMovies = document.getElementById('films')
const movieContainer = document.getElementById('movieContainer')

document.addEventListener('DOMContentLoaded', moviesLoaded)


//fetches all movie details upon page load
function moviesLoaded() {


    //First movie details load to DOM
    fetch('https://sammy-ck.github.io/db.json')
        .then(resp => resp.json())
        .then(data => createMovieDetailCard(data.films[0], movieContainer))


    fetch('https://sammy-ck.github.io/db.json')
        .then(resp => resp.json())
        .then(data => {

            (data.films).forEach(movie => {
                // menu for selecting a movie to show details
                const liMovie = document.createElement('li')
                liMovie.style.cursor = 'pointer'

                const pTitle = document.createElement('p')
                pTitle.innerText = movie.title
                liMovie.appendChild(pTitle)
                listMovies.appendChild(liMovie)

            })
        })
}

//Creates a movie detail card for fetch response of individual movies.
function createMovieDetailCard(data, tagToAppend) {
    const poster = document.createElement('img')
    poster.src = data.poster

    tagToAppend.appendChild(poster)

    const title = document.createElement('h2')
    title.innerText = data.title
    tagToAppend.appendChild(title)

    const runtime = document.createElement('p')
    runtime.innerHTML = `<b>Run time:</b> ${data.runtime}`
    tagToAppend.appendChild(runtime)

    const showtime = document.createElement('p')
    showtime.innerHTML = `<b>Show time:</b> ${data.showtime}
        <p><b>Available Tickets</b></p>`
    tagToAppend.appendChild(showtime)

    //Calculate available movie tickets
    const capacity = data.capacity
    const titcketsSold = data.tickets_sold
    let remainingTickets = capacity - titcketsSold

    const availableTickets = document.createElement('p')
    availableTickets.innerText = remainingTickets
    tagToAppend.appendChild(availableTickets)

    const description = document.createElement('p')
    description.innerText = data.description
    tagToAppend.appendChild(description)


    const buyTicketBtn = document.createElement('button')
    buyTicketBtn.innerText = 'BUY TICKET'

    //update DOM on available tickets
    buyTicketBtn.addEventListener('click', () => {
        if (remainingTickets > 1) {
            remainingTickets--
            availableTickets.innerText = remainingTickets
        } else {
            availableTickets.innerText = 0
            buyTicketBtn.disabled = true
            buyTicketBtn.innerText = 'SOLD OUT'
            buyTicketBtn.style.cursor = 'not-allowed'
            buyTicketBtn.style.backgroundColor = 'grey'
        }

    })
    tagToAppend.appendChild(buyTicketBtn)

}