// Load site data and populate content
document.addEventListener('DOMContentLoaded', async () => {
  // Load data
  let siteData;
  try {
    const response = await fetch('site-data.json');
    siteData = await response.json();
  } catch (err) {
    console.error('Failed to load site data:', err);
    siteData = null;
  }
  
  if (siteData) {
    populateContent(siteData);
  }
  
  // Fade-up animation on scroll
  setupScrollAnimations();
  
  // Smooth scroll for nav links
  setupSmoothScroll();
  
  // Three.js hero animation
  initHeroAnimation();
});

function populateContent(data) {
  // Populate recognition lists
  if (data.recognition) {
    populateRecognitionList('scientific', data.recognition.scientific);
    populateRecognitionList('entrepreneurial', data.recognition.entrepreneurial);
    populateRecognitionList('media', data.recognition.media);
  }
  
  // Populate writing gallery
  if (data.gallery && data.gallery.length > 0) {
    populateGallery(data.gallery);
  }
}

function populateRecognitionList(category, items) {
  const categoryMap = {
    'scientific': 0,
    'entrepreneurial': 1,
    'media': 2
  };
  
  const categories = document.querySelectorAll('.recognition__category');
  if (!categories[categoryMap[category]]) return;
  
  const list = categories[categoryMap[category]].querySelector('.recognition__list');
  if (!list || !items || items.length === 0) return;
  
  // Clear placeholder
  list.innerHTML = '';
  
  // Add items
  items.slice(0, 8).forEach(item => {
    const li = document.createElement('li');
    li.textContent = item.Title || item.title || item;
    list.appendChild(li);
  });
}

function populateGallery(items) {
  const grid = document.querySelector('.writing__grid');
  if (!grid) return;
  
  // Clear placeholders
  grid.innerHTML = '';
  
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'writing__item fade-up';
    
    const thumb = document.createElement('div');
    thumb.className = 'writing__thumb';
    
    const img = document.createElement('img');
    img.src = item.hero || 'assets/images/placeholder.jpg';
    img.alt = item.slug;
    img.loading = 'lazy';
    
    thumb.appendChild(img);
    
    const title = document.createElement('h3');
    title.className = 'writing__title';
    title.textContent = item.title || formatSlug(item.slug);
    
    div.appendChild(thumb);
    div.appendChild(title);
    grid.appendChild(div);
  });
}

function formatSlug(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function setupScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-up');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  fadeElements.forEach(el => {
    observer.observe(el);
  });
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

function initHeroAnimation() {
  const heroVisual = document.querySelector('.hero__visual');
  if (!heroVisual) return;
  
  // Simple canvas animation (lightweight alternative to Three.js)
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.opacity = '0.15';
  heroVisual.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  
  // Particle system representing nanoparticles
  const particles = [];
  const particleCount = 40;
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.opacity = Math.random() * 0.5 + 0.3;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
      ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  // Initialize particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    // Draw connections between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          ctx.strokeStyle = `rgba(212, 175, 55, ${0.2 * (1 - distance / 150)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // Handle resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}
