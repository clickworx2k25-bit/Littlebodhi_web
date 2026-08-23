// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  
  // Sticky Navigation
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // observer.unobserve(entry.target); // Uncomment to reveal only once
      }
    });
  };
  
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };
  
  const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
  
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });
  
  // Trigger reveal on load for elements already in view
  setTimeout(() => {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if(rect.top < window.innerHeight) {
        el.classList.add('active');
      }
    });
  }, 100);

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if(mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      // Basic toggle for now, can be improved with a proper mobile menu slide out
      if(navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(255, 253, 248, 0.95)';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
      }
    });
  }

  // Accordion Logic
  const accItems = document.querySelectorAll('.acc-item');
  accItems.forEach(item => {
    const header = item.querySelector('.acc-header');
    header.addEventListener('click', () => {
      // Close all others
      accItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          other.querySelector('.acc-icon').textContent = '+';
        }
      });
      // Toggle current
      item.classList.toggle('active');
      const icon = item.querySelector('.acc-icon');
      if (item.classList.contains('active')) {
        icon.textContent = '-';
      } else {
        icon.textContent = '+';
      }
    });
  });

  // Testimonials Carousel
  const testItems = document.querySelectorAll('.testimonial-item');
  const testDots = document.querySelectorAll('.carousel-dots .dot');
  let currentTestimonial = 0;

  if (testItems.length > 0) {
    const showTestimonial = (index) => {
      testItems.forEach(item => item.classList.remove('active'));
      testDots.forEach(dot => dot.classList.remove('active'));
      
      testItems[index].classList.add('active');
      if (testDots[index]) {
        testDots[index].classList.add('active');
      }
    };

    testDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
      });
    });

    // Auto rotate
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testItems.length;
      showTestimonial(currentTestimonial);
    }, 5000);
  }

  // Number Counters Animation
  const counters = document.querySelectorAll('.counter');
  let hasAnimated = false;
  
  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000; // 2 seconds
      const step = target / (duration / 16); // 60fps
      
      let current = 0;
      
      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.innerText = Math.ceil(current) + (counter.parentElement.innerText.includes('%') ? '' : '+');
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target + (counter.parentElement.innerText.includes('%') ? '' : '+');
        }
      };
      
      updateCounter();
    });
  };
  
  // Trigger counters on scroll
  const statsSection = document.getElementById('statistics');
  if (statsSection) {
    window.addEventListener('scroll', () => {
      if (hasAnimated) return;
      const rect = statsSection.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        animateCounters();
        hasAnimated = true;
      }
    });
  }

});
