const carouselImages = [
  "images/example-carousel-1.png",
  "images/example-carousel-2.png",
  "images/example-carousel-3.png",
  "images/example-carousel-4.png",
  "images/example-carousel-5.png",
  "images/example-carousel-6.png",
  "images/example-carousel-7.png"
];

const fmt = (date) => date.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
const now = new Date();
const tomorrow = new Date(now);
tomorrow.setDate(tomorrow.getDate() + 1);
document.querySelectorAll("[data-today]").forEach((el) => { el.textContent = fmt(now); });
document.querySelectorAll("[data-tomorrow]").forEach((el) => { el.textContent = fmt(tomorrow); });

document.querySelectorAll(".scroll-pricing").forEach((btn) => {
  btn.addEventListener("click", () => document.querySelector("#pricing").scrollIntoView({ behavior: "smooth" }));
});

const imageEl = document.querySelector("#carouselImage");
const dotsEl = document.querySelector("[data-dots]");
let carouselIndex = 0;
let carouselTimer;
function renderDots() {
  dotsEl.innerHTML = "";
  carouselImages.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Ver imagem ${index + 1}`);
    dot.className = index === carouselIndex ? "active" : "";
    dot.addEventListener("click", () => showSlide(index, true));
    dotsEl.appendChild(dot);
  });
}
function showSlide(index, manual = false) {
  carouselIndex = (index + carouselImages.length) % carouselImages.length;
  imageEl.classList.add("switching");
  setTimeout(() => {
    imageEl.src = carouselImages[carouselIndex];
    imageEl.classList.remove("switching");
    renderDots();
  }, 140);
  if (manual) restartCarousel();
}
function restartCarousel() {
  clearInterval(carouselTimer);
  if (carouselImages.length > 1) {
    carouselTimer = setInterval(() => showSlide(carouselIndex + 1), 4000);
  }
}
document.querySelector(".car-arrow.prev").addEventListener("click", () => showSlide(carouselIndex - 1, true));
document.querySelector(".car-arrow.next").addEventListener("click", () => showSlide(carouselIndex + 1, true));
renderDots();
restartCarousel();

const lightbox = document.querySelector("#lightbox");
const lightboxImg = lightbox.querySelector("img");
imageEl.addEventListener("click", () => {
  lightboxImg.src = imageEl.src;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
});
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
}
document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    item.classList.toggle("open");
  });
});

const modal = document.querySelector("#basicModal");
function openModal() {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}
document.querySelector("[data-open-basic]").addEventListener("click", openModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

const emergencyModal = document.querySelector("#emergencyCultinhosModal");
const emergencyOpenButton = document.querySelector("[data-open-emergency-offer]");
const emergencyCloseButton = document.querySelector(".emergency-close");
function openEmergencyModal() {
  emergencyModal.classList.add("open");
  emergencyModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("emergency-modal-locked");
  emergencyCloseButton.focus();
}
function closeEmergencyModal() {
  if (!emergencyModal.classList.contains("open")) return;
  emergencyModal.classList.remove("open");
  emergencyModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("emergency-modal-locked");
  emergencyOpenButton.focus();
}
emergencyOpenButton.addEventListener("click", openEmergencyModal);

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeModal();
  closeEmergencyModal();
  closeLightbox();
});
