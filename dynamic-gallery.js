const SUPABASE_URL = "https://gqurgezuuytxrcmudnik.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxdXJnZXp1dXl0eHJjbXVkbmlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MTAyMjIsImV4cCI6MjA5MDE4NjIyMn0.1EW73snm3LvXPW0jK-g_-Klze0FyIbXI4dzv0J2XGr4";


const supabaseGallery = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadDynamicTourGallery() {
  try {
    const gallery = document.querySelector(".tour-gallery-gyg");
    const widget = document.querySelector("#booking-widget[data-tour]");

    if (!gallery || !widget) return;

    const tourSlug = widget.dataset.tour;

    const { data, error } = await supabaseGallery
      .from("productos")
      .select("slug, imagen_url, imagenes_urls")
      .eq("slug", tourSlug)
      .single();

    if (error || !data) {
      console.warn("No dynamic gallery data:", error);
      return;
    }

    let images = [];

    if (Array.isArray(data.imagenes_urls) && data.imagenes_urls.length > 0) {
      images = data.imagenes_urls;
    } else if (data.imagen_url) {
      images = [data.imagen_url];
    }

    images = images.filter(Boolean);

    if (!images.length) {
      console.warn("No images found for:", tourSlug);
      return;
    }

    const mainImage = images[0];
    const thumbImages = images.slice(1, 4);

    gallery.innerHTML = `
      <div class="tour-gallery-main">
        <img src="${mainImage}" alt="${tourSlug}">
      </div>

      <div class="tour-gallery-grid">
        ${thumbImages.map(img => `
          <img src="${img}" alt="${tourSlug}">
        `).join("")}

        <div class="tour-gallery-more">
          <span>View all photos</span>
        </div>
      </div>
    `;

    console.log("Dynamic gallery loaded:", images);

  } catch (err) {
    console.error("Dynamic gallery error:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadDynamicTourGallery);
