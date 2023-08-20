// HomeButton Scroll
document.getElementById("HomeButton").addEventListener("click", function() {
  const targetElement = document.getElementById("SlideShowTitle");
  
  // Get the position of the target element
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

  // Get the height of the navbar
  const navbar = document.querySelector(".Header");
  const navbarHeight = navbar ? navbar.offsetHeight : 0;

  // Calculate the desired scroll position
  const desiredScrollPosition = targetPosition - navbarHeight;

  // Smoothly scroll to the calculated position
  window.scrollTo({
    top: desiredScrollPosition,
    behavior: "smooth"
  });
});


//Slide Show
let slider = document.querySelector('.slidershow .list');
let items = document.querySelectorAll('.slidershow .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slidershow .dots li');

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
let refreshInterval = setInterval(()=> {next.click()}, 3000);
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slidershow .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 3000);
}

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})
window.onresize = function(event) {
    reloadSlider();
};


//Before and After Slider
const container = document.querySelector('.container');
document.querySelector('.slider').addEventListener('input', (e) => {
  container.style.setProperty('--position', `${e.target.value}%`);
})