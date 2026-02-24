const images = document.querySelector('.carousel-images');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');

let index = 0;

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