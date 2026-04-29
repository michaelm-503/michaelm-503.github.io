const galleries = document.querySelectorAll("[data-gallery]");

galleries.forEach((gallery) => {
  const track = gallery.querySelector(".gallery-track");
  const slides = Array.from(track?.querySelectorAll("img") ?? []);
  const previous = gallery.querySelector(".gallery-control.previous");
  const next = gallery.querySelector(".gallery-control.next");
  const dots = gallery.querySelector(".gallery-dots");
  let index = 0;
  let hoverTimer;

  if (!track || slides.length <= 1) {
    gallery.classList.add("single-image");
    return;
  }

  gallery.classList.add("has-multiple");

  const buttons = slides.map((_, slideIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `Show image ${slideIndex + 1}`);
    button.addEventListener("click", () => show(slideIndex));
    dots?.append(button);
    return button;
  });

  function show(nextIndex) {
    index = (nextIndex + slides.length) % slides.length;
    track.style.transform = `translateX(${-index * 100}%)`;
    buttons.forEach((button, buttonIndex) => {
      button.classList.toggle("active", buttonIndex === index);
      button.setAttribute("aria-current", buttonIndex === index ? "true" : "false");
    });
  }

  function startHoverAdvance() {
    stopHoverAdvance();
    hoverTimer = window.setInterval(() => show(index + 1), 1800);
  }

  function stopHoverAdvance() {
    if (hoverTimer) {
      window.clearInterval(hoverTimer);
      hoverTimer = undefined;
    }
  }

  previous?.addEventListener("click", () => show(index - 1));
  next?.addEventListener("click", () => show(index + 1));
  gallery.addEventListener("mouseenter", startHoverAdvance);
  gallery.addEventListener("mouseleave", stopHoverAdvance);
  gallery.addEventListener("focusin", stopHoverAdvance);
  gallery.addEventListener("touchstart", stopHoverAdvance, { passive: true });

  show(0);
});
