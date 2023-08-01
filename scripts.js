const seats = document.querySelectorAll(".seat");
const selectedSeatsNumbers = document.getElementById("selected-seats-numbers");
const continueButton = document.getElementById("continue-button");
const selectedSeatsCount = document.getElementById("selected-seats-count");
const totalPrice = document.getElementById("total-price");

let selectedSeats = [];
let totalCost = 0;
let hoverTimeout;

window.addEventListener("scroll", function () {
  const busContainer = document.querySelector(".bus-container");
  const seatTypes = document.querySelector(".seat-types");
  const scrollX = window.scrollX || window.pageXOffset;

  // If the user scrolls to the left, show the "Know Your Seat" section
  if (scrollX > 0) {
    busContainer.classList.add("show-seat-types");
  } else {
    busContainer.classList.remove("show-seat-types");
  }
});

// Function to update the selected seats count and numbers
function updateSelectedSeatsDetails() {
  selectedSeatsCount.textContent = selectedSeats.length;
  selectedSeatsNumbers.textContent = selectedSeats.join(", ");
}

// Function to handle the "Continue" button click event
function handleContinueButtonClick() {
  if (selectedSeats.length === 0) {
    alert("Please select at least one seat before continuing.");
  } else {
    alert("Continue to the next step with the selected seats.");
    // Add your code for the next steps after clicking the "Continue" button here.
  }
}

// Add event listener to the "Continue" button
continueButton.addEventListener("click", handleContinueButtonClick);

// Function to check if a seat is booked
function isSeatBooked(seat) {
  return seat.classList.contains("booked");
}

// Function to check if a seat is for women only
function isWomenSeat(seat) {
  return seat.classList.contains("women");
}

// Function to update the selected seats and total cost
function updateSelectedSeats() {
  selectedSeats.forEach((seatId) => {
    const seatNumber = seatId.split("-")[1];
    selectedSeatsNumbers.textContent += ` ${seatNumber},`;
  });

  totalPrice.textContent = totalCost + "₹";
}

// Function to handle the click event on seats
function handleSeatClick(seat) {
  if (isSeatBooked(seat)) {
    alert("Seat is already booked. Please select another seat.");
    return;
  }

  if (seat.classList.contains("women-booked")) {
    alert("This seat is booked by women and cannot be selected.");
    return;
  }

  if (!seat.classList.contains("selected")) {
    const seatPrice = parseInt(seat.getAttribute("data-price"));
    totalCost += seatPrice;
    selectedSeats.push(seat.id);
    seat.classList.add("selected");
  } else {
    const seatPrice = parseInt(seat.getAttribute("data-price"));
    totalCost -= seatPrice;
    selectedSeats = selectedSeats.filter((seatId) => seatId !== seat.id);
    seat.classList.remove("selected");
  }

  selectedSeatsNumbers.textContent = ""; // Clear the previous selected seats
  updateSelectedSeats();
  updateSelectedSeatsDetails();
}

// Function to randomly book some seats
function randomBookSeats() {
  const numberOfBookedSeats = 5; // Change the number of booked seats as per your requirement
  const availableSeats = Array.from(
    document.querySelectorAll(".seat.available:not(.booked):not(.women)")
  );

  for (let i = 0; i < numberOfBookedSeats; i++) {
    const randomIndex = Math.floor(Math.random() * availableSeats.length);
    const bookedSeat = availableSeats[randomIndex];

    if (bookedSeat) {
      bookedSeat.classList.add("booked");
      availableSeats.splice(randomIndex, 1);
    }
  }
}

// Call the function to randomly book seats on page load
randomBookSeats();

// Function to randomly book more seats as "Booked by Women"
function randomBookSeatsByWomen() {
  const numberOfWomenBookedSeats = 5; // Change the number of women-booked seats as per your requirement
  const availableSeats = Array.from(
    document.querySelectorAll(".seat.available:not(.booked):not(.women)")
  );

  for (let i = 0; i < numberOfWomenBookedSeats; i++) {
    const randomIndex = Math.floor(Math.random() * availableSeats.length);
    const bookedWomenSeat = availableSeats[randomIndex];

    if (bookedWomenSeat) {
      bookedWomenSeat.classList.add("booked", "women-booked");
      availableSeats.splice(randomIndex, 1);
    }
  }
}

// Call the function to randomly book seats by women on page load
randomBookSeatsByWomen();

// Function to handle seat hover and show seat price
function showSeatPrice(seat) {
  if (hoverTimeout) clearTimeout(hoverTimeout);

  const seatPrice = seat.getAttribute("data-price");
  const seatNumber = seat.id.split("-")[1];
  const tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");
  tooltip.textContent = `No${seatNumber} - ${seatPrice} ₹`;

  seatDetails.innerHTML = "";
  seatDetails.appendChild(tooltip);

  hoverTimeout = setTimeout(() => {
    seatDetails.innerHTML = "";
  }, 1000);
}

// Function to hide seat price tooltip
function hideSeatPrice() {
  if (hoverTimeout) clearTimeout(hoverTimeout);
  seatDetails.innerHTML = "";
}

// Add event listeners to seats
seats.forEach((seat) => {
  seat.addEventListener("click", () => {
    handleSeatClick(seat);
  });

  seat.addEventListener("mouseover", () => {
    showSeatPrice(seat);
  });

  seat.addEventListener("mouseout", () => {
    hideSeatPrice();
  });
});
