// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize pricing toggle
    initPricingToggle();
    
    // Initialize FAQ accordion
    initFaqAccordion();
    
    // Initialize smooth scroll for service links
    initSmoothScroll();
});

// Pricing toggle functionality
function initPricingToggle() {
    const pricingToggle = document.getElementById('pricing-toggle');
    const monthlyAmounts = document.querySelectorAll('.amount.monthly');
    const annualAmounts = document.querySelectorAll('.amount.annual');
    const monthlyPeriods = document.querySelectorAll('.period.monthly');
    const annualPeriods = document.querySelectorAll('.period.annual');
    
    if (pricingToggle) {
        pricingToggle.addEventListener('change', function() {
            if (this.checked) {
                // Show annual pricing
                monthlyAmounts.forEach(amount => amount.style.display = 'none');
                annualAmounts.forEach(amount => amount.style.display = 'inline');
                monthlyPeriods.forEach(period => period.style.display = 'none');
                annualPeriods.forEach(period => period.style.display = 'inline');
            } else {
                // Show monthly pricing
                monthlyAmounts.forEach(amount => amount.style.display = 'inline');
                annualAmounts.forEach(amount => amount.style.display = 'none');
                monthlyPeriods.forEach(period => period.style.display = 'inline');
                annualPeriods.forEach(period => period.style.display = 'none');
            }
        });
    }
}

// FAQ accordion functionality
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Smooth scroll for service links
function initSmoothScroll() {
    const serviceLinks = document.querySelectorAll('.service-link');
    
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add animation to service cards on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = entry.target.classList.contains('featured') 
                ? 'scale(1.05)' 
                : 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe service cards and pricing cards
window.addEventListener('load', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    pricingCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = card.classList.contains('featured') 
            ? 'scale(0.95)' 
            : 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});