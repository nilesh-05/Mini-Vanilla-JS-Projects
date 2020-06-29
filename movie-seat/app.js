const container = document.querySelector(".container");
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); // query selectorall puts the results in a node list while query selector will select only one.
const count = document.getElementById('count')
const tota = document.getElementById('total')
const movieSelect = document.getElementById('movie')

let ticketPrice = parseInt(movieSelect.value)   //to get ticket price 

populateUI()

function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice',moviePrice)
}

function updateCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')

    //copy selected seats into array.
    //Map through an array
    //return  new array indexes
    //map method returns an array. forEach doesn't return anything
    const seatsIndex = [...selectedSeats].map(function (seat) {
        return [...seats].indexOf(seat)
    })
    // console.log(seats)
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))


    // console.log(selectedSeats)
    const seatCount = selectedSeats.length  

    count.innerText = seatCount
    total.innerText = seatCount * ticketPrice
}

//get data from local storage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    // console.log(selectedSeats)
    if (selectedSeats != null || selectedSeats.length != 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
    if (selectedMovieIndex != null) {
        movieSelect.selectedIndex = selectedMovieIndex
    }

}

//movie change event 
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex ,  e.target.value)
    updateCount()
})

//seat select
container.addEventListener('click', e => {
    //console.log(e.target)
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')

        updateCount()
    }
})

//initial count and total set
updateCount()