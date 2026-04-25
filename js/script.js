// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 2. Sticky Navbar shadow on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Milestones Accordion Functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Close other open items
            const activeHeader = document.querySelector('.accordion-header.active');
            if (activeHeader && activeHeader !== this) {
                activeHeader.classList.remove('active');
                // The icon is rotated via CSS in the new design, but we can reset text if needed.
                // In our new CSS, we use CSS transforms on the icon instead of changing text,
                // but let's keep the +/- logic just in case, or remove it and let CSS handle the rotation.
                // Actually, CSS handles rotation of the + icon perfectly. Let's just remove the textContent change.
                activeHeader.nextElementSibling.style.maxHeight = null;
            }

            // Toggle current item
            this.classList.toggle('active');
            const content = this.nextElementSibling;

            if (this.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // 4. Active state for navigation links based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjust the offset value if the active state changes too early/late
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // 5. Contact Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Alert for demo form submission
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // 6. Scroll Animations (Intersection Observer)
    const animateElements = document.querySelectorAll('.card, .domain-card, .module-card, .dataset-card, .impact-card, .accordion-item, .doc-card, .team-card, .section-title, .hero-content');
    
    // Add fade-up class to all targeted elements initially
    animateElements.forEach(el => {
        el.classList.add('fade-up');
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe each element
    setTimeout(() => {
        animateElements.forEach(el => observer.observe(el));
    }, 100); // Slight delay to ensure DOM is ready and CSS is applied
});
