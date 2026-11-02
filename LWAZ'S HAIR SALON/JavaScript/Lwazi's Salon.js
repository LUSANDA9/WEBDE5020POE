document.addEventListener('DOMContentLoaded', () => {
    console.log("Lwazi's Hair Salon JS Loaded Successfully!");

    highlightActiveNavLink();

    initBookingForm();

    initPriceEstimator();
});

function highlightActiveNavLink() {
    const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('header nav a, .navbar a');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentLocation) {
            link.classList.add('active');
            
            link.style.fontWeight = 'bold';
            link.style.textDecoration = 'underline';
        }
    });
}

function initBookingForm() {
    const bookingForm = document.querySelector('form');
    
    if (!bookingForm) return;

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = bookingForm.querySelector('input[type="text"], input[name="name"]');
        const emailInput = bookingForm.querySelector('input[type="email"], input[name="email"]');
        const phoneInput = bookingForm.querySelector('input[type="tel"], input[name="phone"]');
        const messageInput = bookingForm.querySelector('textarea, input[name="message"]');

        if (nameInput && !nameInput.value.trim()) {
            alert('Please enter your full name.');
            nameInput.focus();
            return;
        }

        if (phoneInput && !phoneInput.value.trim()) {
            alert('Please provide a contact phone number.');
            phoneInput.focus();
            return;
        }

        alert(`Thank you, ${nameInput ? nameInput.value : 'Valued Customer'}! Your appointment request has been received. We will contact you shortly.`);
        
        
        bookingForm.reset();
    });
}

function initPriceEstimator() {
    const serviceSelector = document.querySelector('#service-select');
    const lengthSelector = document.querySelector('#length-select');
    const priceDisplay = document.querySelector('#estimated-price');

    if (!serviceSelector || !priceDisplay) return;

    const prices = {
        haircut: { short: 150, medium: 200, long: 250 },
        styling: { short: 200, medium: 280, long: 350 },
        braiding: { short: 350, medium: 450, long: 600 }
    };

    function updatePrice() {
        const service = serviceSelector.value;
        const length = lengthSelector ? lengthSelector.value : 'medium';
        
        if (prices[service] && prices[service][length]) {
            priceDisplay.textContent = `Estimated Price: R${prices[service][length]}`;
        }
    }

    serviceSelector.addEventListener('change', updatePrice);
    if (lengthSelector) {
        lengthSelector.addEventListener('change', updatePrice);
    }
}
