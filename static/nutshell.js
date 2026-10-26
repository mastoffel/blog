// Expandable notes: [:term](#x-name) opens the "## :x name" section (or <template data-nut="name">) in a bubble.
(function () {
  const notes = {};
  document.querySelectorAll("h1, h2, h3").forEach((h) => {
    const m = h.textContent.trim().match(/^:x\s+([\w-]+)/);
    if (!m) return;
    const body = document.createElement("div");
    let el = h.nextElementSibling;
    while (el && !/^H[1-3]$/.test(el.tagName)) {
      const next = el.nextElementSibling;
      body.appendChild(el);
      el = next;
    }
    notes[m[1]] = body.innerHTML;
    h.remove();
  });
  document.querySelectorAll("template[data-nut]").forEach((t) => (notes[t.dataset.nut] = t.innerHTML));

  document.querySelectorAll("a.nut").forEach((a) => {
    const html = notes[a.getAttribute("href").slice(3)];
    if (!html) return;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      if (a._bubble) return close(a);
      const bubble = document.createElement("div");
      bubble.className = "nut-bubble";
      bubble.innerHTML = html + '<button class="nut-close" aria-label="Close">×</button>';
      bubble.querySelector(".nut-close").onclick = () => close(a);
      a.closest("p, li, td, blockquote, div").after(bubble);
      const arrow = a.getBoundingClientRect().left + a.offsetWidth / 2 - bubble.getBoundingClientRect().left;
      bubble.style.setProperty("--arrow-x", arrow + "px");
      a._bubble = bubble;
    });
  });
  function close(a) { a._bubble.remove(); a._bubble = null; }
})();
