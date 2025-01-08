function toggleMenu() {
    const hamburger = document.querySelector('.header__hamburger');
    const menu = document.querySelector('.header__menu');

    hamburger.classList.toggle('active'); 
    menu.classList.toggle('open');         
}

window.onscroll = function () {
    const backToTopButton = document.getElementById('back-to-top');
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopButton.style.display = "block";  
    } else {
        backToTopButton.style.display = "none";  
    }
};

document.getElementById('back-to-top').onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

document.querySelectorAll('.gift-section__tabs a').forEach(tab => {
    tab.addEventListener('click', function(event) {
        event.preventDefault();
        
        const category = this.getAttribute('data-category');
        
        const cards = document.querySelectorAll('.best-gifts-card');
        
        cards.forEach(card => {
            if (category === 'all') {
                card.style.display = 'block'; 
            } else if (card.classList.contains('for-' + category)) {
                card.style.display = 'block';  
            } else {
                card.style.display = 'none'; 
            }
        });
    });
});

