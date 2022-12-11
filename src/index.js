document.addEventListener('DOMContentLoaded', () => {

    const listMovies = document.getElementById('films')

    const movieContainer = document.getElementById('movieContainer')

    const posterDiv = document.getElementById('posterDiv')

    fetch('http://localhost:3000/films/1')
    .then(resp => resp.json())
    .then(data => createMovieDetailCard(data, movieContainer))


    fetch('http://localhost:3000/films')
    .then(resp => resp.json())
    .then(data => {
        
        data.forEach(movie => {
            const liMovie = document.createElement('li')

            liMovie.addEventListener('click', () => {
                movieContainer.innerHTML = ''
                fetch(`http://localhost:3000/films/${movie.id}`)
                .then(resp => resp.json())
                .then(data => {
                    createMovieDetailCard(data, movieContainer)
                })


            })

            const pTitle = document.createElement('p')
            pTitle.innerText = movie.title
            liMovie.appendChild(pTitle)
            listMovies.appendChild(liMovie)
        })

    })


    
})

/**
* createMovieDetailsCard : Creates a movie detail card for movie.
*   
*   @data: fetch request response for individual movie
**/
function createMovieDetailCard(data, tagToAppend) {
    const poster = document.createElement('img')
        poster.src = data.poster

        tagToAppend.appendChild(poster)

        const title = document.createElement('h2')
        title.innerText = data.title
        tagToAppend.appendChild(title)

        const runtime = document.createElement( 'p')
        runtime.innerHTML = `<b>Run time:</b> ${data.runtime}`
        tagToAppend.appendChild(runtime)

        const showtime = document.createElement( 'p')
        showtime.innerHTML = `<b>Show time:</b> ${data.showtime}
        <p><b>Available Tickets</b></p>`
        tagToAppend.appendChild(showtime)


        const capacity = data.capacity
        const titcketsSold = data.tickets_sold
        let remainingTickets = capacity - titcketsSold

        const availableTickets = document.createElement('p')
        availableTickets.innerText =  remainingTickets
        tagToAppend.appendChild(availableTickets)

        const description = document.createElement( 'p')
        description.innerText = data.description
        tagToAppend.appendChild(description)


        const buyTicketBtn = document.createElement('button')
        buyTicketBtn.innerText = 'BUY TICKET'
        buyTicketBtn.addEventListener('click',() => {
            if(remainingTickets > 1){
                remainingTickets--
               availableTickets.innerText =  remainingTickets
            }else{
                availableTickets.innerText = 0
                buyTicketBtn.disabled = true
                buyTicketBtn.innerText = 'SOLD OUT'
            }

            

        })
        tagToAppend.appendChild(buyTicketBtn)

}