document.addEventListener('DOMContentLoaded', () => {
    // Get all dropdown buttons
    const dropdownBtns = document.querySelectorAll('.dropdown-btn');

    // Add ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        
        const diameter = Math.max(rect.width, rect.height);
        const radius = diameter / 2;
        
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${event.clientX - rect.left - radius}px`;
        ripple.style.top = `${event.clientY - rect.top - radius}px`;
        ripple.classList.add('ripple');
        
        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }
        
        button.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => ripple.remove(), 600);
    }

    // Add click event listener to each button
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Add ripple effect
            createRipple(e);
            
            // Find the associated dropdown content
            const dropdownContent = btn.nextElementSibling;
            const isActive = dropdownContent.classList.contains('active');
            
            // Close all dropdowns in the same card
            const card = btn.closest('.recipe-card');
            const otherDropdowns = card.querySelectorAll('.dropdown-content');
            otherDropdowns.forEach(dropdown => {
                if (dropdown.classList.contains('active')) {
                    dropdown.style.maxHeight = null;
                    dropdown.classList.remove('active');
                }
            });
            
            // Toggle the clicked dropdown
            if (!isActive) {
                dropdownContent.classList.add('active');
                dropdownContent.style.maxHeight = dropdownContent.scrollHeight + "px";
            }
        });
    });

    // Add hover effect to recipe cards
    const recipeCards = document.querySelectorAll('.recipe-card');
    recipeCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .dropdown-btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            background-color: rgba(255, 255, 255, 0.2);
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});