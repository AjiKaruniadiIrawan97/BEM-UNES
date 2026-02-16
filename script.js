(function () {
  "use strict";

  const header = document.getElementById("header");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  function toggleMenu() {
    const open = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", !open);
    navMenu.classList.toggle("open", !open);
    document.body.style.overflow = open ? "" : "hidden";
  }

  function closeMenu() {
    navToggle.setAttribute("aria-expanded", "false");
    navMenu.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", toggleMenu);
    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
