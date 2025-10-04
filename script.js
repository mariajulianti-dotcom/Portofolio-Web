// script.js
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar a");

  // ==== REVEAL / ARRIVE ANIMATION ====
  const animObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const section = entry.target;

      // main section animation
      section.classList.add("section-arrived");

      // stagger anak-anaknya
      const children = section.querySelectorAll(".anim-on-arrive");
      children.forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.12}s`;
        el.classList.add("anim-play");
      });

      // cukup sekali per section
      observer.unobserve(section);
    });
  }, { threshold: 0.25 });

  sections.forEach(sec => animObserver.observe(sec));

  // ==== NAVBAR ACTIVE ON SCROLL ====
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute("id");
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }, { threshold: 0.55 });

  sections.forEach(sec => navObserver.observe(sec));

  // ==== SMOOTH SCROLL NAV ====
  document.querySelectorAll('.navbar a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const id = a.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      const offset = 90; // tinggi header
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  // ==== MODAL CERTIFICATES ====
  const modal      = document.getElementById("imgModal");
  const modalImg   = document.getElementById("modalImage");
  const modalClose = document.getElementById("modalClose");

  // buka modal dari anchor yang punya data-cert
  document.querySelectorAll("[data-cert]").forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      modalImg.src = a.getAttribute("href");
      modal.style.display = "flex";
      modal.setAttribute("aria-hidden", "false");
    });
  });

  // tutup modal
  if (modalClose) {
    modalClose.addEventListener("click", () => {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
    });
  }

  modal?.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
    }
  });
});
