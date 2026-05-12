// =============================================
//   DriveKhi — Premium Car Rental Karachi
//   JavaScript Interactions
// =============================================

// ===== NAV SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('is-scrolled');
  } else {
    navbar.classList.remove('is-scrolled');
  }
});

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.querySelector('[data-nav-toggle]');
const navMenu = document.querySelector('[data-nav-menu]');
navToggle?.addEventListener('click', () => {
  navMenu.classList.toggle('is-open');
});

// Close nav when a link is clicked
navMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('is-open');
  });
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== FLEET FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const carCards = document.querySelectorAll('.car-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    const filter = btn.dataset.filter;

    carCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('is-hidden');
        card.style.animation = 'fadeIn 0.4s ease forwards';
      } else {
        card.classList.add('is-hidden');
      }
    });
  });
});

// ===== WHATSAPP BOOKING FORM =====
const bookBtn = document.getElementById('bookBtn');
bookBtn?.addEventListener('click', () => {
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const cartype = document.getElementById('cartype').value;
  const pickup = document.getElementById('pickup').value;
  const returndate = document.getElementById('returndate').value;
  const location = document.getElementById('location').value.trim();

  if (!name || !phone || !cartype || !pickup || !returndate || !location) {
    // Shake effect on empty fields
    const emptyFields = document.querySelectorAll('.booking__form input:invalid, .booking__form select');
    emptyFields.forEach(field => {
      if (!field.value) {
        field.style.borderColor = '#ef4444';
        field.style.animation = 'shake 0.4s ease';
        setTimeout(() => {
          field.style.borderColor = '';
          field.style.animation = '';
        }, 1000);
      }
    });
    alert('Please fill all fields before booking.');
    return;
  }

  // Format dates nicely
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const message = `Assalamualaikum! I want to book a car from DriveKhi 🚗

📋 *Booking Details:*
👤 Name: ${name}
📱 Phone: ${phone}
🚘 Car: ${cartype}
📅 Pick-up: ${formatDate(pickup)}
📅 Return: ${formatDate(returndate)}
📍 Location: ${location}

Please confirm availability. Shukriya! 🙏`;

  const whatsappNumber = '923001234567';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');

  // Button feedback
  bookBtn.textContent = '✅ Opening WhatsApp...';
  bookBtn.style.background = '#22c55e';
  setTimeout(() => {
    bookBtn.textContent = '📲 Send Booking Request on WhatsApp';
    bookBtn.style.background = '';
  }, 3000);
});

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 20);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat__num');
      statNums.forEach(num => {
        const text = num.textContent;
        if (text.includes('+')) {
          const val = parseInt(text);
          animateCounter(num, val, '+');
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero__stats');
if (heroStats) statsObserver.observe(heroStats);

// ===== SHAKE ANIMATION =====
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-6px); }
    40% { transform: translateX(6px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

// ===== SET MIN DATE FOR DATE INPUTS =====
const today = new Date().toISOString().split('T')[0];
const pickupInput = document.getElementById('pickup');
const returnInput = document.getElementById('returndate');
if (pickupInput) pickupInput.min = today;
if (returnInput) returnInput.min = today;

pickupInput?.addEventListener('change', () => {
  if (returnInput) returnInput.min = pickupInput.value;
});
