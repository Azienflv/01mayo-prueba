async function getCurrentSupabaseUser() {
  if (!supabaseClient) return null;

  const { data, error } = await supabaseClient.auth.getUser();
  if (error) {
    console.error("Error getting user:", error);
    return null;
  }
  return data?.user || null;
}

async function signInWithGoogleForReviews() {
  if (!supabaseClient) return;

  const redirectTo = window.location.href;

  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo
    }
  });

  if (error) {
    console.error("Google sign-in error:", error);
    alert("Could not start Google sign-in.");
  }
}

async function signOutReviewsUser() {
  if (!supabaseClient) return;

  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    console.error("Sign out error:", error);
    return;
  }

  window.location.reload();
}

async function loadApprovedReviews(tourSlug) {
  const list = document.getElementById("approved-reviews-list");
  if (!list || !supabaseClient) return;

  const { data, error } = await supabaseClient
    .from("reviews")
    .select("*")
    .eq("tour_slug", tourSlug)
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading approved reviews:", error);
    list.innerHTML = `<p>Could not load reviews.</p>`;
    return;
  }

  const reviews = data || [];

  if (!reviews.length) {
    list.innerHTML = `<p>No reviews yet. Be the first to share your experience.</p>`;
    return;
  }

  list.innerHTML = reviews.map((review) => `
    <article class="review-card">
      <div class="review-card-top">
        <strong>${review.client_name}</strong>
        <span>${"⭐".repeat(review.rating)}</span>
      </div>
      <p>${review.comment}</p>
    </article>
  `).join("");
}

async function setupReviewsSection() {
  const widget = document.getElementById("booking-widget");
  const loginBox = document.getElementById("reviews-login-box");
  const userBox = document.getElementById("reviews-user-box");
  const userText = document.getElementById("reviews-user-text");
  const form = document.getElementById("review-form");
  const message = document.getElementById("review-message");
  const loginBtn = document.getElementById("google-review-login");
  const logoutBtn = document.getElementById("google-review-logout");

  if (!widget) return;

  const tourSlug = widget.dataset.tour;
  if (!tourSlug) return;

  await loadApprovedReviews(tourSlug);

  const user = await getCurrentSupabaseUser();

  if (loginBtn) {
    loginBtn.addEventListener("click", signInWithGoogleForReviews);
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", signOutReviewsUser);
  }

  if (!user) {
    if (loginBox) loginBox.style.display = "block";
    if (userBox) userBox.style.display = "none";
    if (form) form.style.display = "none";
    return;
  }

  if (loginBox) loginBox.style.display = "none";
  if (userBox) userBox.style.display = "block";
  if (form) form.style.display = "block";

  if (userText) {
    userText.textContent = `Signed in as ${user.user_metadata?.full_name || user.email}`;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const rating = document.getElementById("review-rating")?.value;
    const comment = document.getElementById("review-comment")?.value.trim();

    if (!rating || !comment) {
      if (message) message.textContent = "Please complete rating and comment.";
      return;
    }

    const payload = {
      user_id: user.id,
      tour_slug: tourSlug,
      client_name: user.user_metadata?.full_name || user.email || "Traveler",
      client_email: user.email || null,
      rating: Number(rating),
      comment,
      status: "pending"
    };

    const { error } = await supabaseClient.from("reviews").insert([payload]);

    if (error) {
      console.error("Error saving review:", error);
      if (message) message.textContent = "Could not submit review.";
      return;
    }

    form.reset();
    if (message) {
      message.textContent = "Thanks. Your review was submitted and is pending approval.";
    }
  });
}

document.addEventListener("DOMContentLoaded", setupReviewsSection);
