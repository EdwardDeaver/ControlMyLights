const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');
const title = document.querySelector('.title');
hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });