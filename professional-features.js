// Student Guide JavaScript Features

// Theme toggle
let currentTheme = localStorage.getItem('theme') || 'light';

function initTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const themeBtn = document.querySelector('[onclick="toggleTheme()"]');
    if (themeBtn) {
        themeBtn.textContent = currentTheme === 'light' ? '🌙' : '☀️';
    }
}

// Typing animation
const typingTexts = ['Career Path', 'Dream Job', 'Future Success', 'Perfect Course'];
let currentTextIndex = 0;

function startTypingAnimation() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;
    
    typeText(typingElement);
}

function typeText(element) {
    const text = typingTexts[currentTextIndex];
    let i = 0;
    element.textContent = '';
    
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text[i];
            i++;
        } else {
            clearInterval(typeInterval);
            setTimeout(() => {
                eraseText(element);
            }, 2000);
        }
    }, 100);
}

function eraseText(element) {
    const text = element.textContent;
    let i = text.length;
    
    const eraseInterval = setInterval(() => {
        if (i > 0) {
            element.textContent = text.substring(0, i - 1);
            i--;
        } else {
            clearInterval(eraseInterval);
            currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
            setTimeout(() => typeText(element), 500);
        }
    }, 50);
}

// Search suggestions
function initSearchSuggestions() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', function(e) {
        const query = e.target.value;
        if (query.length >= 2) {
            showSearchSuggestions(query);
        } else {
            hideSearchSuggestions();
        }
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-input-wrapper')) {
            hideSearchSuggestions();
        }
    });
}

function showSearchSuggestions(query) {
    const popularCourses = [
        'MBBS', 'B.Tech Computer Science', 'BBA', 'CA', 'NEET', 'JEE',
        'ITI Electrician', 'Diploma Civil', 'NCC', 'Army', 'BCA', 'B.Com',
        'Fashion Design', 'Hotel Management', 'Pharmacy', 'Nursing'
    ];

    const suggestions = popularCourses.filter(course => 
        course.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);

    const suggestionsContainer = document.getElementById('searchSuggestions');
    
    if (suggestions.length > 0) {
        let html = '';
        suggestions.forEach(suggestion => {
            html += `<div class="suggestion-item" onclick="selectSuggestion('${suggestion}')">${suggestion}</div>`;
        });
        suggestionsContainer.innerHTML = html;
        suggestionsContainer.style.display = 'block';
    } else {
        hideSearchSuggestions();
    }
}

function selectSuggestion(suggestion) {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = suggestion;
    hideSearchSuggestions();
}

function hideSearchSuggestions() {
    const suggestionsContainer = document.getElementById('searchSuggestions');
    if (suggestionsContainer) {
        suggestionsContainer.style.display = 'none';
    }
}

// Mobile menu
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    navMenu.classList.toggle('active');
    toggle.classList.toggle('active');
    
    const spans = toggle.querySelectorAll('span');
    if (toggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans.forEach(span => {
            span.style.transform = '';
            span.style.opacity = '';
        });
    }
}

// Navigation
function navigateToPathways(stage) {
    window.location.href = `pathways.html?stage=${stage}`;
}

// Scroll animations
function initScrollAnimations() {
    const cards = document.querySelectorAll('.feature-card');
    
    function checkScroll() {
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight - 100) {
                card.classList.add('animate-in');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on load
}

// Initialize everything when page loads
window.addEventListener('DOMContentLoaded', function() {
    initTheme();
    startTypingAnimation();
    initSearchSuggestions();
    initScrollAnimations();
});