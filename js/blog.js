// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize blog filters
    initBlogFilters();
    
    // Initialize newsletter form
    initNewsletterForm();
});

// Blog filters
function initBlogFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    if (filterButtons.length && blogPosts.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter posts
                blogPosts.forEach(post => {
                    if (filterValue === 'all' || post.getAttribute('data-category').includes(filterValue)) {
                        post.style.display = 'block';
                        
                        // Add animation
                        post.style.opacity = '0';
                        post.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            post.style.opacity = '1';
                            post.style.transform = 'translateY(0)';
                            post.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        }, 10);
                    } else {
                        post.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Newsletter form
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (isValidEmail(email)) {
                // In a real scenario, you would send this to a server
                // For now, just show a success message
                
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'newsletter-success';
                successMessage.innerHTML = `
                    <div class="success-icon">
                        <i class="fas fa-check"></i>
                    </div>
                    <h3>Thank you for subscribing!</h3>
                    <p>You'll now receive the latest design insights directly to your inbox.</p>
                `;
                
                // Replace form with success message
                newsletterForm.parentNode.replaceChild(successMessage, newsletterForm);
                
                // Style the success message
                successMessage.style.textAlign = 'center';
                successMessage.style.color = 'white';
                
                const successIcon = successMessage.querySelector('.success-icon');
                successIcon.style.width = '80px';
                successIcon.style.height = '80px';
                successIcon.style.borderRadius = '50%';
                successIcon.style.background = 'rgba(255, 255, 255, 0.2)';
                successIcon.style.display = 'flex';
                successIcon.style.alignItems = 'center';
                successIcon.style.justifyContent = 'center';
                successIcon.style.margin = '0 auto 2rem';
                
                const iconElement = successIcon.querySelector('i');
                iconElement.style.fontSize = '4rem';
                iconElement.style.color = 'white';
                
                const h3Element = successMessage.querySelector('h3');
                h3Element.style.fontSize = '2.4rem';
                h3Element.style.marginBottom = '1rem';
                
                const pElement = successMessage.querySelector('p');
                pElement.style.fontSize = '1.6rem';
                pElement.style.opacity = '0.9';
            } else {
                // Show error
                emailInput.style.borderColor = 'red';
                emailInput.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
                
                // Reset after 3 seconds
                setTimeout(() => {
                    emailInput.style.borderColor = '';
                    emailInput.style.backgroundColor = '';
                }, 3000);
            }
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add smooth scrolling for pagination links
document.querySelectorAll('.pagination-link, .pagination-next').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // In a real scenario, this would load the next page of posts
        // For now, just update the active state
        document.querySelectorAll('.pagination-link').forEach(link => {
            link.classList.remove('active');
        });
        
        if (this.classList.contains('pagination-link')) {
            this.classList.add('active');
        }
        
        // Scroll to top of blog grid
        const blogGrid = document.querySelector('.blog-grid');
        if (blogGrid) {
            window.scrollTo({
                top: blogGrid.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});