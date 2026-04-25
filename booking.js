

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
  .order("nombre", { ascending: true });

  if (error) {
    console.error("Error cargando hoteles:", error);
    return [];
  }

  return data || [];
}

async function fetchProductoWebBySlug(slug) {
  if (!supabaseClient || !slug) return null;

  const { data, error } = await supabaseClient
    .from("productos")
    .select("*")
    .eq("slug", slug)
    .eq("activo_web", true)
    .single();

  if (error) {
    console.warn("Producto web no encontrado o inactivo:", slug, error);
    return null;
  }

  return data;
}

function getPickupForTour(hotelObj, tour, selectedTime = "") {
  if (!hotelObj || !hotelObj.pickups) return "";

  const pickups = hotelObj.pickups;

  const tourPickups =
    pickups[tour.id] ||
    pickups[tour.slug] ||
    pickups[tour.name] ||
    null;

  if (!tourPickups) return "";

  if (Array.isArray(tourPickups)) {
    return tourPickups.filter(Boolean)[0] || "";
  }

  if (typeof tourPickups === "object") {
    const pickup =
      tourPickups[selectedTime] ||
      tourPickups.default ||
      "";

    return pickup || "";
  }

  return tourPickups || "";
}

// =======================
// 🚀 MAIN
// =======================
async function renderBookingWidget() {
  const widget = document.getElementById("booking-widget");
  if (!widget) return;

  const tourKey = widget.dataset.tour;
const baseTour = getTourDataById(tourKey);

if (!baseTour) {
  widget.innerHTML = "<p>Tour data not available.</p>";
  return;
}

const productoWeb = await fetchProductoWebBySlug(tourKey);

const tour = {
  ...baseTour,
  name: productoWeb?.nombre || baseTour.name,
  adult: Number(productoWeb?.adulto ?? baseTour.adult),
  child: Number(productoWeb?.nino ?? baseTour.child),
  times: Array.isArray(productoWeb?.horarios) && productoWeb.horarios.length
    ? productoWeb.horarios
    : (baseTour.times || [])
};

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
  const hotel = hotelesData.find((h) => h.nombre === bookingState.hotel);
  return getPickupForTour(hotel, tour, bookingState.time);
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
          <div><strong>Date:</strong> ${bookingState.date || "Not selected"}</div>
          <div><strong>Time:</strong> ${bookingState.time || "Not selected"}</div>
          <div><strong>Hotel:</strong> ${bookingState.hotel || "Not selected"}</div>
          <div><strong>Pickup:</strong> ${getCurrentPickupTime() || "To be confirmed"}</div>
          <div><strong>Adults:</strong> ${adults}</div>
          <div><strong>Children:</strong> ${children}</div>
        </div>
        <div class="booking-summary-total">
          <span>Total</span>
          <strong>$${getTotal()} USD</strong>
        </div>
      </div>
    `;
  }

  // =======================
  // 💾 SAVE
  // =======================
  async function saveReservation(payment, status) {
    if (!supabaseClient) {
      return {
        ok: false,
        error: { message: "Supabase client not available." }
      };
    }

    const { error } = await supabaseClient
      .from("reservations")
      .insert([
        {
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
        }
      ]);

    if (error) {
      console.error("SUPABASE INSERT ERROR:", error);
      return { ok: false, error };
    }

    return { ok: true };
  }

  // =======================
  // 💳 PAYPAL
  // =======================
  function renderPayPalButtons(validateStep2) {
    const container = document.getElementById("paypal-button-container");

    if (!container) return;

    if (typeof paypal === "undefined") {
      container.innerHTML = `<p style="color:red;">PayPal failed to load.</p>`;
      return;
    }

    container.innerHTML = "";

    paypal.Buttons({
      createOrder: function (data, actions) {
        if (!validateStep2()) {
          throw new Error("Please complete full name, email, and phone.");
        }

        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: getTotal().toFixed(2)
              },
              description: tour.name
            }
          ]
        });
      },

      onApprove: async function (data, actions) {
        await actions.order.capture();

        const result = await saveReservation("paypal", "paid");

        if (!result.ok) {
          alert("Payment received, but reservation could not be saved.");
          return;
        }

        alert("Payment completed successfully ✅");
        window.location.reload();
      },

      onError: function (err) {
        console.error("PayPal error:", err);
        alert("Error with PayPal checkout.");
      }
    }).render("#paypal-button-container");
  }

  // =======================
  // 🥇 STEP 1
  // =======================
  function renderStep1() {
    widget.innerHTML = `
      <div class="booking-card">
        <div class="booking-price-top">
          <span class="booking-price-label">From</span>
          <strong>$${tour.adult} USD</strong>
          <small>Price per adult</small>
        </div>

        <div class="booking-field">
          <label for="booking-date">Select date</label>
          <input
            type="date"
            id="booking-date"
            class="booking-input"
            value="${bookingState.date}"
          />
        </div>

        <div class="booking-field-grid">
          <div class="booking-field">
            <label for="booking-time">Start time</label>
            <select id="booking-time" class="booking-input">
              ${tour.times.map((time) => `
                <option value="${time}" ${bookingState.time === time ? "selected" : ""}>
                  ${time}
                </option>
              `).join("")}
            </select>
          </div>

          <div class="booking-field">
            <label>Duration</label>
            <input
              type="text"
              class="booking-input"
              value="Full day"
              readonly
            />
          </div>
        </div>

        <div class="booking-field">
          <label for="booking-hotel">Pickup hotel</label>
          <select id="booking-hotel" class="booking-input">
            <option value="">Select hotel</option>
            ${hotelesData.map((hotel) => `
              <option value="${hotel.nombre}" ${bookingState.hotel === hotel.nombre ? "selected" : ""}>
                ${hotel.nombre}
              </option>
            `).join("")}
          </select>
        </div>

        <div class="booking-people">
          <h4>People</h4>

          <div class="booking-person-row">
            <div>
              <strong>Adults</strong>
              <span>$${tour.adult} USD each</span>
            </div>
            <div class="qty-control">
              <button type="button" class="qty-btn" data-type="adult" data-action="minus">−</button>
              <span id="adult-count">${adults}</span>
              <button type="button" class="qty-btn" data-type="adult" data-action="plus">+</button>
            </div>
          </div>

          <div class="booking-person-row">
            <div>
              <strong>Children</strong>
              <span>$${tour.child} USD each</span>
            </div>
            <div class="qty-control">
              <button type="button" class="qty-btn" data-type="child" data-action="minus">−</button>
              <span id="child-count">${children}</span>
              <button type="button" class="qty-btn" data-type="child" data-action="plus">+</button>
            </div>
          </div>
        </div>

        <div class="booking-total-box">
          <span>Total</span>
          <strong id="booking-total">$${getTotal()} USD</strong>
        </div>

        <div class="booking-actions">
          <button type="button" id="booking-next-btn" class="btn btn-primary booking-btn-full">
            Next
          </button>
        </div>
      </div>
    `;

    const dateEl = document.getElementById("booking-date");
    const timeEl = document.getElementById("booking-time");
    const hotelEl = document.getElementById("booking-hotel");
    const nextBtn = document.getElementById("booking-next-btn");
    const totalEl = document.getElementById("booking-total");
    const adultCountEl = document.getElementById("adult-count");
    const childCountEl = document.getElementById("child-count");

    function updateMinDate() {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      dateEl.min = `${yyyy}-${mm}-${dd}`;
    }

    function updateTotals() {
      adultCountEl.textContent = adults;
      childCountEl.textContent = children;
      totalEl.textContent = `$${getTotal()} USD`;
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

    nextBtn.addEventListener("click", () => {
      bookingState.date = dateEl.value;
      bookingState.time = timeEl.value;
      bookingState.hotel = hotelEl.value;

      if (!bookingState.date || !bookingState.time || !bookingState.hotel) {
        alert("Please complete date, time, and hotel before continuing.");
        return;
      }

      renderStep2();
    });

    updateMinDate();
    updateTotals();
  }

  // =======================
  // 🥈 STEP 2
  // =======================
  function renderStep2() {
    widget.innerHTML = `
      <div class="booking-card booking-step-two">
        ${getSummaryHtml()}

        <div class="booking-field">
          <label for="booking-fullname">Full name</label>
          <input
            type="text"
            id="booking-fullname"
            class="booking-input"
            value="${bookingState.fullName}"
            placeholder="Enter your full name"
          />
        </div>

        <div class="booking-field">
          <label for="booking-email">Email</label>
          <input
            type="email"
            id="booking-email"
            class="booking-input"
            value="${bookingState.email}"
            placeholder="Enter your email"
          />
        </div>

        <div class="booking-field">
          <label for="booking-phone">Phone</label>
          <input
            type="tel"
            id="booking-phone"
            class="booking-input"
            value="${bookingState.phone}"
            placeholder="Enter your phone number"
          />
        </div>

        <div class="booking-payment-box">
          <h4>Payment method</h4>

          <div class="booking-payment-note">
            <small>Pay online instantly with PayPal or confirm your booking in cash.</small>
          </div>

          <div id="paypal-button-container" class="paypal-container"></div>

          <button type="button" id="cash-btn" class="btn booking-btn-full booking-cash-btn">
            Confirm cash
          </button>
        </div>

        <div class="booking-actions booking-actions-split">
          <button type="button" id="booking-back-btn" class="btn booking-back-btn">
            Back
          </button>
        </div>
      </div>
    `;

    const fullNameEl = document.getElementById("booking-fullname");
    const emailEl = document.getElementById("booking-email");
    const phoneEl = document.getElementById("booking-phone");
    const backBtn = document.getElementById("booking-back-btn");
    const cashBtn = document.getElementById("cash-btn");

    function savePersonalData() {
      bookingState.fullName = fullNameEl.value.trim();
      bookingState.email = emailEl.value.trim();
      bookingState.phone = phoneEl.value.trim();
    }

    function validateStep2() {
      savePersonalData();

      if (!bookingState.fullName || !bookingState.email || !bookingState.phone) {
        alert("Please complete full name, email, and phone.");
        return false;
      }

      return true;
    }

    backBtn.addEventListener("click", () => {
      savePersonalData();
      renderStep1();
    });

    cashBtn.addEventListener("click", async () => {
      if (!validateStep2()) return;

      cashBtn.disabled = true;
      cashBtn.textContent = "Saving reservation...";

      const result = await saveReservation("cash", "pending_cash");

      if (!result.ok) {
        alert(`Save error: ${result.error?.message || JSON.stringify(result.error)}`);
        cashBtn.disabled = false;
        cashBtn.textContent = "Confirm cash";
        return;
      }

      const pickupTime = getCurrentPickupTime();

      const message =
        `Hello PCG Tours, I want to confirm my reservation in cash. ` +
        `Tour: ${tour.name}. ` +
        `Date: ${bookingState.date}. ` +
        `Time: ${bookingState.time}. ` +
        `Hotel: ${bookingState.hotel}. ` +
        `Pickup: ${pickupTime || "To be confirmed"}. ` +
        `Adults: ${adults}. ` +
        `Children: ${children}. ` +
        `Name: ${bookingState.fullName}. ` +
        `Email: ${bookingState.email}. ` +
        `Phone: ${bookingState.phone}. ` +
        `Total: $${getTotal()} USD.`;

      const whatsappUrl = `https://wa.me/18293319938?text=${encodeURIComponent(message)}`;
      window.location.href = whatsappUrl;
    });

    renderPayPalButtons(validateStep2);
  }

  renderStep1();
}

document.addEventListener("DOMContentLoaded", renderBookingWidget);

document.addEventListener("DOMContentLoaded", () => {
  const galleryImages = Array.from(document.querySelectorAll(".tour-gallery-gyg img"));
  const mainImage = document.querySelector(".tour-gallery-main img");
  const viewAllBtn = document.querySelector(".tour-gallery-more");

  const lightbox = document.getElementById("tourLightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCounter = document.getElementById("lightboxCounter");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");

  if (!mainImage || !galleryImages.length || !lightbox) return;

  const images = galleryImages.map((img) => ({
    src: img.src,
    alt: img.alt || "Gallery image"
  }));

  let currentIndex = 0;

  function updateLightbox(index) {
    lightboxImage.src = images[index].src;
    lightboxImage.alt = images[index].alt;
    lightboxCounter.textContent = `${index + 1} / ${images.length}`;
  }

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox(currentIndex);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightbox(currentIndex);
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightbox(currentIndex);
  }

  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => {
      openLightbox(index);
    });
  });

  if (viewAllBtn) {
    viewAllBtn.addEventListener("click", () => {
      openLightbox(0);
    });
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", showPrev);
  lightboxNext.addEventListener("click", showNext);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
  });
});

