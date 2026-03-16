// Smooth scroll with offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
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

// Observe division cards and about section
document.querySelectorAll('.division-card, .about-content, .contact-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(el);
});

// Dynamic grid animation on scroll
let lastScrollY = window.scrollY;
const gridOverlay = document.querySelector('.grid-overlay');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const scrollDelta = scrollY - lastScrollY;
    
    // Subtle parallax effect on grid
    const currentOpacity = parseFloat(window.getComputedStyle(gridOverlay).opacity);
    const newOpacity = Math.max(0.1, Math.min(0.5, currentOpacity + (scrollDelta * 0.0001)));
    gridOverlay.style.opacity = newOpacity;
    
    lastScrollY = scrollY;
});

// Add glitch effect to title on hover
const titleLine = document.querySelector('.title-line');
if (titleLine) {
    let glitchInterval;
    
    titleLine.addEventListener('mouseenter', () => {
        let glitchCount = 0;
        glitchInterval = setInterval(() => {
            if (glitchCount < 3) {
                titleLine.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
                setTimeout(() => {
                    titleLine.style.transform = 'translate(0, 0)';
                }, 50);
                glitchCount++;
            } else {
                clearInterval(glitchInterval);
            }
        }, 100);
    });
}

// Card activation effect
document.querySelectorAll('.division-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const status = card.querySelector('.card-status');
        if (status && status.textContent === 'ACTIVE') {
            // Add pulse effect to active status
            status.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                status.style.animation = '';
            }, 500);
        }
    });
});

// Cursor trail effect (optional - can be removed if too much)
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
    width: 20px;
    height: 20px;
    border: 2px solid var(--color-primary);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s, transform 0.1s;
    mix-blend-mode: difference;
`;
document.body.appendChild(cursor);

let cursorX = 0, cursorY = 0;
let currentX = 0, currentY = 0;

document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    cursor.style.opacity = '0.6';
});

document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});

// Smooth cursor animation
function animateCursor() {
    currentX += (cursorX - currentX) * 0.2;
    currentY += (cursorY - currentY) * 0.2;
    cursor.style.left = currentX + 'px';
    cursor.style.top = currentY + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Interactive hover on clickable elements
document.querySelectorAll('a, button, .division-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.borderColor = 'var(--color-secondary)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = 'var(--color-primary)';
    });
});

// Console easter egg
console.log(`
%c███████╗██╗   ██╗███╗   ██╗ █████╗ ██╗     ██╗███╗   ██╗██╗  ██╗
%c██╔════╝██║   ██║████╗  ██║██╔══██╗██║     ██║████╗  ██║██║ ██╔╝
%c█████╗  ██║   ██║██╔██╗ ██║███████║██║     ██║██╔██╗ ██║█████╔╝ 
%c██╔══╝  ██║   ██║██║╚██╗██║██╔══██║██║     ██║██║╚██╗██║██╔═██╗ 
%c███████╗╚██████╔╝██║ ╚████║██║  ██║███████╗██║██║ ╚████║██║  ██╗
%c╚══════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝

%cSYSTEMS ONLINE | ALL DIVISIONS OPERATIONAL
%cLooking for something? Contact: contact@eunalink.com
`, 
'color: #00d9ff',
'color: #00d9ff',
'color: #00d9ff',
'color: #ff9500',
'color: #ff9500',
'color: #ff9500',
'color: #00d9ff; font-weight: bold; font-size: 14px;',
'color: #8b9fc4; font-size: 12px;'
);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});
