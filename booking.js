

const SUPABASE_URL = "https://gqurgezuuytxrcmudnik.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxdXJnZXp1dXl0eHJjbXVkbmlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MTAyMjIsImV4cCI6MjA5MDE4NjIyMn0.1EW73snm3LvXPW0jK-g_-Klze0FyIbXI4dzv0J2XGr4";

const supabaseClient =
  window.supabase &&
  window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =======================
// 📦 HELPERS
// =======================
function getTourDataById(tourId) {
  if (!Array.isArray(MASTER_TOURS)) return null;
  return MASTER_TOURS.find((tour) => tour.id === tourId) || null;
}

async function fetchHotelesWeb() {
  if (!supabaseClient) return [];

  const { data, error } = await supabaseClient
    .from("hoteles")
    .select("*")
    .eq("activo", true)
    .order("nombre", { ascending: true });

  if (error) {
    console.error("Error cargando hoteles:", error);
    return [];
  }

  return data || [];
}

function getPickupForTour(hotelObj, tour) {
  if (!hotelObj || !hotelObj.pickups) return "";

  let horarios =
    hotelObj.pickups[tour.id] ||
    hotelObj.pickups[tour.name] ||
    [];

  if (!Array.isArray(horarios)) {
    horarios = horarios ? [horarios] : [];
  }

  return horarios.filter(Boolean)[0] || "";
}

// =======================
// 🚀 MAIN
// =======================
async function renderBookingWidget() {
  const widget = document.getElementById("booking-widget");
  if (!widget) return;

  const tour = getTourDataById(widget.dataset.tour);
  if (!tour) return;

  const hotelesData = await fetchHotelesWeb();

  let adults = 2;
  let children = 0;

  const bookingState = {
    date: "",
    time: tour.times?.[0] || "",
    hotel: "",
    fullName: "",
    email: "",
    phone: ""
  };

  const getTotal = () => adults * tour.adult + children * tour.child;

  const getCurrentPickupTime = () => {
    const hotel = hotelesData.find(h => h.nombre === bookingState.hotel);
    return getPickupForTour(hotel, tour);
  };

  // =======================
  // 📊 SUMMARY
  // =======================
  function getSummaryHtml() {
    return `
      <div class="booking-summary-card">
        <h4>Reservation summary</h4>
        <div class="booking-summary-list">
          <div><strong>Tour:</strong> ${tour.name}</div>
          <div><strong>Date:</strong> ${bookingState.date}</div>
          <div><strong>Time:</strong> ${bookingState.time}</div>
          <div><strong>Hotel:</strong> ${bookingState.hotel}</div>
          <div><strong>Pickup:</strong> ${getCurrentPickupTime() || "To be confirmed"}</div>
          <div><strong>Adults:</strong> ${adults}</div>
          <div><strong>Children:</strong> ${children}</div>
        </div>
        <strong>Total: $${getTotal()} USD</strong>
      </div>
    `;
  }

  // =======================
  // 💾 SAVE
  // =======================
  async function saveReservation(payment, status) {
    return await supabaseClient.from("reservations").insert([{
      client_name: bookingState.fullName,
      phone: bookingState.phone,
      email: bookingState.email,
      tour_slug: tour.id,
      tour_name: tour.name,
      hotel_name: bookingState.hotel,
      pickup_time: getCurrentPickupTime(),
      selected_date: bookingState.date,
      selected_time: bookingState.time,
      adults,
      children,
      total: getTotal(),
      source: "web",
      status,
      payment_method: payment
    }]);
  }

  // =======================
  // 🥇 STEP 1
  // =======================
  function renderStep1() {
    widget.innerHTML = `
      <div class="booking-card">
        <input type="date" id="date">
        <select id="time">
          ${tour.times.map(t => `<option>${t}</option>`).join("")}
        </select>

        <select id="hotel">
          <option value="">Select hotel</option>
          ${hotelesData.map(h => `<option>${h.nombre}</option>`).join("")}
        </select>

        <button id="next">Next</button>
      </div>
    `;

    document.getElementById("next").onclick = () => {
      bookingState.date = document.getElementById("date").value;
      bookingState.time = document.getElementById("time").value;
      bookingState.hotel = document.getElementById("hotel").value;

      if (!bookingState.date || !bookingState.hotel) {
        alert("Complete all fields");
        return;
      }

      renderStep2();
    };
  }

  // =======================
  // 🥈 STEP 2
  // =======================
  function renderStep2() {
    widget.innerHTML = `
      ${getSummaryHtml()}

      <input id="name" placeholder="Full name">
      <input id="email" placeholder="Email">
      <input id="phone" placeholder="Phone">

      <div id="paypal"></div>
      <button id="cash">Cash</button>
    `;

    const validate = () => {
      bookingState.fullName = document.getElementById("name").value;
      bookingState.email = document.getElementById("email").value;
      bookingState.phone = document.getElementById("phone").value;

      if (!bookingState.fullName || !bookingState.email || !bookingState.phone) {
        alert("Complete your info");
        return false;
      }
      return true;
    };

    // 💵 CASH
    document.getElementById("cash").onclick = async () => {
      if (!validate()) return;

      await saveReservation("cash", "pending");

      const msg = `Reservation ${tour.name} ${bookingState.date}`;
      window.location.href = `https://wa.me/18293319938?text=${encodeURIComponent(msg)}`;
    };

    // 💳 PAYPAL
    paypal.Buttons({
      createOrder: (data, actions) => {
        if (!validate()) throw new Error();

        return actions.order.create({
          purchase_units: [{
            amount: { value: getTotal().toFixed(2) }
          }]
        });
      },

      onApprove: async (data, actions) => {
        await actions.order.capture();
        await saveReservation("paypal", "paid");

        alert("Payment successful ✅");
        location.reload();
      }

    }).render("#paypal");
  }

  renderStep1();
}

document.addEventListener("DOMContentLoaded", renderBookingWidget);
