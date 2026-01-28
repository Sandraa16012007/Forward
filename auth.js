// Display stufff

// Login Page JavaScript

// Password Toggle
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        
        // Toggle icon
        const icon = this.querySelector('i');
        if (type === 'password') {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
            this.classList.remove('active');
        } else {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
            this.classList.add('active');
        }
    });
}

// Password Strength Checker
const checkPasswordStrength = (password) => {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    
    return strength;
};

const updatePasswordStrength = () => {
    const password = passwordInput.value;
    const strengthContainer = document.getElementById('passwordStrength');
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    
    if (!password) {
        strengthContainer.classList.remove('visible');
        return;
    }
    
    strengthContainer.classList.add('visible');
    
    const strength = checkPasswordStrength(password);
    
    // Remove all classes
    strengthFill.classList.remove('weak', 'medium', 'strong');
    strengthText.classList.remove('weak', 'medium', 'strong');
    
    if (strength <= 2) {
        strengthFill.classList.add('weak');
        strengthText.classList.add('weak');
        strengthText.textContent = 'Weak password';
    } else if (strength <= 4) {
        strengthFill.classList.add('medium');
        strengthText.classList.add('medium');
        strengthText.textContent = 'Medium strength';
    } else {
        strengthFill.classList.add('strong');
        strengthText.classList.add('strong');
        strengthText.textContent = 'Strong password';
    }
};

if (passwordInput) {
    passwordInput.addEventListener('input', updatePasswordStrength);
}

// Email Validation
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Username Validation
const validateUsername = (username) => {
    // Username should be 3-20 characters, alphanumeric and underscores only
    const re = /^[a-zA-Z0-9_]{3,20}$/;
    return re.test(username);
};

// Form Validation
const validateForm = () => {
    let isValid = true;
    
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const terms = document.getElementById('terms');
    
    // Clear previous errors
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error', 'success');
    });
    
    // Validate username
    if (!username.value.trim()) {
        showError(username, 'Username is required');
        isValid = false;
    } else if (!validateUsername(username.value)) {
        showError(username, 'Username must be 3-20 characters (letters, numbers, underscores only)');
        isValid = false;
    } else {
        showSuccess(username);
    }
    
    // Validate email
    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    } else {
        showSuccess(email);
    }
    
    // Validate password
    if (!password.value) {
        showError(password, 'Password is required');
        isValid = false;
    } else if (password.value.length < 8) {
        showError(password, 'Password must be at least 8 characters');
        isValid = false;
    } else {
        showSuccess(password);
    }
    
    // Validate terms
    if (!terms.checked) {
        alert('Please accept the Terms of Service and Privacy Policy');
        isValid = false;
    }
    
    return isValid;
};

const showError = (input, message) => {
    const formGroup = input.closest('.form-group') || input.closest('.password-wrapper')?.parentElement;
    if (formGroup) {
        formGroup.classList.add('error');
        formGroup.classList.remove('success');
        
        // Add error message if not exists
        let errorMsg = formGroup.querySelector('.error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            formGroup.appendChild(errorMsg);
        }
        errorMsg.textContent = message;
    }
};

const showSuccess = (input) => {
    const formGroup = input.closest('.form-group') || input.closest('.password-wrapper')?.parentElement;
    if (formGroup) {
        formGroup.classList.add('success');
        formGroup.classList.remove('error');
        
        const errorMsg = formGroup.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.textContent = '';
        }
    }
};

// Form Submission
const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        const submitBtn = loginForm.querySelector('.btn-submit');
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate API call (replace with actual API call)
        setTimeout(() => {
            console.log('Form submitted:', { username, email, password });
            
            // Show success message
            alert('Account created successfully! Welcome to Forward.');
            
            // Reset form
            loginForm.reset();
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Hide password strength
            document.getElementById('passwordStrength').classList.remove('visible');
            
            // Redirect to dashboard (replace with actual redirect)
            // window.location.href = 'dashboard.html';
        }, 2000);
    });
}

// Real-time validation on blur
document.getElementById('username')?.addEventListener('blur', function() {
    if (this.value.trim()) {
        if (!validateUsername(this.value)) {
            showError(this, 'Username must be 3-20 characters (letters, numbers, underscores only)');
        } else {
            showSuccess(this);
        }
    }
});

document.getElementById('email')?.addEventListener('blur', function() {
    if (this.value.trim()) {
        if (!validateEmail(this.value)) {
            showError(this, 'Please enter a valid email address');
        } else {
            showSuccess(this);
        }
    }
});

// Add ripple effect to buttons
const createRipple = (event) => {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
    ripple.classList.add('ripple');
    
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }
    
    button.appendChild(ripple);
};

// Add ripple to all buttons
document.querySelectorAll('.btn, .btn-social').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Input focus animations
const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');

inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});

// Keyboard accessibility for password toggle
if (togglePassword) {
    togglePassword.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
}

// Auto-focus first input
window.addEventListener('load', () => {
    const firstInput = document.getElementById('username');
    if (firstInput) {
        setTimeout(() => {
            firstInput.focus();
        }, 500);
    }
});

// Social login handlers (placeholder)
document.querySelectorAll('.btn-social').forEach(btn => {
    btn.addEventListener('click', function() {
        const provider = this.textContent.trim();
        console.log(`Social login with ${provider}`);
        // Implement actual social login logic here
    });
});

// Password strength tooltip on hover
const passwordLabel = document.querySelector('label[for="password"]');
if (passwordLabel) {
    passwordLabel.title = 'Use at least 8 characters with a mix of letters, numbers, and symbols';
}

// Animate elements on scroll (if page has scroll)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Prevent copy-paste on password field (optional security measure)
// Uncomment if you want to enable this
/*
passwordInput?.addEventListener('paste', (e) => {
    e.preventDefault();
    alert('Pasting is not allowed in the password field');
});
*/

// Console welcome message
console.log('%c Welcome to Forward! ', 'background: #3921A2; color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%c Create your account and start your entrepreneurial journey ', 'font-size: 14px; color: #475569;');

// Detect caps lock
if (passwordInput) {
    passwordInput.addEventListener('keyup', function(e) {
        if (e.getModifierState && e.getModifierState('CapsLock')) {
            console.warn('Caps Lock is on');
            // You can show a warning indicator here
        }
    });
}

// Form data persistence (optional - saves to localStorage)
const saveFormData = () => {
    const formData = {
        username: document.getElementById('username')?.value || '',
        email: document.getElementById('email')?.value || ''
        // Don't save password for security
    };
    localStorage.setItem('forwardSignupData', JSON.stringify(formData));
};

const loadFormData = () => {
    const savedData = localStorage.getItem('forwardSignupData');
    if (savedData) {
        const formData = JSON.parse(savedData);
        if (document.getElementById('username')) {
            document.getElementById('username').value = formData.username || '';
        }
        if (document.getElementById('email')) {
            document.getElementById('email').value = formData.email || '';
        }
    }
};

// Auto-save form data (except password)
document.getElementById('username')?.addEventListener('input', saveFormData);
document.getElementById('email')?.addEventListener('input', saveFormData);

// Load saved data on page load
window.addEventListener('load', loadFormData);


// ________________________________________________________________________________________________________________________