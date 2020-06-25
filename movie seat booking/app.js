const container = document.querySelector(".container");
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); // query selectorall puts the results in a node list while query selector will select only one.
const count = document.getElementById('count')
const tota = document.getElementById('total')
const movieSelect = document.getElementById('movie')

let ticketPrice = parseInt(movieSelect.value)   //to get ticket price 

function updateCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    // console.log(selectedSeats)
    const seatCount = selectedSeats.length  

    count.innerText = seatCount
    total.innerText = seatCount * ticketPrice
}

//movie change event 
movieSelect.addEventListener('change', e => {
    ticketPrice = parseInt(e.target.value)
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

