// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Search Destinations Function
function searchDestinations() {
    const destination = document.getElementById('destination-input').value;
    const checkinDate = document.getElementById('checkin-date').value;
    const checkoutDate = document.getElementById('checkout-date').value;
    const guests = document.getElementById('guests').value;

    // Validate inputs
    if (!destination.trim()) {
        showNotification('Please enter a destination', 'error');
        return;
    }

    if (!checkinDate || !checkoutDate) {
        showNotification('Please select check-in and check-out dates', 'error');
        return;
    }

    if (new Date(checkinDate) >= new Date(checkoutDate)) {
        showNotification('Check-out date must be after check-in date', 'error');
        return;
    }

    // Simulate search (in real implementation, this would make an API call)
    showNotification('Searching for destinations...', 'info');
    
    setTimeout(() => {
        // Redirect to destinations page with search parameters
        const searchParams = new URLSearchParams({
            destination: destination,
            checkin: checkinDate,
            checkout: checkoutDate,
            guests: guests
        });
        
        window.location.href = `destinations.html?${searchParams.toString()}`;
    }, 1500);
}

// Newsletter Subscription
function subscribeNewsletter(event) {
    event.preventDefault();
    
    const emailInput = event.target.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate API call
    const button = event.target.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Subscribing...';
    button.disabled = true;
    
    setTimeout(() => {
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        emailInput.value = '';
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add notification to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 1.1rem;
        padding: 0;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(notificationStyles);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loading');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.destination-card, .feature-card, .testimonial-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Set default dates for search
document.addEventListener('DOMContentLoaded', () => {
    const checkinInput = document.getElementById('checkin-date');
    const checkoutInput = document.getElementById('checkout-date');
    
    if (checkinInput && checkoutInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const weekLater = new Date(today);
        weekLater.setDate(weekLater.getDate() + 7);
        
        checkinInput.min = today.toISOString().split('T')[0];
        checkoutInput.min = tomorrow.toISOString().split('T')[0];
        
        // Set default values
        checkinInput.value = tomorrow.toISOString().split('T')[0];
        checkoutInput.value = weekLater.toISOString().split('T')[0];
    }
});

// Update checkout date minimum when checkin date changes
document.getElementById('checkin-date')?.addEventListener('change', function() {
    const checkoutInput = document.getElementById('checkout-date');
    const checkinDate = new Date(this.value);
    const minCheckout = new Date(checkinDate);
    minCheckout.setDate(minCheckout.getDate() + 1);
    
    checkoutInput.min = minCheckout.toISOString().split('T')[0];
    
    // If checkout date is before or equal to checkin date, update it
    if (new Date(checkoutInput.value) <= checkinDate) {
        checkoutInput.value = minCheckout.toISOString().split('T')[0];
    }
});

// Destination card hover effects
document.querySelectorAll('.destination-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Testimonials auto-rotation (optional)
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function rotateTestimonials() {
    if (testimonials.length > 1) {
        testimonials.forEach((testimonial, index) => {
            testimonial.style.opacity = index === currentTestimonial ? '1' : '0.7';
            testimonial.style.transform = index === currentTestimonial ? 'scale(1.05)' : 'scale(1)';
        });
        
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    }
}

// Start testimonial rotation every 5 seconds
if (testimonials.length > 1) {
    setInterval(rotateTestimonials, 5000);
}

// Search suggestions (mock data)
const popularDestinations = [
    'Paris, France',
    'Tokyo, Japan',
    'New York, USA',
    'London, UK',
    'Rome, Italy',
    'Barcelona, Spain',
    'Amsterdam, Netherlands',
    'Prague, Czech Republic',
    'Bali, Indonesia',
    'Santorini, Greece',
    'Dubai, UAE',
    'Sydney, Australia'
];

// Add search suggestions functionality
document.getElementById('destination-input')?.addEventListener('input', function() {
    const input = this.value.toLowerCase();
    const suggestions = popularDestinations.filter(dest => 
        dest.toLowerCase().includes(input)
    ).slice(0, 5);
    
    // Remove existing suggestions
    const existingSuggestions = document.querySelector('.search-suggestions');
    if (existingSuggestions) {
        existingSuggestions.remove();
    }
    
    if (input.length > 0 && suggestions.length > 0) {
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'search-suggestions';
        suggestionsDiv.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border-radius: 0 0 10px 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            max-height: 200px;
            overflow-y: auto;
        `;
        
        suggestions.forEach(suggestion => {
            const suggestionItem = document.createElement('div');
            suggestionItem.textContent = suggestion;
            suggestionItem.style.cssText = `
                padding: 12px 15px;
                cursor: pointer;
                border-bottom: 1px solid #eee;
                transition: background-color 0.3s ease;
            `;
            
            suggestionItem.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#f8f9fa';
            });
            
            suggestionItem.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'white';
            });
            
            suggestionItem.addEventListener('click', function() {
                document.getElementById('destination-input').value = suggestion;
                suggestionsDiv.remove();
            });
            
            suggestionsDiv.appendChild(suggestionItem);
        });
        
        this.parentElement.style.position = 'relative';
        this.parentElement.appendChild(suggestionsDiv);
    }
});

// Close suggestions when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-field')) {
        const suggestions = document.querySelector('.search-suggestions');
        if (suggestions) {
            suggestions.remove();
        }
    }
});

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add loading states for better UX
function addLoadingState(element, text = 'Loading...') {
    const originalContent = element.innerHTML;
    element.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${text}`;
    element.disabled = true;
    
    return () => {
        element.innerHTML = originalContent;
        element.disabled = false;
    };
}

// Error handling for failed image loads
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
        this.alt = 'Image not available';
    });
});

console.log('TravelWithArslan Travel Website - JavaScript loaded successfully!');
console.log('Features: Mobile navigation, search functionality, newsletter subscription, animations, and more!');