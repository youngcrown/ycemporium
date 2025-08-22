// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize preloader
    initPreloader();
    
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize theme toggle
    initThemeToggle();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize project filters
    initProjectFilters();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize back to top button
    initBackToTop();
});

// Preloader
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    if (preloader) {
        window.addEventListener('load', function() {
            // Add a slight delay for better effect
            setTimeout(function() {
                preloader.classList.add('fade-out');
                
                // Remove preloader from DOM after animation completes
                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        });
    }
}

// Custom cursor
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(function() {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Add hover effect to links and buttons
    const hoverElements = document.querySelectorAll('a, button, .filter-btn, .tech-icon, .social-link');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.opacity = '0.5';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.borderColor = 'transparent';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.opacity = '0.7';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
        });
    });
}

// Navigation
function initNavigation() {
    const header = document.querySelector('header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('show');
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('show');
            
            // Get the target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Scroll to the target section
            window.scrollTo({
                top: targetSection.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Update active link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Theme toggle
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }
    
    // Toggle theme on click
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Save theme preference
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .about-stats, .tech-icon');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            window.scrollTo({
                top: aboutSection.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    }
}

// Project filters
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Testimonial slider
function initTestimonialSlider() {
    const track = document.querySelector('.testimonial-track');
    const slides = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    
    let currentIndex = 0;
    
    // Update slider position
    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }
    
    // Previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    }
    
    // Event listeners
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentIndex = index;
            updateSlider();
        });
    });
    
    // Auto slide
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto slide on hover
    track.addEventListener('mouseenter', () => clearInterval(slideInterval));
    track.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 5000));
}

// Form validation
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let valid = true;
            const inputs = form.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (valid) {
                // Show success message (in a real scenario, you would send the form data to a server)
                const formContainer = document.querySelector('.contact-form-container');
                formContainer.innerHTML = `
                    <div class="form-success">
                        <div class="success-icon">
                            <i class="fas fa-check"></i>
                        </div>
                        <h3>Message Sent Successfully!</h3>
                        <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
                    </div>
                `;
                
                // Style the success message
                const formSuccess = document.querySelector('.form-success');
                formSuccess.style.textAlign = 'center';
                formSuccess.style.padding = '4rem 2rem';
                
                const successIcon = document.querySelector('.success-icon');
                successIcon.style.width = '80px';
                successIcon.style.height = '80px';
                successIcon.style.borderRadius = '50%';
                successIcon.style.background = 'var(--gradient-primary)';
                successIcon.style.display = 'flex';
                successIcon.style.alignItems = 'center';
                successIcon.style.justifyContent = 'center';
                successIcon.style.margin = '0 auto 2rem';
                
                const iconElement = document.querySelector('.success-icon i');
                iconElement.style.fontSize = '4rem';
                iconElement.style.color = 'white';
            }
        });
    }
}

// Back to top button
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}