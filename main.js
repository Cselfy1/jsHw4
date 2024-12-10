// Task 1
const trackbars = document.querySelectorAll('.trackbar');
trackbars.forEach(trackbar => {
    const button = trackbar.querySelector('.track-button');
    if (!button || !(button instanceof HTMLElement)) return;

    let dragging = false;
    const parentWidth = trackbar.offsetWidth;
    const elementWidth = button.offsetWidth;
    let clickOffset = 0;

    button.addEventListener('mousedown', event => {
        clickOffset = event.pageX - button.offsetLeft - elementWidth / 2;
        dragging = true;
    });

    document.body.addEventListener('mouseup', () => { dragging = false; });
    document.body.addEventListener('mouseleave', () => { dragging = false; });

    document.body.addEventListener('mousemove', event => {
        if (!dragging) return;

        let currentPosition = event.pageX - button.offsetLeft - elementWidth / 2;
        let elementPosition = parseInt(window.getComputedStyle(button).getPropertyValue('left'));
        let nextPosition = elementPosition + currentPosition - clickOffset;

        nextPosition = Math.max(0, Math.min(nextPosition, parentWidth - elementWidth));
        if (elementPosition === nextPosition + 2) return;

        button.style.left = `${nextPosition}px`;

        let color = `hsl(${120 - ((100 - Math.floor(elementPosition * 100 / (parentWidth - elementWidth))) * 1.2)}, 70%, 60%)`;
        button.style.setProperty('--next-bg-color', color);

        trackbar.setAttribute('complete', Math.floor(elementPosition * 100 / (parentWidth - elementWidth)));

        const trackSelector = trackbar.querySelector('.track-selector');
        if (trackSelector) {
            trackSelector.style.width = `${Math.floor(elementPosition * parentWidth / (parentWidth - elementWidth))}px`;
        }

        const trackPercentage = trackbar.querySelector('.track-percentage');
        if (trackPercentage) {
            trackPercentage.innerHTML = `${Math.floor(elementPosition * 100 / (parentWidth - elementWidth))}%`;
        }
    });
});

// Task 2
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}