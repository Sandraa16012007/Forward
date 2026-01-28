// Header Component
const createHeader = () => {
    const header = document.createElement('header');
    header.className = 'header';

    header.innerHTML = `
        <nav class="navbar">
            <div class="container nav-container">
                <div class="logo">
                    <a href="index.html" class="logo">
                        <img src="logo.png" alt="Forward Logo" />
                    </a>
                </div>
                
                <button class="mobile-toggle" aria-label="Toggle navigation">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                
                <ul class="nav-menu">
                    <li><a href="#features" class="nav-link">Home</a></li>
                    <li><a href="#how-it-works" class="nav-link">About</a></li>
                    <li><a href="#pricing" class="nav-link">Features</a></li>
                </ul>
                
                <div class="nav-actions">
                    <a href="#" class="nav-link">Log In</a>
                    <button class="btn btn-primary btn-sm">Get Started</button>
                </div>
            </div>
        </nav>
    `;

    // Add styles for header
    const style = document.createElement('style');
    style.textContent = `
        .header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid var(--gray-200);
            transition: all var(--transition-base);
        }
        
        .header.scrolled {
            background: rgba(255, 255, 255, 0.95);
            box-shadow: var(--shadow-md);
        }
        
        .navbar {
            padding: 16px 0;
        }
        
        .nav-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 24px;
            font-weight: var(--font-weight-bold);
            color: var(--text-primary);
            text-decoration: none;
            transition: all var(--transition-base);
        }
        
        .logo i {
            font-size: 28px;
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            transform: rotate(-45deg);
        }
        
        .logo:hover {
            transform: translateY(-2px);
        }
        
        .nav-menu {
            display: flex;
            list-style: none;
            gap: 32px;
            margin: 0;
        }
        
        .nav-link {
            color: var(--text-secondary);
            text-decoration: none;
            font-weight: var(--font-weight-medium);
            font-size: 15px;
            transition: all var(--transition-base);
            position: relative;
        }
        
        .nav-link::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--gradient-primary);
            transition: width var(--transition-base);
        }
        
        .nav-link:hover {
            color: var(--primary-color);
        }
        
        .nav-link:hover::after {
            width: 100%;
        }
        
        .nav-actions {
            display: flex;
            align-items: center;
            gap: 20px;
        }
        
        .btn-sm {
            padding: 10px 20px;
            font-size: 14px;
        }
        
        .mobile-toggle {
            display: none;
            flex-direction: column;
            gap: 5px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 8px;
        }
        
        .mobile-toggle span {
            width: 25px;
            height: 3px;
            background: var(--text-primary);
            border-radius: 3px;
            transition: all var(--transition-base);
        }
        
        .mobile-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(7px, 7px);
        }
        
        .mobile-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 70px;
                left: 0;
                right: 0;
                flex-direction: column;
                background: var(--white);
                padding: 20px;
                box-shadow: var(--shadow-lg);
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all var(--transition-base);
                gap: 16px;
            }
            
            .nav-menu.active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .nav-actions {
                display: none;
            }
            
            .mobile-toggle {
                display: flex;
            }
        }
    `;

    document.head.appendChild(style);
    return header;
};

// Insert header into container
const headerContainer = document.getElementById('header-container');
if (headerContainer) {
    headerContainer.appendChild(createHeader());
}

// Handle scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Handle mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});