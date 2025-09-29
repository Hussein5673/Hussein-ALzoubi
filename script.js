// Three.js 3D Background
let scene, camera, renderer, particles;

function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 5;
    
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    document.getElementById('three-container').appendChild(renderer.domElement);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x3498db,
        transparent: true,
        opacity: 0.6
    });
    
    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Mouse movement effect
    document.addEventListener('mousemove', animateParticles);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        particles.rotation.y += 0.001;
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function animateParticles(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    particles.rotation.x = mouseY * 0.0001;
    particles.rotation.y = mouseX * 0.0001;
}

// Initialize Three.js when page loads
window.addEventListener('load', initThree);

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Back to top button
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.pageYOffset > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
    }
});

// Add floating elements
function createFloatingElements() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const elementCount = 3;
        
        for (let i = 0; i < elementCount; i++) {
            const element = document.createElement('div');
            element.classList.add('floating-element');
            
            // Random position
            const left = Math.random() * 90 + 5;
            const top = Math.random() * 80 + 10;
            
            element.style.left = `${left}%`;
            element.style.top = `${top}%`;
            
            // Random size
            const size = Math.random() * 60 + 40;
            element.style.width = `${size}px`;
            element.style.height = `${size}px`;
            
            // Random color
            const colors = ['rgba(52, 152, 219, 0.1)', 'rgba(231, 76, 60, 0.1)', 'rgba(46, 204, 113, 0.1)'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            element.style.background = randomColor;
            
            // Random animation delay
            const delay = Math.random() * 5;
            element.style.animationDelay = `${delay}s`;
            
            section.appendChild(element);
        }
    });
}

// Initialize floating elements
createFloatingElements();

// Contact form handling for Formspree
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    showFormStatus('Message sent successfully! I will get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    const errorData = await response.json();
                    if (errorData.error) {
                        showFormStatus('Error: ' + errorData.error, 'error');
                    } else {
                        showFormStatus('There was a problem sending your message. Please try again.', 'error');
                    }
                }
            } catch (error) {
                showFormStatus('There was a problem sending your message. Please check your connection and try again.', 'error');
            } finally {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }
    
    function showFormStatus(message, type) {
        if (formStatus) {
            formStatus.textContent = message;
            formStatus.style.display = 'block';
            formStatus.style.background = type === 'success' ? '#d4edda' : '#f8d7da';
            formStatus.style.color = type === 'success' ? '#155724' : '#721c24';
            formStatus.style.border = type === 'success' ? '1px solid #c3e6cb' : '1px solid #f5c6cb';
            
            // Hide status after 5 seconds for success, 8 seconds for errors
            const hideTime = type === 'success' ? 5000 : 8000;
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, hideTime);
        }
    }
});

// Add scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.skill-card, .project-card, .cert-card, .timeline-content');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        } else {
            element.style.opacity = "0";
            element.style.transform = "translateY(20px)";
        }
    });
}

// Set initial state for animation elements
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.skill-card, .project-card, .cert-card, .timeline-content');
    
    elements.forEach(element => {
        element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
    });
    
    // Trigger initial animation check
    handleScrollAnimations();
});

// Add scroll event listener for animations
window.addEventListener('scroll', handleScrollAnimations);