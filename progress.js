// Progress Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Animate completion percentage counter
    animateCounter();
    
    // Animate progress bar
    animateProgressBar();
    
    // Initialize task interactions
    initTaskInteractions();
});

// Animate the percentage counter
function animateCounter() {
    const counter = document.querySelector('.completion-percentage');
    if (!counter) return;
    
    const target = parseInt(counter.getAttribute('data-target')) || 0;
    const duration = 1500;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(target * easeOutQuart);
        
        counter.textContent = current + '%';
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Animate the progress bar
function animateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    if (!progressBar) return;
    
    const progress = parseInt(progressBar.getAttribute('data-progress')) || 0;
    
    // Small delay to allow CSS transition to work
    setTimeout(() => {
        progressBar.style.width = progress + '%';
    }, 300);
}

// Initialize task checkbox interactions
function initTaskInteractions() {
    const taskItems = document.querySelectorAll('.task-item');
    
    taskItems.forEach(item => {
        const checkbox = item.querySelector('.task-checkbox');
        
        item.addEventListener('click', (e) => {
            // Don't toggle if clicking on a link or button inside
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
            
            toggleTask(item, checkbox);
        });
    });
}

// Toggle task completion state
function toggleTask(item, checkbox) {
    const isCompleted = item.classList.contains('completed');
    const isInProgress = item.classList.contains('in-progress');
    
    // Remove current states
    item.classList.remove('completed', 'in-progress');
    checkbox.classList.remove('checked');
    
    // Remove status badge if exists
    const existingBadge = item.querySelector('.task-status-badge');
    if (existingBadge) {
        existingBadge.remove();
    }
    
    if (!isCompleted && !isInProgress) {
        // Unchecked -> In Progress
        item.classList.add('in-progress');
        
        // Add in-progress badge
        const badge = document.createElement('span');
        badge.className = 'task-status-badge';
        badge.textContent = 'IN PROGRESS';
        item.appendChild(badge);
    } else if (isInProgress) {
        // In Progress -> Completed
        item.classList.add('completed');
        checkbox.classList.add('checked');
    }
    // Completed -> Unchecked (do nothing, classes already removed)
    
    // Update completion count
    updateCompletionCount();
}

// Update the completion count display
function updateCompletionCount() {
    const completedCount = document.getElementById('completed-count');
    const totalCount = document.getElementById('total-count');
    const completedTasks = document.querySelectorAll('.task-item.completed').length;
    const totalTasks = document.querySelectorAll('.task-item').length;
    
    if (completedCount) {
        completedCount.textContent = completedTasks;
    }
    
    if (totalCount) {
        totalCount.textContent = totalTasks;
    }
    
    // Update progress bar and percentage
    const percentage = Math.round((completedTasks / totalTasks) * 100);
    updateProgress(percentage);
}

// Update progress bar and percentage display
function updateProgress(percentage) {
    const counter = document.querySelector('.completion-percentage');
    const progressBar = document.querySelector('.progress-bar');
    
    if (counter) {
        animateToValue(counter, percentage);
    }
    
    if (progressBar) {
        progressBar.style.width = percentage + '%';
    }
}

// Animate counter to a specific value
function animateToValue(element, target) {
    const current = parseInt(element.textContent) || 0;
    const duration = 500;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const value = Math.round(current + (target - current) * easeOutQuart);
        
        element.textContent = value + '%';
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Handle scroll animations for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with fade-in classes
document.querySelectorAll('.fade-in, .fade-in-delay-1, .fade-in-delay-2, .fade-in-delay-3').forEach(el => {
    observer.observe(el);
});
