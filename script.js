const swiper = new Swiper('.swiper', {
    // Optional parameters
     direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    centeredSlides: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
    },

  });



// Set the date we're counting down to
let countDownDate = new Date("May 5, 2022 15:37:25").getTime();

// Update the count down every 1 second
let x = setInterval(function() {

  // Get today's date and time
  let now = new Date().getTime();
    
  // Find the distance between now and the count down date
  let distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
})

/* let form = document.querySelector('form');


form.addEventListener('click',() =>
console.log('ciao')
/* function login() {
    console.log(form);
}) */

//comparsa logo insta
/* document.querySelector(".insta-item").onmouseover = function() {togli()};
document.querySelector(".insta-item").onmouseout = function() {mostra()};
function togli() {  
  document.querySelector(".insta-item").style.display = "none";
}
togli();
function mostra() {  
  document.querySelector(".insta-item").style.display = "block";
}
mostra()


let instaItem = document.querySelector('.insta-item');

instaItem.addEventListener('onmouseover', ()=>{
  instaItem.classList.add('display:none')
}) */