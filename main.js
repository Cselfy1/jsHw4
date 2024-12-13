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

// Task 3
function toggleAccordion(header) {
  const allContent = document.querySelectorAll('.accordion-content');
  const content = header.nextElementSibling;

  allContent.forEach((item) => {
      if (item !== content) {
          item.style.display = 'none';
      }
  });

  content.style.display = content.style.display === 'block' ? 'none' : 'block';
}

// Task 4
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');

  loader.classList.add('loader-hidden');

  loader.addEventListener('transitionend', () => {
      document.body.removeChild("loader");
  })
})

// Task 5
document.addEventListener('DOMContentLoaded', () => {
  const dateInput = document.getElementById('date-input');
  const calendar = document.getElementById('calendar');

dateInput.addEventListener('focus', () => {
    calendar.style.display = 'block';
    const [year, month] = dateInput.value.split('-').map(Number);
    if (!isNaN(year) && !isNaN(month)) {
        generateCalendar(new Date(year, month - 1));
    } else {
        generateCalendar(new Date());
    }
});

  dateInput.addEventListener('input', () => {
      const [year, month] = dateInput.value.split('-').map(Number);
      if (!isNaN(year) && !isNaN(month)) {
          generateCalendar(new Date(year, month - 1));
      }
  });

  document.addEventListener('click', (event) => {
      if (!event.target.closest('.date-picker')) {
          calendar.style.display = 'none';
      }
  });

  function generateCalendar(date) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = (new Date(year, month, 1).getDay() + 6) % 7; 
      const lastDate = new Date(year, month + 1, 0).getDate();

      let calendarHTML = '<table>';
      calendarHTML += '<tr><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th><th>Su</th></tr><tr>';

      for (let i = 0; i < firstDay; i++) {
          calendarHTML += '<td></td>';
      }

      for (let date = 1; date <= lastDate; date++) {
          if ((firstDay + date - 1) % 7 === 0) {
              calendarHTML += '</tr><tr>';
          }
          calendarHTML += `<td>${date}</td>`;
      }

      calendarHTML += '</tr></table>';
      calendar.innerHTML = calendarHTML;

      calendar.querySelectorAll('td').forEach(cell => {
          cell.addEventListener('click', () => {
              const selectedDate = new Date(year, month, cell.textContent);
              dateInput.value = selectedDate.toISOString().slice(0, 7);
              calendar.style.display = 'none';
          });
      });
  }
});

// Task 6
document.addEventListener('DOMContentLoaded', () => {
    const links = [
        { text: 'index.html', href: 'index.html' },
        { text: 'google.com', href: 'https://www.google.com' },
        { text: 'itstep.org', href: 'https://itstep.org' },
        { text: 'mystat.itstep.org', href: 'https://mystat.itstep.org' },
        { text: '/images/css.png', href: '/images/css.png' },
        { text: '/local/path', href: '/local/path' }
    ];

    const linkList = document.getElementById('link-list');

    links.forEach(link => {
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.textContent = link.text;
        anchor.target = '_blank';
        listItem.appendChild(anchor);
        linkList.appendChild(listItem);
    });
});


// Task 7
document.addEventListener('DOMContentLoaded', () => {
    const bookList = document.getElementById('book-list');
    let lastSelectedIndex = null;

    bookList.addEventListener('click', (event) => {
        if (event.target.tagName !== 'LI') return;

        const books = Array.from(bookList.children);
        const index = books.indexOf(event.target);

        if (event.ctrlKey) {
            event.target.classList.toggle('selected');
        } else if (event.shiftKey && lastSelectedIndex !== null) {
            const start = Math.min(lastSelectedIndex, index);
            const end = Math.max(lastSelectedIndex, index);
            for (let i = start; i <= end; i++) {
                books[i].classList.add('selected');
            }
        } else {
            books.forEach(book => book.classList.remove('selected'));
            event.target.classList.add('selected');
        }

        lastSelectedIndex = index;
    });
});


// Task 8
document.addEventListener('DOMContentLoaded', () => {
    const textContainer = document.getElementById('text-container');
    const textDisplay = document.getElementById('text-display');
    let textEdit;

    document.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.key === 'e') {
            event.preventDefault();
            if (!textEdit) {
                textEdit = document.createElement('textarea');
                textEdit.id = 'text-edit';
                textEdit.value = textDisplay.textContent;
                textContainer.replaceChild(textEdit, textDisplay);
                textEdit.style.display = 'block';
                textEdit.focus();
            }
        }

        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            if (textEdit) {
                textDisplay.textContent = textEdit.value;
                textContainer.replaceChild(textDisplay, textEdit);
                textEdit = null;
            }
        }
    });
});


// Task 9
function sortTable(columnIndex) {
    const table = document.querySelector('table');
    const rows = Array.from(table.rows).slice(1);
    const isNumeric = columnIndex === 2;
  
    rows.sort((rowA, rowB) => {
      const cellA = rowA.cells[columnIndex].textContent;
      const cellB = rowB.cells[columnIndex].textContent;
  
      if (isNumeric) {
        return parseInt(cellA) - parseInt(cellB);
      } else {
        return cellA.localeCompare(cellB);
      }
    });
  
    rows.forEach(row => table.appendChild(row));
  }