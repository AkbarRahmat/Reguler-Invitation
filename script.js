document.addEventListener('DOMContentLoaded', function() {
    var mainItems = document.querySelectorAll('.main-item');
    var navButtons = document.querySelectorAll('.nav-button');

    // Fungsi untuk memeriksa apakah elemen berada di dalam viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }    

    // Fungsi untuk menambahkan kelas fade-in ke konten saat masuk ke viewport
    function addFadeInClass() {
      mainItems.forEach((element) => {
        const content = element.querySelector(".content")
        if (!isInViewport(content)) {return}

        // Button
        navButtons.forEach(button => {
          const target = button.getAttribute("target")
          if (target == element.id) {
            button.classList.add('select');
          } else {
            button.classList.remove('select');
          }
        })
        
        // Fading
        if (!content.classList.contains('fade-in')) {
          content.classList.add('fade-in');
        }
      });
    }

    // Fungsi untuk menambahkan nav button
    function addNavButtonClass() {
      navButtons.forEach((element) => {
        element.addEventListener("click", () => {
          const target = element.getAttribute("target")
          scrollToSection(target)
        })
      })
    }

    // Memanggil fungsi saat halaman dimuat dan saat digulir
    addFadeInClass();
    window.addEventListener('scroll', addFadeInClass);

    // Memanggil fungsi button
    addNavButtonClass()
});

// Fungsi untuk menggulir ke bagian tertentu
function scrollToSection(sectionId) {
    var section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

// Target date for the countdown (YYYY, MM, DD, HH, MM, SS)
const targetDate = new Date('2024-12-31T23:59:59').getTime();

// Update the countdown every second
const interval = setInterval(function() {
  // Get current date and time
  const now = new Date().getTime();
  
  // Calculate remaining time
  const distance = targetDate - now;
  
  // Calculate days, hours, minutes and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  // Display the countdown
  document.getElementById('days').innerHTML = formatTime(days);
  document.getElementById('hours').innerHTML = formatTime(hours);
  document.getElementById('minutes').innerHTML = formatTime(minutes);
  document.getElementById('seconds').innerHTML = formatTime(seconds);
  
  // If the countdown is finished, display a message
  if (distance < 0) {
    clearInterval(interval);
    document.getElementById('countdown').innerHTML = 'EXPIRED';
  }
}, 1000);

// Function to add leading zeros to single digit numbers
function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}
