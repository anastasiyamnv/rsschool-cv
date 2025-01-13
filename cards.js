// создание элемента с классами и текстом
function createElement(tag, classes = [], textContent = '') {
    const element = document.createElement(tag);
    if (classes.length) element.classList.add(...classes);
    if (textContent) element.textContent = textContent;
    return element;
}

// загрузка и фильтрация подарков по категории
function normalizeCategory(category) {
    return category
        .toLowerCase().
        replace(/\s+/g, '').
        replace('for', '');
}

// загрузка и фильтрация подарков по категории
async function loadGifts(category = 'all') {
    try {
        const response = await fetch('gifts.json');
        const data = await response.json();
        updateActiveTab(category);

        const normalizedCategory = normalizeCategory(category);

        const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';

        // фильтрация подарков
        const filteredGifts = (category === 'all' && isHomePage)
            ? getRandomGifts(data, 4)
            : (category === 'all'
                ? data
                : data.filter(gift => normalizeCategory(gift.category) === normalizedCategory));

        renderGifts(filteredGifts);
    } catch (error) {
        console.error("Ошибка при загрузке данных подарков:", error);
    }
}

function getRandomGifts(gifts, count) {
    const shuffled = [...gifts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// создание элемента с заданными классами и текстом
function createElement(tag, classes = [], textContent = '') {
    const element = document.createElement(tag);
    if (classes.length) element.classList.add(...classes);
    if (textContent) element.textContent = textContent;
    return element;
}

function updateActiveTab(category) {
    document.querySelectorAll('.gift-section__tabs a').forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-category') === category);
    });
}

// отрисовка подарков
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

        giftCard.addEventListener('click', () => openModal(gift));
    });
}

// модальное окно подарка
function openModal(gift) {
    if (!gift) return;

    const modal = document.getElementById('giftModal');
    if (!modal) return;

    const modalCard = modal.querySelector('.modal-card');
    if (!modalCard) return;

    // добавление класса по категории
    const categoryClass = gift.category?.toLowerCase().replace(/\s+/g, '-');
    if (categoryClass) modalCard.classList.add(categoryClass);

    modalCard.querySelector('.best-gifts-card__category').textContent = gift.category || '';
    modalCard.querySelector('.best-gifts-card__name').textContent = gift.name || '';
    modalCard.querySelector('.best-gifts-card__description').textContent = gift.description || '';

    const superpowersBlock = modalCard.querySelector('.best-gifts-superpowers__list');
    superpowersBlock.innerHTML = '';

    // суперсилы подарка
    if (gift.superpowers) {
        for (const [name, value] of Object.entries(gift.superpowers)) {
            const listItem = createElement('li');
            const nameSpan = createElement('span', ['paragraph'], name);

            const valueContainer = createElement('div', ['superpower-value-container']);
            const valueSpan = createElement('span', ['superpower-value'], value);
            const snowflakesDiv = createElement('div', ['superpower-snowflakes']);

            // снежинки
            const snowflakesCount = Math.ceil(parseInt(value.replace('+', ''), 10) / 100);
            for (let i = 0; i < 5; i++) {
                const snowflake = createElement('img', ['snowflake']);
                snowflake.src = 'images/snowflake.svg';
                snowflake.alt = 'Snowflake';
                if (i < snowflakesCount) snowflake.classList.add('active');
                snowflakesDiv.appendChild(snowflake);
            }

            valueContainer.append(valueSpan, snowflakesDiv);
            listItem.append(nameSpan, valueContainer);
            superpowersBlock.appendChild(listItem);
        }
    }

    // блокировка скролла страницы
    document.body.style.overflow = 'hidden';
    modal.style.display = 'flex';
}

// закрытие модального окна
function closeModal() {
    const modal = document.getElementById('giftModal');
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
    // обработчик кликов для вкладок категорий
    document.querySelectorAll('.gift-section__tabs a').forEach(tab => {
        tab.addEventListener('click', event => {
            event.preventDefault();
            loadGifts(tab.getAttribute('data-category'));
        });
    });

    // обработчик клика на кнопку закрытия модального окна
    const modal = document.getElementById('giftModal');
    if (modal) {
        const closeButton = modal.querySelector('.modal-close');
        if (closeButton) {
            closeButton.addEventListener('click', closeModal);
        }

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
    loadGifts();
});