// Mobile menu
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("site-nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("show");
  menuToggle.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("show");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Product filter
const filterBtns = document.querySelectorAll(".filter-btn");
const products = document.querySelectorAll(".product");
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => { b.classList.remove("active"); b.setAttribute("aria-pressed", "false"); });
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");
    const cat = btn.dataset.category;
    products.forEach(p => { p.hidden = !(cat === "all" || p.dataset.category === cat); });
  });
});

// Contact form: actually send to Formspree, then show a message
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = form.querySelector("button");
  btn.disabled = true;
  status.className = "form-status";
  status.textContent = "Sending…";
  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    });
    if (!res.ok) throw new Error();
    status.classList.add("ok");
    status.textContent = "Thank you! We'll get back to you shortly. For a faster reply, message us on WhatsApp.";
    form.reset();
  } catch {
    status.classList.add("err");
    status.textContent = "Sorry, that didn't send. Please call 0903 250 2684 or message us on WhatsApp.";
  } finally {
    btn.disabled = false;
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
