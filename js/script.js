/**
 * Sayara Travels - Main JavaScript
 * Author: Sayara Travels Team
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const navbar = document.getElementById('navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const backToTop = document.getElementById('backToTop');
    const heroSlider = document.querySelector('.hero-slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevSlide = document.querySelector('.prev-slide');
    const nextSlide = document.querySelector('.next-slide');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    const prevTestimonial = document.querySelector('.prev-testimonial');
    const nextTestimonial = document.querySelector('.next-testimonial');
    const dropdownLinks = document.querySelectorAll('.nav-menu li.dropdown > a');
    const contactForm = document.getElementById('contact-form');
    
    let currentSlide = 0;
    let currentTestimonial = 0;
    let slideInterval;
    let testimonialInterval;
    
    // Functions
    
    // Toggle Mobile Menu
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Toggle menu icon
        if (menuToggle.querySelector('i').classList.contains('fa-bars')) {
            menuToggle.querySelector('i').classList.remove('fa-bars');
            menuToggle.querySelector('i').classList.add('fa-times');
        } else {
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        }
    }
    
    // Close Mobile Menu when clicking outside
    function closeMobileMenuOnOutsideClick(e) {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            toggleMobileMenu();
        }
    }
    
    // Handle Scroll Events
    function handleScroll() {
        // Sticky Header
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Back to Top Button
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
        
        // Add animation to elements when they enter the viewport
        const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');
        
        animatedElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementHeight = el.getBoundingClientRect().height;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - elementHeight / 2) {
                el.style.animationDelay = el.dataset.delay || '0s';
                el.style.animationDuration = el.dataset.duration || '1s';
                el.classList.add('animated');
            }
        });
    }
    
    // Smooth Scroll for Anchor Links
    function smoothScroll(e) {
        if (this.hash !== '') {
            e.preventDefault();
            
            const hash = this.hash;
            const targetElement = document.querySelector(hash);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - navbar.offsetHeight,
                    behavior: 'smooth'
                });
                
                // Update URL hash
                window.history.pushState(null, null, hash);
            }
        }
    }
    
    // Hero Slider Functions
    function showSlide(n) {
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Ensure n is within bounds
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlideHandler() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlideHandler() {
        showSlide(currentSlide - 1);
    }
    
    function dotClickHandler() {
        const dotIndex = Array.from(dots).indexOf(this);
        showSlide(dotIndex);
        
        // Reset slider interval
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    function startSlideInterval() {
        slideInterval = setInterval(() => {
            nextSlideHandler();
        }, 5000);
    }
    
    // Testimonial Slider Functions
    function showTestimonial(n) {
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        testimonialDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Ensure n is within bounds
        currentTestimonial = (n + testimonialSlides.length) % testimonialSlides.length;
        
        testimonialSlides[currentTestimonial].classList.add('active');
        testimonialDots[currentTestimonial].classList.add('active');
    }
    
    function nextTestimonialHandler() {
        showTestimonial(currentTestimonial + 1);
    }
    
    function prevTestimonialHandler() {
        showTestimonial(currentTestimonial - 1);
    }
    
    function testimonialDotClickHandler() {
        const dotIndex = Array.from(testimonialDots).indexOf(this);
        showTestimonial(dotIndex);
        
        // Reset testimonial interval
        clearInterval(testimonialInterval);
        startTestimonialInterval();
    }
    
    function startTestimonialInterval() {
        testimonialInterval = setInterval(() => {
            nextTestimonialHandler();
        }, 6000);
    }
    
    // Toggle Dropdown Menus
    function toggleDropdown(e) {
        e.preventDefault();
        
        const parentLi = this.parentElement;
        
        // Toggle active class on the parent li
        if (window.innerWidth < 992) {
            parentLi.classList.toggle('active');
            
            // Toggle the icon rotation
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = parentLi.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
            }
        }
    }
    
    // Form Submission
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.disabled = true;
        submitButton.innerHTML = 'Sending...';
        
        // Simulate an AJAX request
        setTimeout(() => {
            // Reset form
            this.reset();
            
            // Show success message
            const formContainer = this.parentElement;
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out to us. Our team will get back to you shortly.</p>
                <button class="btn btn-primary send-another">Send Another Message</button>
            `;
            
            formContainer.innerHTML = '';
            formContainer.appendChild(successMessage);
            
            // Add event listener to "Send Another Message" button
            const sendAnotherButton = formContainer.querySelector('.send-another');
            if (sendAnotherButton) {
                sendAnotherButton.addEventListener('click', () => {
                    // Restore the original form
                    formContainer.innerHTML = '';
                    formContainer.appendChild(this);
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalText;
                });
            }
        }, 2000);
    }
    
    // Initialize Functions
    function init() {
        // Start slider intervals
        if (slides.length > 0) {
            startSlideInterval();
        }
        
        if (testimonialSlides.length > 0) {
            startTestimonialInterval();
        }
        
        // Initial scroll check
        handleScroll();
        
        // Handle Back to Top click
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        // Add animation classes to elements
        document.querySelectorAll('[data-animation]').forEach(el => {
            el.classList.add(el.dataset.animation);
        });
    }
    
    // Event Listeners
    
    // Menu Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Menu Close Button
    const navMenuClose = document.querySelector('.nav-menu-close');
    if (navMenuClose) {
        navMenuClose.addEventListener('click', toggleMobileMenu);
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', closeMobileMenuOnOutsideClick);
    
    // Scroll Events
    window.addEventListener('scroll', handleScroll);
    
    // Smooth Scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
    });
    
    // Hero Slider
    if (prevSlide && nextSlide) {
        prevSlide.addEventListener('click', () => {
            prevSlideHandler();
            clearInterval(slideInterval);
            startSlideInterval();
        });
        
        nextSlide.addEventListener('click', () => {
            nextSlideHandler();
            clearInterval(slideInterval);
            startSlideInterval();
        });
    }
    
    // Slider Dots
    dots.forEach(dot => {
        dot.addEventListener('click', dotClickHandler);
    });
    
    // Testimonial Slider
    if (prevTestimonial && nextTestimonial) {
        prevTestimonial.addEventListener('click', () => {
            prevTestimonialHandler();
            clearInterval(testimonialInterval);
            startTestimonialInterval();
        });
        
        nextTestimonial.addEventListener('click', () => {
            nextTestimonialHandler();
            clearInterval(testimonialInterval);
            startTestimonialInterval();
        });
    }
    
    // Testimonial Dots
    testimonialDots.forEach(dot => {
        dot.addEventListener('click', testimonialDotClickHandler);
    });
    
    // Dropdown Menus
    dropdownLinks.forEach(link => {
        link.addEventListener('click', toggleDropdown);
    });
    
    // Contact Form
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Initialize
    init();
});