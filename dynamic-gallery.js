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

    if (error || !data) return;

    let images = [];

    if (Array.isArray(data.imagenes_urls)) {
      images = data.imagenes_urls;
    } else if (typeof data.imagenes_urls === "string") {
      try {
        images = JSON.parse(data.imagenes_urls);
      } catch {
        images = [];
      }
    }

    if (!images.length && data.imagen_url) {
      images = [data.imagen_url];
    }

    images = images
      .map(img => typeof img === "string" ? img.trim() : "")
      .filter(Boolean);

    if (!images.length) return;

    gallery.innerHTML = `
      <div class="tour-gallery-main">
        <img 
          src="${images[0]}" 
          alt="${tourSlug}" 
          style="width:100%; height:100%; object-fit:cover; display:block;"
        >
      </div>

      <div class="tour-gallery-grid">
        ${images.slice(1, 4).map(img => `
          <img 
            src="${img}" 
            alt="${tourSlug}" 
            style="width:100%; height:100%; object-fit:cover; display:block;"
          >
        `).join("")}

        <div class="tour-gallery-more">
          <span>View all photos</span>
        </div>
      </div>
    `;

  } catch (err) {
    console.error("Error dynamic gallery:", err);
  }
}
