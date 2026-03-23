(function() {
    "use strict";

    var header = document.getElementById("header");
    var navToggle = document.querySelector(".nav-toggle");
    var navMenu = document.getElementById("nav-menu");

    function onScroll() {
        if (!header) return;
        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    function toggleMenu() {
        if (!navToggle || !navMenu) return;
        var open = navToggle.getAttribute("aria-expanded") === "true";
        navToggle.setAttribute("aria-expanded", !open);
        navMenu.classList.toggle("open", !open);
        document.body.style.overflow = open ? "" : "hidden";
    }

    function closeMenu() {
        navToggle.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("open");
        document.body.style.overflow = "";
    }

    /** When user clicks Akses cepat link, scroll to card (full in view) and show brief highlight */
    function highlightCard(id) {
        var card = id ? document.getElementById(id) : null;
        if (card && card.classList.contains("card")) {
            card.classList.remove("card--focused");
            card.offsetHeight;
            card.classList.add("card--focused");
            window.setTimeout(function() {
                card.classList.remove("card--focused");
            }, 2500);
        }
    }

    /** Set active state on the Akses cepat link that matches the given id */
    function setActiveQuickLink(id) {
        var quickLinksContainer = document.querySelector(".quick-links-grid");
        if (!quickLinksContainer) return;
        quickLinksContainer.querySelectorAll("a[href^='#']").forEach(function(link) {
            var linkId = (link.getAttribute("href") || "").slice(1);
            if (linkId === id) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    /** Set active border on the card that matches the given id (same look as menu active) */
    function setActiveCard(id) {
        document.querySelectorAll(".card").forEach(function(card) {
            if (card.id === id) {
                card.classList.add("card--active");
            } else {
                card.classList.remove("card--active");
            }
        });
    }

    /** Scroll card fully into view (centered) and update menu + card active + highlight */
    function goToCard(id) {
        var card = id ? document.getElementById(id) : null;
        if (!card || !card.classList.contains("card")) return;
        card.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
        setActiveQuickLink(id);
        setActiveCard(id);
        window.setTimeout(function() {
            highlightCard(id);
        }, 400);
    }

    var quickLinks = document.querySelector(".quick-links-grid");
    if (quickLinks) {
        quickLinks.addEventListener("click", function(e) {
            var a = e.target.closest("a[href^='#']");
            if (a) {
                e.preventDefault();
                var id = (a.getAttribute("href") || "").slice(1);
                if (id) {
                    window.history.replaceState(null, "", "#" + id);
                    goToCard(id);
                }
            }
        });
    }

    window.addEventListener("hashchange", function() {
        var id = (window.location.hash || "").slice(1);
        if (id) {
            setActiveQuickLink(id);
            setActiveCard(id);
            highlightCard(id);
        }
    });

    if (window.location.hash) {
        var initialId = window.location.hash.slice(1);
        setActiveQuickLink(initialId);
        setActiveCard(initialId);
        window.setTimeout(function() {
            var el = document.getElementById(initialId);
            if (!el) return;
            if (el.classList.contains("card")) {
                el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
                highlightCard(initialId);
            } else {
                el.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
            }
        }, 300);
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", toggleMenu);
        var navLinks = navMenu.querySelectorAll("a");
        for (var i = 0; i < navLinks.length; i++) {
            navLinks[i].addEventListener("click", closeMenu);
        }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /** Hero background carousel (foto organisasi + overlay merah identitas) */
    function initHeroCarousel() {
        var hero = document.getElementById("hero");
        if (!hero) return;
        var slides = hero.querySelectorAll(".hero-slide");
        var dots = hero.querySelectorAll(".hero-dot");
        if (!slides.length) return;

        var i = 0;
        var timer = null;
        var paused = false;
        var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        var intervalMs = 6000;

        function go(n) {
            i = (n + slides.length) % slides.length;
            slides.forEach(function(s, j) {
                s.classList.toggle("is-active", j === i);
            });
            dots.forEach(function(d, j) {
                var on = j === i;
                d.classList.toggle("is-active", on);
                d.setAttribute("aria-selected", on ? "true" : "false");
            });
        }

        function next() {
            go(i + 1);
        }

        function stop() {
            if (timer) {
                window.clearInterval(timer);
                timer = null;
            }
        }

        function start() {
            stop();
            if (reduceMotion || paused || slides.length < 2) return;
            timer = window.setInterval(next, intervalMs);
        }

        dots.forEach(function(dot, j) {
            dot.addEventListener("click", function() {
                go(j);
                start();
            });
        });

        hero.addEventListener("mouseenter", function() {
            paused = true;
            stop();
        });
        hero.addEventListener("mouseleave", function() {
            paused = false;
            start();
        });

        hero.addEventListener("focusin", function() {
            paused = true;
            stop();
        });
        hero.addEventListener("focusout", function() {
            window.setTimeout(function() {
                if (!hero.contains(document.activeElement)) {
                    paused = false;
                    start();
                }
            }, 0);
        });

        start();
    }

    initHeroCarousel();
})();
