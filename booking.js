const toursData = {
  "saona-classic": {
    title: "Saona Classic",
    basePriceLabel: "From $89 USD",
    adultPrice: 89,
    childPrice: 45,
    times: ["7:00 AM", "8:00 AM", "9:00 AM"],
    hotels: [
      "Hard Rock Hotel",
      "RIU Republica",
      "Barceló Bávaro",
      "Meliá Caribe Beach",
      "Majestic Colonial"
    ]
  },

  "saona-vip": {
    title: "Saona VIP",
    basePriceLabel: "From $109 USD",
    adultPrice: 109,
    childPrice: 55,
    times: ["7:00 AM", "8:00 AM"],
    hotels: [
      "Hard Rock Hotel",
      "RIU Republica",
      "Barceló Bávaro",
      "Meliá Caribe Beach",
      "Majestic Colonial"
    ]
  },

  "saona-luxury": {
    title: "Saona Luxury",
    basePriceLabel: "From $139 USD",
    adultPrice: 139,
    childPrice: 70,
    times: ["7:00 AM", "8:00 AM"],
    hotels: [
      "Hard Rock Hotel",
      "RIU Republica",
      "Barceló Bávaro",
      "Meliá Caribe Beach",
      "Majestic Colonial"
    ]
  },
    "buggies-classic": {
    title: "Buggies Classic",
    basePriceLabel: "From $65 USD",
    adultPrice: 65,
    childPrice: 40,
    times: ["8:00 AM", "10:00 AM", "2:00 PM"],
    hotels: [
      "Hard Rock Hotel",
      "RIU Republica",
      "Barceló Bávaro",
      "Meliá Caribe Beach",
      "Majestic Colonial"
    ]
  },

  "buggies-prime": {
    title: "Buggies Prime",
    basePriceLabel: "From $79 USD",
    adultPrice: 79,
    childPrice: 45,
    times: ["8:00 AM", "10:00 AM", "2:00 PM"],
    hotels: [
      "Hard Rock Hotel",
      "RIU Republica",
      "Barceló Bávaro",
      "Meliá Caribe Beach",
      "Majestic Colonial"
    ]
  },

  "buggies-night": {
    title: "Buggies Night",
    basePriceLabel: "From $89 USD",
    adultPrice: 89,
    childPrice: 50,
    times: ["6:00 PM", "7:00 PM"],
    hotels: [
      "Hard Rock Hotel",
      "RIU Republica",
      "Barceló Bávaro",
      "Meliá Caribe Beach",
      "Majestic Colonial"
    ]
  },

  "buggies-blast": {
    title: "Buggies Blast",
    basePriceLabel: "From $95 USD",
    adultPrice: 95,
    childPrice: 55,
    times: ["8:00 AM", "11:00 AM", "3:00 PM"],
    hotels: [
      "Hard Rock Hotel",
      "RIU Republica",
      "Barceló Bávaro",
      "Meliá Caribe Beach",
      "Majestic Colonial"
    ]
  },
    "samana-cayo-levantado": {
    title: "Samaná & Cayo Levantado",
    basePriceLabel: "From $110 USD",
    adultPrice: 110,
    childPrice: 65,
    times: ["6:30 AM", "7:00 AM"],
    hotels: [
      "Hard Rock Hotel",
      "RIU Republica",
      "Barceló Bávaro",
      "Meliá Caribe Beach",
      "Majestic Colonial"
    ]
  },

  "samana-cayo-limon": {
    title: "Samaná + Cayo + El Limón",
    basePriceLabel: "From $125 USD",
    adultPrice: 125,
    childPrice: 75,
    times: ["6:30 AM", "7:00 AM"],
    hotels: [
      "Hard Rock Hotel",
      "RIU Republica",
      "Barceló Bávaro",
      "Meliá Caribe Beach",
      "Majestic Colonial"
    ]
  },

  "samana-cayo-ballenas": {
    title: "Samaná + Whale Watching",
    basePriceLabel: "From $135 USD",
    adultPrice: 135,
    childPrice: 80,
    times: ["6:00 AM", "6:30 AM"],
    hotels: [
      "Hard Rock Hotel",
      "RIU Republica",
      "Barceló Bávaro",
      "Meliá Caribe Beach",
      "Majestic Colonial"
    ]
  }

};

function renderBookingWidget() {
  const widget = document.getElementById("booking-widget");
  if (!widget) return;

  const tourKey = widget.dataset.tour;
  const tour = toursData[tourKey];

  if (!tour) {
    widget.innerHTML = "<p>Tour data not available.</p>";
    return;
  }

  widget.innerHTML = `
    <div class="booking-card">
      <div class="booking-price-top">
        <span class="booking-price-label">From</span>
        <strong>${tour.basePriceLabel.replace("From ", "")}</strong>
        <small>Price per adult</small>
      </div>

      <div class="booking-field">
        <label for="booking-date">Select date</label>
        <input type="date" id="booking-date" class="booking-input" />
      </div>

      <div class="booking-field-grid">
        <div class="booking-field">
          <label for="booking-time">Start time</label>
          <select id="booking-time" class="booking-input">
            ${tour.times.map(time => `<option value="${time}">${time}</option>`).join("")}
          </select>
        </div>

        <div class="booking-field">
          <label>Duration</label>
          <input type="text" class="booking-input" value="Full day" readonly />
        </div>
      </div>

      <div class="booking-field">
        <label for="booking-hotel">Pickup hotel</label>
        <select id="booking-hotel" class="booking-input">
          ${tour.hotels.map(hotel => `<option value="${hotel}">${hotel}</option>`).join("")}
        </select>
      </div>

      <div class="booking-people">
        <h4>People</h4>

        <div class="booking-person-row">
          <div>
            <strong>Adults</strong>
            <span>$${tour.adultPrice} USD each</span>
          </div>
          <div class="qty-control">
            <button type="button" class="qty-btn" data-type="adult" data-action="minus">−</button>
            <span id="adult-count">2</span>
            <button type="button" class="qty-btn" data-type="adult" data-action="plus">+</button>
          </div>
        </div>

        <div class="booking-person-row">
          <div>
            <strong>Children</strong>
            <span>$${tour.childPrice} USD each</span>
          </div>
          <div class="qty-control">
            <button type="button" class="qty-btn" data-type="child" data-action="minus">−</button>
            <span id="child-count">0</span>
            <button type="button" class="qty-btn" data-type="child" data-action="plus">+</button>
          </div>
        </div>
      </div>

      <div class="booking-total-box">
        <span>Total</span>
        <strong id="booking-total">$178 USD</strong>
      </div>

      <div class="booking-actions">
        <button type="button" id="booking-reserve-btn" class="btn btn-primary booking-btn-full">
          Reserve now
        </button>
      </div>
    </div>
  `;

  let adults = 2;
  let children = 0;

  const adultCountEl = document.getElementById("adult-count");
  const childCountEl = document.getElementById("child-count");
  const totalEl = document.getElementById("booking-total");
  const dateEl = document.getElementById("booking-date");
  const timeEl = document.getElementById("booking-time");
  const hotelEl = document.getElementById("booking-hotel");
  const reserveBtn = document.getElementById("booking-reserve-btn");

  function updateTotals() {
    adultCountEl.textContent = adults;
    childCountEl.textContent = children;

    const total = adults * tour.adultPrice + children * tour.childPrice;
    totalEl.textContent = `$${total} USD`;
  }

  function updateMinDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    dateEl.min = `${yyyy}-${mm}-${dd}`;
  }

  widget.querySelectorAll(".qty-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.type;
      const action = btn.dataset.action;

      if (type === "adult") {
        if (action === "plus") adults++;
        if (action === "minus" && adults > 1) adults--;
      }

      if (type === "child") {
        if (action === "plus") children++;
        if (action === "minus" && children > 0) children--;
      }

      updateTotals();
    });
  });

  reserveBtn.addEventListener("click", () => {
    const selectedDate = dateEl.value || "not selected";
    const selectedTime = timeEl.value;
    const selectedHotel = hotelEl.value;
    const total = adults * tour.adultPrice + children * tour.childPrice;

    const message =
      `Hello PCG Tours, I want to reserve ${tour.title}. ` +
      `Date: ${selectedDate}. ` +
      `Time: ${selectedTime}. ` +
      `Hotel: ${selectedHotel}. ` +
      `Adults: ${adults}. Children: ${children}. ` +
      `Total: $${total} USD.`;

    const whatsappUrl = `https://wa.me/18293319938?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  });

  updateMinDate();
  updateTotals();
}

document.addEventListener("DOMContentLoaded", renderBookingWidget);
