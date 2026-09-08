/* ══════════════════════════════════════════════════════════════
   Site behaviour: theme toggle, scroll reveal, publication filter
   ══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  /* ── Theme ──────────────────────────────────────────────── */
  var root = document.documentElement;

  function systemPrefersDark() {
    return window.matchMedia &&
           window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function currentTheme() {
    var set = root.getAttribute("data-theme");
    if (set === "dark" || set === "light") return set;
    return systemPrefersDark() ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem("theme", theme); } catch (e) { /* private mode */ }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0d0f11" : "#fbfaf7");
  }

  var toggle = document.querySelector("[data-theme-toggle]");
  if (toggle) {
    toggle.addEventListener("click", function () {
      applyTheme(currentTheme() === "dark" ? "light" : "dark");
    });
  }

  /* ── Reveal on scroll ───────────────────────────────────── */
  var targets = document.querySelectorAll(".reveal");
  var reduced = window.matchMedia &&
                window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!("IntersectionObserver" in window) || reduced) {
    Array.prototype.forEach.call(targets, function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

    Array.prototype.forEach.call(targets, function (el, i) {
      el.style.transitionDelay = Math.min(i, 6) * 55 + "ms";
      io.observe(el);
    });
  }

  /* ── Publication filter ─────────────────────────────────── */
  var filters = document.querySelectorAll("[data-filter]");
  if (filters.length) {
    var groups = document.querySelectorAll("[data-pub-group]");

    Array.prototype.forEach.call(filters, function (btn) {
      btn.addEventListener("click", function () {
        var key = btn.getAttribute("data-filter");

        Array.prototype.forEach.call(filters, function (b) {
          b.setAttribute("aria-pressed", String(b === btn));
        });

        Array.prototype.forEach.call(groups, function (g) {
          var match = key === "all" || g.getAttribute("data-pub-group") === key;
          g.hidden = !match;
        });
      });
    });
  }

  /* ── Year in footer ─────────────────────────────────────── */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
