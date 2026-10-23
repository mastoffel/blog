// Expandable inline notes: [:term](#x-name) opens the section headed "## :x name".
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
    notes[m[1]] = body;
    h.remove();
  });
  document.querySelectorAll("a.nut").forEach((a) => {
    const body = notes[a.getAttribute("href").slice(3)];
    if (!body) return;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      if (a._open) { a._open.remove(); a._open = null; a.classList.remove("open"); return; }
      const box = document.createElement("div");
      box.className = "nutshell";
      box.innerHTML = body.innerHTML;
      box.querySelectorAll("a.nut").forEach((n) => n.classList.remove("nut"));
      a.closest("p, li, td, blockquote").after(box);
      a._open = box;
      a.classList.add("open");
    });
  });
})();
