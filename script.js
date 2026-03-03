const images = document.querySelector('.carousel-images');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

let index = 0;

const observer = new IntersectionObserver((entries) => {
  updateActiveSection();
}, {
  threshold: [0.25, 0.5, 0.75],
  rootMargin: "-80px 0px 0px 0px"
});

sections.forEach(section => observer.observe(section));

function updateActiveSection() {
  let current = "";
  let maxRatio = 0;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const visibleHeight = Math.min(rect.bottom, window.innerHeight) - 
                          Math.max(rect.top, 0);

    const ratio = visibleHeight / rect.height;

    if (ratio > maxRatio) {
      maxRatio = ratio;
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
}
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");

  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

function showSlide(i) {
  index = i;
  const slideWidth = slides[0].clientWidth;
  images.style.transform = `translateX(${-index * slideWidth}px)`;

  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

window.addEventListener('resize', () => showSlide(index));

nextBtn.addEventListener('click', () => {
  index = (index + 1) % slides.length;
  showSlide(index);
});

prevBtn.addEventListener('click', () => {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => showSlide(i));
});