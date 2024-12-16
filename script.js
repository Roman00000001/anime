
const animeData = [
    { id: 1, title: "Аня иногда кокочет по русски", image: "images/anya_image1.webp", visits: 43232, rating: 7.9 },
    { id: 2, title: "Звездное дитя", image: "images/star_child.jpg", visits: 5299,  rating: 7.9 },
    { id: 3, title: "Клинок рассекающий демонов", image: "images/demon_slayer.jpg", visits: 116010,  rating: 8.2 },
    { id: 4, title: "Мастер меча огней", image: "images/sword_master.jpeg", visits: 61594,  rating: 7.9 },
    { id: 5, title: "Любимый во Франксе", image: "images/frankse.jpg", visits: 61625, rating: 7.3 },
    { id: 6, title: "Токийский гуль", image: "images/tokil.png", visits: 92798, rating: 7.1 },
    { id: 7, title: "Хоримия", image: "images/horomia.jpg", visits: 23687, rating: 7.8 },
    { id: 8, title: "Моя девушка не только милая", image: "images/mygerl.jpg", visits: 3032, rating: 6.4 },
    { id: 9, title: "Мастера меча онлайн", image: "images/masteryonly.jpg", visits: 61600, rating: 7.9 },
    { id: 10, title: "Re: Zero – жизнь с нуля в другом мире", image: "images/rezero.jpg", visits: 37391, rating: 7.6 },
    { id: 11, title: "Поднятие уровня в одиночку", image: "images/levelone.jpg", visits: 22935, rating: 8.1 },
    { id: 12, title: "Город, в котором меня нет", image: "images/cityone.jpg", visits: 45731, rating: 8.5 }
];

document.addEventListener("DOMContentLoaded", function() {
    loadAnime();
    createCarouselSlides();
    loadPopularAnime();
});
function loadPopularAnime() {
    
}

// Функция для загрузки аниме
function loadAnime() {
    const animeGrid = document.getElementById("animeGrid");
    animeGrid.innerHTML = ``; // Очищаем содержимое

    animeData.forEach(anime => {
        const card = document.createElement("div");
        card.className = "anime-card";
        card.onclick = () => openAnimePage(anime.id);

        const img = document.createElement("img");
        img.src = anime.image;
        img.alt = anime.title;

        const title = document.createElement("h3");
        title.textContent = anime.title;

        card.appendChild(img);
        card.appendChild(title);
        animeGrid.appendChild(card);
    });
}

// Функция для создания слайдов карусели
function createCarouselSlides() {
    const track = document.getElementById('carouselTrack');
    track.innerHTML = ''; // Очищаем текущее содержимое карусели

    animeData.forEach(anime => {
        const slide = document.createElement('li');
        slide.classList.add('carousel__slide');
        slide.setAttribute('data-id', anime.id);
        
        slide.innerHTML = `
            <img src="${anime.image}" alt="${anime.title}">
            <div class="carousel__info">
                <h2>${anime.title}</h2>
                <button class="watch-button" onclick="goToAnimePage(${anime.id})">Смотреть аниме</button>
            </div>
        `;
        track.appendChild(slide);
    });

    initCarousel();
}

// Функция для инициализации карусели
function initCarousel() {
    const track = document.querySelector('.carousel__track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button--next');
    const prevButton = document.querySelector('.carousel-button--prev');
    let currentSlide = 0;
    const maxSlides = 5;

    // Удаляем все слайды, кроме первых maxSlides
    slides.forEach((slide, index) => {
        if (index >= maxSlides) {
            slide.remove();
        }
    });

    function updateSlidePosition() {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${currentSlide * slideWidth}px)`; // Обновляем положение
    }

    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % maxSlides; // Переход к следующему слайду
        updateSlidePosition();
    });

    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + maxSlides) % maxSlides; // Переход к предыдущему слайду
        updateSlidePosition();
    });

    // Инициализируем начальное положение
    updateSlidePosition();
}

// Вызываем функцию инициализации карусели
initCarousel();

// Вызываем функцию инициализации карусели

// Переход на страницу с описанием аниме
function openAnimePage(animeId) {
    // Увеличиваем количество посещений
    const anime = animeData.find(a => a.id === animeId);
    if (anime) {
        anime.visits = (anime.visits || 0) + 1; // Увеличиваем счетчик посещений, если он существует
    }
    
    // Сохраняем идентификатор аниме в localStorage
    localStorage.setItem("selectedAnimeId", animeId);
    // Переход на страницу anime.html с параметром id
    window.location.href = `anime.html?id=${animeId}`;
}

// Поиск по аниме
function searchAnime() {
    const query = document.getElementById("search").value.toLowerCase();
    const carousel = document.querySelector('.carousel');
    
    // Скрываем карусель, если в поисковом поле есть текст, и показываем, если оно пустое
    carousel.style.display = query ? 'none' : 'flex';

    const filteredData = animeData.filter(anime => anime.title.toLowerCase().includes(query));
    loadFilteredAnime(filteredData);
}

// Загрузка отфильтрованных аниме
function loadFilteredAnime(filteredData) {
    const animeGrid = document.getElementById("animeGrid");
    animeGrid.innerHTML = ``; // Очищаем содержимое

    filteredData.forEach(anime => {
        const card = document.createElement("div");
        card.className = "anime-card";
        card.onclick = () => openAnimePage(anime.id);

        const img = document.createElement("img");
        img.src = anime.image;
        img.alt = anime.title;

        const title = document.createElement("h3");
        title.textContent = anime.title;

        card.appendChild(img);
        card.appendChild(title);
        animeGrid.appendChild(card);
    });
}

// Переход на страницу аниме по клику на кнопку "Смотреть аниме"
function goToAnimePage(animeId) {
    openAnimePage(animeId);
}


const burgerButton = document.getElementById("burgerButton");
const sideMenu = document.getElementById("sideMenu");

burgerButton.addEventListener("click", () => {
    burgerButton.classList.toggle("open"); // Анимация кнопки
    sideMenu.classList.toggle("open"); // Открытие боковой панели
});