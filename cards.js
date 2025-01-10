async function loadGifts(category = 'all') {
    try {
        const response = await fetch('gifts.json');
        const data = await response.json();
        updateActiveTab(category);

        const normalizedCategory = category
            .toLowerCase()
            .replace(/\s+/g, '')
            .replace('for', '');

        const filteredGifts = category === 'all' 
            ? data 
            : data.filter(gift => 
                gift.category
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .replace('for', '') === normalizedCategory
            );

        renderGifts(filteredGifts);
    } catch (error) {
        console.error("Ошибка при загрузке данных подарков:", error);  
    }
}

function updateActiveTab(category) {
    document.querySelectorAll('.gift-section__tabs a').forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-category') === category);
    });
}

function renderGifts(gifts) {
    const container = document.querySelector('.best-gifts-section__cards');
    if (!container) return;

    container.innerHTML = '';

    const categoryClasses = {
        'For Work': 'for-work',
        'For Health': 'for-health',
        'For Harmony': 'for-harmony'
    };

    gifts.forEach(gift => {
        const giftCard = createElement('div', ['best-gifts-card', categoryClasses[gift.category] || '']);
        const textBlock = createElement('div', ['best-gifts-card__text-block']);
        const categoryDiv = createElement('div', ['best-gifts-card__category'], gift.category);
        const nameDiv = createElement('div', ['best-gifts-card__name'], gift.name);

        textBlock.append(categoryDiv, nameDiv);
        giftCard.appendChild(textBlock);
        container.appendChild(giftCard);
    });
}

function createElement(tag, classes = [], textContent = '') {
    const element = document.createElement(tag);
    if (classes.length) element.classList.add(...classes);
    if (textContent) element.textContent = textContent;
    return element;
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.gift-section__tabs a').forEach(tab => {
        tab.addEventListener('click', event => {
            event.preventDefault();
            loadGifts(tab.getAttribute('data-category'));
        });
    });

    loadGifts();
});
