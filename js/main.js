(function () {
  "use strict";

  // Copy-to-clipboard for code blocks and endpoint paths
  function flash(btn, original) {
    btn.classList.add("is-copied");
    btn.textContent = "Copiado";
    // Flash the source block so it's clear what was copied
    var box = btn.closest(".code, .endpoint");
    if (box) {
      box.classList.remove("just-copied");
      void box.offsetWidth; // restart the animation on rapid re-copy
      box.classList.add("just-copied");
      setTimeout(function () { box.classList.remove("just-copied"); }, 720);
    }
    setTimeout(function () {
      btn.classList.remove("is-copied");
      btn.textContent = original;
    }, 1600);
  }
  function copyText(text, btn) {
    var original = btn.textContent;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { flash(btn, original); });
    } else {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); flash(btn, original); } catch (e) {}
      document.body.removeChild(ta);
    }
  }
  document.querySelectorAll(".code__copy").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var pre = btn.closest(".code").querySelector("pre");
      copyText(pre.innerText.replace(/\n$/, ""), btn);
    });
  });
  document.querySelectorAll(".endpoint__copy").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var path = btn.closest(".endpoint").querySelector(".path");
      copyText(path.innerText, btn);
    });
  });

  // Scroll progress bar
  var bar = document.getElementById("progress");
  var ticking = false;
  function update() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    var p = max > 0 ? doc.scrollTop / max : 0;
    bar.style.transform = "scaleX(" + p + ")";
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();

  // Event chips: one-time staggered reveal when scrolled into view.
  // Chips are visible by default; this only enhances. A failsafe guarantees
  // they reveal even if the observer never fires (hidden tabs, headless render).
  var evWrap = document.querySelector(".events");
  if (evWrap) {
    evWrap.querySelectorAll(".ev").forEach(function (el, i) {
      el.style.setProperty("--i", i);
    });
    var revealChips = function () { evWrap.classList.add("in"); };
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { revealChips(); obs.disconnect(); }
        });
      }, { rootMargin: "0px 0px -10% 0px", threshold: 0.15 });
      io.observe(evWrap);
      setTimeout(revealChips, 2200); // failsafe: never leave chips hidden
    } else {
      revealChips();
    }
  }
})();
