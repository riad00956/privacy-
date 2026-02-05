// Mobile-First JavaScript for Ultimate Flow
// Optimized for performance and mobile experience

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Ultimate Flow - Mobile Optimized');
    
    // Initialize all components
    initMobileMenu();
    initTheme();
    initTypingEffect();
    initSmoothScroll();
    initBackToTop();
    initFAQ();
    initPricingSlider();
    initLazyLoading();
    initFormValidation();
    initServiceWorker();
    initInstallPrompt();
    initPerformanceMonitor();
    initTouchEvents();
    
    // Start with loading spinner hidden
    hideLoadingSpinner();
});

// ==================== CORE FUNCTIONS ====================

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking overlay
    mobileOverlay.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        this.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close menu when clicking links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Theme Toggle
function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark-mode');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDark = document.documentElement.classList.toggle('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            
            // Add animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    // Detect system theme preference
    if (window.matchMedia) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Listen for system theme changes
        prefersDark.addEventListener('change', function(e) {
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    document.documentElement.classList.add('dark-mode');
                } else {
                    document.documentElement.classList.remove('dark-mode');
                }
            }
        });
    }
}

// Typing Effect for Hero
function initTypingEffect() {
    const typingText = document.getElementById('typing-text');
    if (!typingText) return;
    
    const words = ['BOT HOSTING', 'TELEGRAM BOTS', 'AUTOMATION', 'AI SOLUTIONS'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }
        
        typingText.textContent = currentWord.substring(0, charIndex);
        typingText.classList.add('gradient-text');
        
        let typeSpeed = 120;
        
        if (isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isEnd = true;
            typeSpeed = 1500;
        } else if (isDeleting && charIndex === 0) {
            isEnd = true;
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
        
        if (isEnd && !isDeleting) {
            typeSpeed = 1500;
            isDeleting = true;
            isEnd = false;
        }
    }
    
    // Start typing after a short delay
    setTimeout(type, 1000);
}

// Smooth Scroll
function initSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Smooth scroll
                const offset = 80; // Account for fixed header
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll to specific sections
    window.scrollToFeatures = function() {
        const featuresSection = document.getElementById('features');
        if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    window.scrollToContact = function() {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// FAQ Accordion
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const item = this.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all other items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active', !isActive);
        });
    });
}

// Pricing Slider
function initPricingSlider() {
    const pricingCards = document.getElementById('pricingCards');
    const dots = document.querySelectorAll('.slider-dots .dot');
    
    if (!pricingCards || !dots.length) return;
    
    let currentSlide = 0;
    
    // Initialize dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            goToSlide(index);
        });
    });
    
    function goToSlide(index) {
        currentSlide = index;
        const cardWidth = pricingCards.children[0].offsetWidth + 16; // width + gap
        pricingCards.scrollTo({
            left: cardWidth * index,
            behavior: 'smooth'
        });
        updateDots();
    }
    
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Auto-scroll on swipe
    let startX = 0;
    let isScrolling = false;
    
    pricingCards.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        isScrolling = true;
    });
    
    pricingCards.addEventListener('touchmove', function(e) {
        if (!isScrolling) return;
        e.preventDefault();
    });
    
    pricingCards.addEventListener('touchend', function(e) {
        if (!isScrolling) return;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        // Minimum swipe distance
        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentSlide < dots.length - 1) {
                goToSlide(currentSlide + 1);
            } else if (diff < 0 && currentSlide > 0) {
                goToSlide(currentSlide - 1);
            }
        }
        
        isScrolling = false;
    });
    
    // Handle scroll events
    pricingCards.addEventListener('scroll', function() {
        const scrollPosition = this.scrollLeft;
        const cardWidth = this.children[0].offsetWidth + 16;
        const newSlide = Math.round(scrollPosition / cardWidth);
        
        if (newSlide !== currentSlide) {
            currentSlide = newSlide;
            updateDots();
        }
    });
}

// Lazy Loading for images
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img.lazy');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        lazyImages.forEach(function(img) {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
    }
}

// Form Validation
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Validate form
        let isValid = true;
        const requiredFields = this.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                showError(field, 'This field is required');
            } else if (field.type === 'email' && !isValidEmail(field.value)) {
                isValid = false;
                showError(field, 'Please enter a valid email');
            } else {
                clearError(field);
            }
        });
        
        if (!isValid) {
            showToast('Please fill in all required fields correctly', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
            
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
    
    // Helper functions
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    function showError(field, message) {
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;
        
        let errorElement = formGroup.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: var(--danger);
            font-size: var(--font-size-sm);
            margin-top: var(--spacing-xs);
        `;
        
        field.style.borderColor = 'var(--danger)';
    }
    
    function clearError(field) {
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;
        
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        
        field.style.borderColor = '';
    }
}

// Service Worker for PWA
function initServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js').then(function(registration) {
                console.log('ServiceWorker registration successful:', registration.scope);
            }).catch(function(error) {
                console.log('ServiceWorker registration failed:', error);
            });
        });
    }
}

// Install Prompt for PWA
function initInstallPrompt() {
    let deferredPrompt;
    const installPrompt = document.getElementById('installPrompt');
    
    window.addEventListener('beforeinstallprompt', function(e) {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        
        // Stash the event so it can be triggered later
        deferredPrompt = e;
        
        // Show the install prompt
        setTimeout(() => {
            if (installPrompt) {
                installPrompt.classList.add('show');
            }
        }, 5000);
    });
    
    window.installPWA = function() {
        if (!deferredPrompt) return;
        
        // Show the install prompt
        deferredPrompt.prompt();
        
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then(function(choiceResult) {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            
            // Clear the deferredPrompt variable
            deferredPrompt = null;
            
            // Hide the install prompt
            hideInstallPrompt();
        });
    };
    
    window.hideInstallPrompt = function() {
        if (installPrompt) {
            installPrompt.classList.remove('show');
        }
    };
    
    // Hide prompt when installing via other methods
    window.addEventListener('appinstalled', function() {
        console.log('PWA was installed');
        hideInstallPrompt();
    });
}

// Performance Monitoring
function initPerformanceMonitor() {
    // Log Core Web Vitals
    if ('PerformanceObserver' in window) {
        try {
            // LCP (Largest Contentful Paint)
            const lcpObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
            });
            lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
            
            // FID (First Input Delay)
            const fidObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                entries.forEach(entry => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                });
            });
            fidObserver.observe({ type: 'first-input', buffered: true });
            
            // CLS (Cumulative Layout Shift)
            let clsValue = 0;
            let clsEntries = [];
            
            const clsObserver = new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                        clsEntries.push(entry);
                    }
                }
                console.log('CLS:', clsValue);
            });
            
            clsObserver.observe({ type: 'layout-shift', buffered: true });
        } catch (e) {
            console.log('Performance monitoring not supported:', e);
        }
    }
}

// Touch Event Optimizations
function initTouchEvents() {
    // Prevent double-tap zoom on buttons
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Add touch feedback
    document.addEventListener('touchstart', function() {
        // Add active class to touched element
    }, { passive: true });
    
    document.addEventListener('touchend', function() {
        // Remove active class
    }, { passive: true });
}

// ==================== APP FUNCTIONS ====================

// Launch Bot Functionality
window.launchBot = function() {
    const modal = document.getElementById('launchModal');
    const launchProgress = document.getElementById('launchProgress');
    const progressText = document.getElementById('progressText');
    const terminalOutput = document.getElementById('terminalOutput');
    
    if (!modal) return;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset progress
    if (launchProgress) launchProgress.style.width = '0%';
    if (progressText) progressText.textContent = 'Initializing...';
    if (terminalOutput) terminalOutput.textContent = '> Waiting for launch command...';
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
};

window.startLaunch = function() {
    const launchProgress = document.getElementById('launchProgress');
    const progressText = document.getElementById('progressText');
    const terminalOutput = document.getElementById('terminalOutput');
    
    if (!launchProgress || !progressText || !terminalOutput) return;
    
    const steps = [
        { progress: 10, text: 'Initializing @zen_xbot...', log: '> Initializing bot deployment system...' },
        { progress: 30, text: 'Checking requirements...', log: '> Checking system requirements... ✓' },
        { progress: 50, text: 'Connecting to Telegram...', log: '> Connecting to Telegram API... ✓' },
        { progress: 70, text: 'Uploading bot files...', log: '> Uploading bot files to server... ✓' },
        { progress: 90, text: 'Starting services...', log: '> Starting bot services... ✓' },
        { progress: 100, text: 'Launch complete!', log: '> ✅ @zen_xbot is now LIVE!\n> Access at: https://t.me/zen_xbot' }
    ];
    
    let currentStep = 0;
    
    function nextStep() {
        if (currentStep >= steps.length) {
            // Update button to open bot
            const launchBtn = document.querySelector('.modal-footer .btn-primary');
            if (launchBtn) {
                launchBtn.innerHTML = '<i class="fab fa-telegram"></i> Open @zen_xbot';
                launchBtn.onclick = function() {
                    window.open('https://t.me/zen_xbot', '_blank');
                    closeModal();
                };
            }
            return;
        }
        
        const step = steps[currentStep];
        
        // Update progress
        launchProgress.style.width = step.progress + '%';
        progressText.textContent = step.text;
        
        // Update terminal
        terminalOutput.textContent += '\n' + step.log;
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
        
        currentStep++;
        
        // Schedule next step
        setTimeout(nextStep, 800);
    }
    
    // Start the process
    nextStep();
};

window.closeModal = function() {
    const modal = document.getElementById('launchModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

// Start Hosting
window.startHosting = function() {
    const button = event?.target || document.querySelector('.btn-primary');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Open bot in new tab
        window.open('https://t.me/zen_xbot', '_blank');
        
        // Reset button
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 1000);
    }, 500);
};

// Bot Management Functions
window.manageBot = function(button) {
    // Show bot management options
    showToast('Bot management options coming soon!', 'info');
};

window.startBot = function(button) {
    const botItem = button.closest('.bot-item');
    const statusDot = botItem.querySelector('.status');
    
    if (!botItem || !statusDot) return;
    
    // Show loading
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    button.disabled = true;
    
    // Simulate bot starting
    setTimeout(() => {
        // Update status
        statusDot.classList.remove('offline');
        statusDot.classList.add('online');
        
        // Update button
        button.innerHTML = '<i class="fas fa-cog"></i>';
        button.onclick = function() { manageBot(this); };
        button.disabled = false;
        
        // Show success message
        showToast('Bot started successfully!', 'success');
    }, 1500);
};

window.deployNewBot = function() {
    showToast('New bot deployment feature coming soon!', 'info');
};

window.openAnalytics = function() {
    showToast('Analytics dashboard coming soon!', 'info');
};

window.openSettings = function() {
    showToast('Settings panel coming soon!', 'info');
};

// ==================== UTILITY FUNCTIONS ====================

// Toast Notifications
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // Set icon based on type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    if (type === 'warning') icon = 'exclamation-triangle';
    
    toast.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-primary);
        color: var(--text-primary);
        padding: var(--spacing-md) var(--spacing-lg);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        border: 1px solid var(--border);
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        z-index: 9999;
        animation: toastIn 0.3s ease;
        max-width: 350px;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes toastIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes toastOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-20px);
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(toast);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        toast.style.animation = 'toastOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
    
    // Remove on click
    toast.addEventListener('click', function() {
        this.style.animation = 'toastOut 0.3s ease';
        setTimeout(() => this.remove(), 300);
    });
}

// Loading Spinner
function showLoadingSpinner() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.style.display = 'flex';
    }
}

function hideLoadingSpinner() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.style.display = 'none';
    }
}

// Performance optimization: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization: Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==================== PERFORMANCE OPTIMIZATIONS ====================

// Optimize scroll events
window.addEventListener('scroll', throttle(function() {
    // Your scroll-related code here
}, 100));

// Optimize resize events
window.addEventListener('resize', debounce(function() {
    // Your resize-related code here
}, 250));

// Preload critical resources
function preloadCriticalResources() {
    const criticalImages = [
        'logo.png'
        // Add other critical images here
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading when page is idle
if ('requestIdleCallback' in window) {
    window.requestIdleCallback(preloadCriticalResources);
} else {
    setTimeout(preloadCriticalResources, 1000);
}

// ==================== ERROR HANDLING ====================

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    // You can send errors to your analytics service here
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

// ==================== OFFLINE SUPPORT ====================

// Check online/offline status
window.addEventListener('online', function() {
    showToast('You are back online!', 'success');
});

window.addEventListener('offline', function() {
    showToast('You are offline. Some features may not work.', 'warning');
});

// ==================== BROWSER COMPATIBILITY ====================

// Check for modern browser features
function checkBrowserCompatibility() {
    const features = {
        'ES6': 'Promise' in window,
        'Fetch': 'fetch' in window,
        'ServiceWorker': 'serviceWorker' in navigator,
