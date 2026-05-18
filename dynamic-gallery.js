const SUPABASE_URL = "https://gqurgezuuytxrcmudnik.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxdXJnZXp1dXl0eHJjbXVkbmlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MTAyMjIsImV4cCI6MjA5MDE4NjIyMn0.1EW73snm3LvXPW0jK-g_-Klze0FyIbXI4dzv0J2XGr4";


const supabaseGallery = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadDynamicTourGallery() {
  try {
    const gallery = document.querySelector(".tour-gallery-gyg");
    const widget = document.querySelector("#booking-widget[data-tour]");

    if (!gallery) {
      alert("No encontré .tour-gallery-gyg");
      return;
    }

    if (!widget) {
      alert("No encontré #booking-widget[data-tour]");
      return;
    }

    const tourSlug = widget.dataset.tour;

    const { data, error } = await supabaseGallery
      .from("productos")
      .select("slug, imagen_url, imagenes_urls")
      .eq("slug", tourSlug)
      .single();

    if (error) {
      alert("Error Supabase: " + JSON.stringify(error));
      return;
    }

    alert("Producto encontrado: " + data.slug);

    let images = [];

    if (Array.isArray(data.imagenes_urls) && data.imagenes_urls.length > 0) {
      images = data.imagenes_urls;
    } else if (data.imagen_url) {
      images = [data.imagen_url];
    }

    images = images.filter(Boolean);

    alert("Imágenes encontradas: " + images.length);

    if (!images.length) return;

    alert("Primera imagen: " + images[0]);

    gallery.innerHTML = `
      <div class="tour-gallery-main">
        <img src="${images[0]}" alt="${tourSlug}" style="width:100%; height:100%; object-fit:cover;">
      </div>

      <div class="tour-gallery-grid">
        ${images.slice(1, 4).map(img => `
          <img src="${img}" alt="${tourSlug}" style="width:100%; height:100%; object-fit:cover;">
        `).join("")}

        <div class="tour-gallery-more">
          <span>View all photos</span>
        </div>
      </div>
    `;

  } catch (err) {
    alert("Error JS: " + err.message);
  }
}

document.addEventListener("DOMContentLoaded", loadDynamicTourGallery);
