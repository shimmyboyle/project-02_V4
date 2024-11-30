window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const menuBar = document.querySelector('.menu-bar');
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        menuBar.classList.add('visible');
    } else {
        header.classList.remove('scrolled');
        menuBar.classList.remove('visible');
    }
});

document.querySelector('.hamburger').addEventListener('click', () => {
    const menuBar = document.querySelector('.menu-bar');
    menuBar.classList.toggle('visible');
});


function checkTextVisibility() {
    const textContent = document.querySelector('.text-content');
    const textLines = document.querySelectorAll('.text-line');
    const triggerBottom = window.innerHeight * 0.8;

    // Check if the text content area is in view
    const contentTop = textContent.getBoundingClientRect().top;
    
    if (contentTop < triggerBottom) {
        // If content is in view, show all lines
        textLines.forEach((line) => {
            line.classList.add('visible');
        });
    } else {
        // If content is out of view, hide all lines
        textLines.forEach((line) => {
            line.classList.remove('visible');
        });
    }
}

// Add scroll event listener
window.addEventListener('scroll', checkTextVisibility);
// Initial check in case elements are already in view
document.addEventListener('DOMContentLoaded', checkTextVisibility);


function updateParallax(scrolled) {
    const parallaxContainer = document.querySelector('.parallax-container');
    const firstSection = document.querySelector('.section-1');
    const backLayer = document.querySelector('.parallax-back');
    const middleLayer = document.querySelector('.parallax-middle');
    const frontLayer = document.querySelector('.parallax-front');
    
    const firstSectionRect = firstSection.getBoundingClientRect();
    
    // Start transition earlier - when section is half way up the screen
    const opacity = Math.max(0, Math.min(1, 1 - (firstSectionRect.bottom / (window.innerHeight * 0.8))));
    
    // Update positions starting from when the first section comes into view
    const backRate = (scrolled - window.innerHeight) * 0.01;
    const middleRate = (scrolled - window.innerHeight) * 0.35;
    const frontRate = (scrolled - window.innerHeight) * 0.8;
    
    const viewportHeight = window.innerHeight;
    const adjustedBackRate = backRate * (viewportHeight / 1000);
    const adjustedMiddleRate = middleRate * (viewportHeight / 1000);
    const adjustedFrontRate = frontRate * (viewportHeight / 1000);
    
    // Always update positions
    backLayer.style.transform = `translateX(-50%) translateY(${adjustedBackRate}px)`;
    middleLayer.style.transform = `translateY(${adjustedMiddleRate}px)`;
    frontLayer.style.transform = `translateY(${adjustedFrontRate}px)`;
    
    // Set opacity
    backLayer.style.opacity = opacity;
    middleLayer.style.opacity = opacity;
    frontLayer.style.opacity = opacity;
}

// Scroll handler
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    requestAnimationFrame(() => {
        updateParallax(scrolled);
    });
});

// Initial call and resize handler
window.addEventListener('resize', () => {
    const scrolled = window.pageYOffset;
    updateParallax(scrolled);
});

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    updateParallax(window.pageYOffset);
});
// Initial call
window.dispatchEvent(new Event('resize'));




//FOOTER


function checkFooterVisibility() {
    const footer = document.querySelector('.footer-section');
    const footerLogo = document.querySelector('.footer-logo');
    const footerHeading = document.querySelector('.footer-heading');
    const footerEmail = document.querySelector('.footer-email');
    
    // Debug logging
    console.log('Elements found:', {
        footer: !!footer,
        footerLogo: !!footerLogo,
        footerHeading: !!footerHeading,
        footerEmail: !!footerEmail
    });

    if (!footer || !footerLogo || !footerHeading || !footerEmail) return;

    const footerRect = footer.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Show elements when footer is 25% in view
    const triggerPoint = viewportHeight * 0.75;
    const isVisible = footerRect.top < triggerPoint;
    
    console.log('Visibility check:', {
        footerTop: footerRect.top,
        triggerPoint,
        isVisible
    });

    if (isVisible) {
        footerLogo.classList.add('visible');
        footerHeading.classList.add('visible');
        footerEmail.classList.add('visible');
        console.log('Added visible class to logo');
    } else {
        footerLogo.classList.remove('visible');
        footerHeading.classList.remove('visible');
        footerEmail.classList.remove('visible');
        console.log('Removed visible class from logo');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing footer visibility check');
    checkFooterVisibility();
    window.addEventListener('scroll', checkFooterVisibility);
});

// Also check after a short delay to ensure all assets are loaded
window.addEventListener('load', () => {
    setTimeout(checkFooterVisibility, 100);
});




// Text Section Visibility Check
function checkTextSectionVisibility() {
    const textSection = document.querySelector('.text-section');
    if (!textSection) return;
    
    const heading = textSection.querySelector('h2');
    const paragraphs = textSection.querySelectorAll('p');
    
    const triggerPoint = window.innerHeight * 0.75;
    const textSectionRect = textSection.getBoundingClientRect();
    
    if (textSectionRect.top < triggerPoint) {
        if (heading) heading.classList.add('visible');
        paragraphs.forEach((p, index) => {
            setTimeout(() => {
                p.classList.add('visible');
            }, 200 * (index + 1));
        });
    }
}

// Add scroll event listener for text section
window.addEventListener('scroll', checkTextSectionVisibility);
// Initial check
document



//LISTENER FOR COPY REPLACE USING LOWDB

document.addEventListener('DOMContentLoaded', () => {
    fetch('/get-copy')
      .then((response) => response.json())
      .then((data) => {
        const textLines = document.querySelectorAll('.text-line');
        const copyLines = data.copy;
  
        if (textLines.length === copyLines.length) {
          textLines.forEach((line, index) => {
            line.textContent = copyLines[index];
          });
        } else {
          console.error('Mismatch between the number of text-line elements and the copy lines');
        }
      })
      .catch((error) => {
        console.error('Error fetching copy:', error);
      });
});