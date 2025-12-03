/*
=============================================
PERSONAL PORTFOLIO - JAVASCRIPT
=============================================
Handles:
1. Dark/Light mode toggle with localStorage persistence
2. Mobile menu toggle
3. Dynamic year in footer
4. Smooth scroll behavior
5. Navbar scroll effects (optional)
=============================================
*/
document.addEventListener('DOMContentLoaded', function() {
    
    /*
    =============================================
    1. THEME TOGGLE (Dark/Light Mode)
    =============================================
    */
    
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement; // The <html> element
    
    // Function to get the current theme
    function getCurrentTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }

        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        // Default to light theme
        return 'light';
    }
    
    // Function to apply the theme
    function applyTheme(theme) {

        htmlElement.setAttribute('data-theme', theme);
        
        localStorage.setItem('theme', theme);
        
        const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
        themeToggle.setAttribute('aria-label', label);
    }
    
    // Function to toggle between themes
    function toggleTheme() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    }
    
    // Apply the initial theme on page load
    applyTheme(getCurrentTheme());
    
    // Add click event listener to toggle button
    themeToggle.addEventListener('click', toggleTheme);
    
    // Listen for system theme changes (if user changes OS dark mode)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
    
    
    /*
    =============================================
    2. MOBILE MENU TOGGLE
    =============================================
    */
    
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            const isExpanded = navLinks.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
        });
        
        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navLinks.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
    
    
    /*
    =============================================
    3. DYNAMIC YEAR IN FOOTER
    =============================================
    */
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    
    /*
    =============================================
    4. SMOOTH SCROLL FOR NAVIGATION LINKS
    =============================================
    */
    
    // Get all anchor links that start with #
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate position with navbar offset
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    /*
    =============================================
    5. NAVBAR SCROLL EFFECT
    =============================================
    */
    

    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled down
        if (currentScroll > 50) {
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });

    
    
    /*
    =============================================
    6. INTERSECTION OBSERVER FOR ANIMATIONS
    =============================================
    */
    
    const observerOptions = {
        root: null, // Use viewport as root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of element is visible
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with the class
    document.querySelectorAll('.fade-in-on-scroll').forEach(function(element) {
        observer.observe(element);
    });
    
    
    /*
    =============================================
    7. CONSOLE MESSAGE
    =============================================
    */
    
    console.log('%c👋 Hello, curious developer!', 'font-size: 20px; font-weight: bold;');
    console.log('%cLooking at the code? Feel free to reach out!', 'font-size: 14px;');
    
});


/*
=============================================
HELPER FUNCTIONS FOR FUTURE USE
=============================================
*/

// Debounce function - limits how often a function can run
// Useful for scroll/resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function - ensures function runs at most once every X ms
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(function() {
                inThrottle = false;
            }, limit);
        }
    };
}
