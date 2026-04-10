const SUPABASE_URL = "https://gqurgezuuytxrcmudnik.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxdXJnZXp1dXl0eHJjbXVkbmlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MTAyMjIsImV4cCI6MjA5MDE4NjIyMn0.1EW73snm3LvXPW0jK-g_-Klze0FyIbXI4dzv0J2XGr4";

const supabase = window.supabase.createClient(
  SUPABASE_URL, 
  SUPABASE_ANON_KEY);

async function getTourDataBySlug(slug) {
  const { data: tour, error: tourError } = await supabase
    .from("tours")
    .select("*")
    .eq("slug", slug)
    .single();

  if (tourError || !tour) {
    console.error("Error loading tour:", tourError);
    return { tour: null, times: [], hotels: [] };
  }

  const { data: times, error: timesError } = await supabase
    .from("tour_times")
    .select("*")
    .eq("tour_id", tour.id)
    .eq("active", true);

  if (timesError) {
    console.error("Error loading times:", timesError);
  }

  const { data: hotels, error: hotelsError } = await supabase
    .from("tour_hotels")
    .select("*")
    .eq("tour_id", tour.id)
    .eq("active", true);

  if (hotelsError) {
    console.error("Error loading hotels:", hotelsError);
  }

  return {
    tour,
    times: times || [],
    hotels: hotels || []
  };
}

async function renderBookingWidget() {
  const widget = document.getElementById("booking-widget");
  if (!widget) return;

  const tourKey = widget.dataset.tour;
  const { tour, times, hotels } = await getTourDataBySlug(tourKey);

  if (!tour) {
    widget.innerHTML = "<p>Tour data not available.</p>";
    return;
  }

  widget.innerHTML = `
    <div class="booking-card">
      <div class="booking-price-top">
        <span class="booking-price-label">From</span>
        <strong>$${tour.adult_price} USD</strong>
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
            ${
              times.length
                ? times.map((item) => `<option value="${item.time_label}">${item.time_label}</option>`).join("")
                : `<option value="">No times available</option>`
            }
          </select>
        </div>

        <div class="booking-field">
          <label>Duration</label>
          <input type="text" class="booking-input" value="${tour.duration || "Full day"}" readonly />
        </div>
      </div>

      <div class="booking-field">
        <label for="booking-hotel">Pickup hotel</label>
        <select id="booking-hotel" class="booking-input">
          <option value="">Select hotel</option>
          ${hotels.map((item) => `<option value="${item.hotel_name}">${item.hotel_name}</option>`).join("")}
        </select>
      </div>

      <div class="booking-people">
        <h4>People</h4>

        <div class="booking-person-row">
          <div>
            <strong>Adults</strong>
            <span>$${tour.adult_price} USD each</span>
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
            <span>$${tour.child_price} USD each</span>
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
        <strong id="booking-total">$${tour.adult_price * 2} USD</strong>
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

    const total = adults * tour.adult_price + children * tour.child_price;
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
    const selectedTime = timeEl.value || "not selected";
    const selectedHotel = hotelEl.value || "not selected";
    const total = adults * tour.adult_price + children * tour.child_price;

    const message =
      `Hello PCG Tours, I want to reserve ${tour.name}. ` +
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
