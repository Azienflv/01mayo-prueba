const SUPABASE_URL = "https://gqurgezuuytxrcmudnik.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxdXJnZXp1dXl0eHJjbXVkbmlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MTAyMjIsImV4cCI6MjA5MDE4NjIyMn0.1EW73snm3LvXPW0jK-g_-Klze0FyIbXI4dzv0J2XGr4";


const supabaseGallery = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadDynamicTourGallery() {
  try {
    alert("dynamic-gallery cargó en esta página ✅");

    const widget = document.querySelector("[data-tour]");
    const gallery = document.querySelector(".tour-gallery-gyg");

    if (!widget) {
      alert("No encontré data-tour");
      return;
    }

    if (!gallery) {
      alert("No encontré .tour-gallery-gyg");
      return;
    }

    const tourSlug = widget.dataset.tour;

    const { data, error } = await supabaseGallery
      .from("productos")
      .select("*")
      .eq("slug", tourSlug)
      .single();

    alert("Tour slug: " + tourSlug);
    alert("Data: " + JSON.stringify(data));
    alert("Error: " + JSON.stringify(error));

    if (error || !data) return;

    const images =
      Array.isArray(data.imagenes_urls) && data.imagenes_urls.length
        ? data.imagenes_urls
        : data.imagen_url
          ? [data.imagen_url]
          : [];

    if (!images.length) {
      alert("El producto no tiene imágenes en Supabase");
      return;
    }

    const mainImage = images[0];
    const thumbs = images.slice(1, 4);

    gallery.innerHTML = `
      <div class="tour-gallery-main">
        <img src="${mainImage}" alt="${tourSlug}">
      </div>

      <div class="tour-gallery-grid">
        ${thumbs.map(img => `
          <img src="${img}" alt="${tourSlug}">
        `).join("")}

        <div class="tour-gallery-more">
          <span>View all photos</span>
        </div>
      </div>
    `;

  } catch (err) {
    alert("Error JS: " + err.message);
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", loadDynamicTourGallery);

