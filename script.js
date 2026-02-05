// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('backToTop');
const typingText = document.getElementById('typingText');
const launchModal = document.getElementById('launchModal');
const launchProgress = document.getElementById('launchProgress');
const launchTerminal = document.getElementById('launchTerminal');
const contactForm = document.getElementById('contactForm');

// Typing Animation
const words = ['BOT HOSTING', 'TELEGRAM BOTS', 'AUTOMATION', 'AI SOLUTIONS'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

function typeEffect() {
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
        typeSpeed = 1500; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isEnd = true;
        isDeleting = false;
        wordIndex++;
        if (wordIndex >= words.length) {
            wordIndex = 0;
        }
        typeSpeed = 500; // Pause before typing next word
    }
    
    setTimeout(typeEffect, typeSpeed);
    
    if (isEnd && !isDeleting) {
        typeSpeed = 1500;
        isDeleting = true;
        isEnd = false;
    }
}

// Theme Toggle
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('.theme-toggle i');
    
    if (document.body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
}

// Load Saved Theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const icon = document.querySelector('.theme-toggle i');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        icon.className = 'fas fa-sun';
    } else {
        document.body.classList.remove('dark-mode');
        icon.className = 'fas fa-moon';
    }
}

// Back to Top
function initBackToTop() {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'block';
            setTimeout(() => {
                backToTop.style.opacity = '1';
                backToTop.style.transform = 'translateY(0)';
            }, 10);
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.transform = 'translateY(20px)';
            setTimeout(() => {
                backToTop.style.display = 'none';
            }, 300);
        }
    });
    
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth Scroll for Navigation
function initSmoothScroll() {
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
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Active Navigation on Scroll
function initActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Launch Bot Functionality
function launchBot() {
    launchModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset progress
    launchProgress.style.width = '0%';
    launchTerminal.textContent = '> Waiting for launch command...';
}

function closeModal() {
    launchModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function proceedLaunch() {
    const steps = [
        { progress: 25, message: '> Initializing @zen_xbot deployment...' },
        { progress: 50, message: '> Connecting to Telegram API... ✓' },
        { progress: 75, message: '> Deploying bot files to server... ✓' },
        { progress: 90, message: '> Starting bot services... ✓' },
        { progress: 100, message: '> ✅ @zen_xbot is now LIVE and running!\n> You can access it at: https://t.me/zen_xbot' }
    ];
    
    let currentStep = 0;
    
    const simulateLaunch = () => {
        if (currentStep < steps.length) {
            const step = steps[currentStep];
            launchProgress.style.width = `${step.progress}%`;
            launchTerminal.textContent += `\n${step.message}`;
            launchTerminal.scrollTop = launchTerminal.scrollHeight;
            currentStep++;
            setTimeout(simulateLaunch, 800);
        } else {
            // Enable launch button
            const launchBtn = document.querySelector('.modal-footer .btn-primary');
            launchBtn.innerHTML = '<i class="fas fa-external-link-alt"></i> Open Bot';
            launchBtn.onclick = () => {
                window.open('https://t.me/zen_xbot', '_blank');
                closeModal();
            };
        }
    };
    
    simulateLaunch();
}

// Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            const alert = document.createElement('div');
            alert.className = 'alert success';
            alert.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>Message sent successfully! We'll get back to you soon.</span>
            `;
            
            // Add styles for alert
            alert.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--success);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                display: flex;
                align-items: center;
                gap: 0.8rem;
                z-index: 1000;
                animation: slideIn 0.3s ease;
            `;
            
            document.body.appendChild(alert);
            
            // Remove alert after 5 seconds
            setTimeout(() => {
                alert.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => alert.remove(), 300);
            }, 5000);
            
            // Reset form and button
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Start Hosting Button
function startHosting() {
    // Show loading animation
    const button = event.target.closest('.btn-primary');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
    button.disabled = true;
    
    // Simulate API call and redirect
    setTimeout(() => {
        window.open('https://t.me/zen_xbot', '_blank');
        
        // Reset button after delay
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
    }, 1000);
}

// View Demo
function viewDemo() {
    // Create demo modal
    const demoModal = document.createElement('div');
    demoModal.className = 'modal active';
    demoModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-play-circle"></i> Platform Demo</h3>
                <button class="close-modal" onclick="this.closest('.modal').remove(); document.body.style.overflow='auto'">&times;</button>
            </div>
            <div class="modal-body">
                <div style="text-align: center; padding: 2rem;">
                    <i class="fas fa-robot" style="font-size: 4rem; color: var(--primary); margin-bottom: 1rem;"></i>
                    <h4 style="margin-bottom: 1rem; color: var(--dark);">Coming Soon!</h4>
                    <p style="color: var(--gray); margin-bottom: 2rem;">
                        The interactive demo is under development. In the meantime, you can:
                    </p>
                    <div style="display: flex; gap: 1rem; justify-content: center;">
                        <button class="btn-primary" onclick="window.open('https://t.me/zen_xbot', '_blank')">
                            <i class="fab fa-telegram"></i> Try Live Bot
                        </button>
                        <button class="btn-outline" onclick="this.closest('.modal').remove(); document.body.style.overflow='auto'">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(demoModal);
    document.body.style.overflow = 'hidden';
}

// Open Dashboard
function openDashboard() {
    // Show loading
    const button = event.target.closest('.btn-primary');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening...';
    
    // Simulate dashboard loading
    setTimeout(() => {
        // In a real app, this would redirect to the dashboard
        // For now, show a message
        const alert = document.createElement('div');
        alert.className = 'alert info';
        alert.innerHTML = `
            <i class="fas fa-info-circle"></i>
            <span>Dashboard will be available after login. Please use @zen_xbot for authentication.</span>
        `;
        
        alert.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 0.8rem;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(alert);
        
        // Remove alert
        setTimeout(() => {
            alert.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => alert.remove(), 300);
        }, 5000);
        
        button.innerHTML = originalText;
    }, 1000);
}

// Start Bot from Dashboard
function startBot(button) {
    const botItem = button.closest('.bot-item');
    const statusBadge = botItem.querySelector('.status-badge');
    
    // Show loading
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    button.disabled = true;
    
    // Simulate bot starting
    setTimeout(() => {
        statusBadge.textContent = 'Running';
        statusBadge.style.background = 'var(--success)';
        
        // Remove start button and add uptime
        button.remove();
        
        const uptimeSpan = document.createElement('span');
        uptimeSpan.className = 'uptime';
        uptimeSpan.textContent = 'Uptime: 0m';
        
        botItem.querySelector('.bot-status').appendChild(uptimeSpan);
        
        // Simulate uptime counter
        let minutes = 0;
        const uptimeInterval = setInterval(() => {
            minutes++;
            uptimeSpan.textContent = `Uptime: ${minutes}m`;
            
            // Stop after 5 minutes for demo
            if (minutes >= 5) {
                clearInterval(uptimeInterval);
            }
        }, 1000); // Update every second (for demo)
    }, 2000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start typing effect
    setTimeout(typeEffect, 1000);
    
    // Load saved theme
    loadTheme();
    
    // Initialize back to top
    initBackToTop();
    
    // Initialize smooth scroll
    initSmoothScroll();
    
    // Initialize active nav on scroll
    initActiveNavOnScroll();
    
    // Add CSS for alerts
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .alert {
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }
        
        .alert.info {
            background: var(--primary);
        }
        
        .alert.success {
            background: var(--success);
        }
        
        .alert i {
            font-size: 1.2rem;
        }
    `;
    document.head.appendChild(style);
    
    // Add floating particles
    createParticles();
});

// Create floating particles for background
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: ${Math.random() > 0.5 ? 'var(--primary)' : 'var(--secondary)'};
            border-radius: 50%;
            opacity: ${Math.random() * 0.3 + 0.1};
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 20 + 10}s infinite linear;
        `;
        
        // Add CSS for particle animation
        if (!document.querySelector('#particle-animation')) {
            const particleStyle = document.createElement('style');
            particleStyle.id = 'particle-animation';
            particleStyle.textContent = `
                @keyframes floatParticle {
                    0% { transform: translate(0, 0); }
                    25% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
                    50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
                    75% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
                    100% { transform: translate(0, 0); }
                }
            `;
            document.head.appendChild(particleStyle);
        }
        
        particlesContainer.appendChild(particle);
    }
}

// Performance monitoring
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add parallax effect to background
    const particles = document.querySelector('.particles');
    if (particles) {
        particles.style.transform = `translateY(${scrollTop * 0.2}px)`;
    }
    
    lastScrollTop = scrollTop;
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to search (placeholder)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        alert('Search functionality coming soon!');
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            closeModal();
        }
    }
});

// Service worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(error => {
            console.log('ServiceWorker registration failed:', error);
        });
    });
}

// Add animation to feature cards on hover
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add ripple effect to buttons
document.addEventListener('click', function(e) {
    if (e.target.closest('.btn-primary, .btn-secondary, .btn-outline, .nav-btn')) {
        const button = e.target.closest('.btn-primary, .btn-secondary, .btn-outline, .nav-btn');
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            top: ${y}px;
            left: ${x}px;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
});

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);
