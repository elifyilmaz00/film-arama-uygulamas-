// ui.js'deki tüm fonksiyonları 'ui' adı altında bir nesne olarak import edelim.
import * as ui from './modules/ui.js';
import { searchMovies, getMovieDetails } from './modules/api.js';

// Globalde tanımlıyoruz ki tüm fonksiyonlar erişebilsin.
let searchForm, searchInput, resultsContainer, modalOverlay, modalContent;

async function handleSearchFormSubmit(event) {
    event.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) {
        alert('Lütfen bir film adı girin.');
        return;
    }
    ui.setLoading(resultsContainer); // resultsContainer'ı parametre olarak gönder
    try {
        const movies = await searchMovies(searchTerm);
        ui.displaySearchResults(movies, resultsContainer); // resultsContainer'ı parametre olarak gönder
    } catch (error) {
        resultsContainer.innerHTML = `<p class="info-text" style="color: red;">${error.message}</p>`;
    }
}

async function handleResultsClick(event) {
    const card = event.target.closest('.movie-card');
    if (card) {
        const imdbID = card.dataset.imdbid;
        modalContent.innerHTML = "<h2>Yükleniyor...</h2>";
        modalOverlay.classList.remove('hidden'); // Sadece göstermek için doğrudan classList kullanabiliriz
        try {
            const movieDetails = await getMovieDetails(imdbID);
            // ui.js'deki fonksiyona gerekli elementleri parametre olarak gönderiyoruz.
            ui.displayMovieDetails(movieDetails, modalContent, modalOverlay);
        } catch (error) {
            modalContent.innerHTML = `<p style="color: red;">Detaylar yüklenemedi: ${error.message}</p>`;
        }
    }
}

function handleModalClick(event) {
    if (event.target.id === 'modal-close-btn' || event.target === modalOverlay) {
        ui.hideModal(modalOverlay); // modalOverlay'i parametre olarak gönder
    }
}

function initializeApp() {
    searchForm = document.querySelector('#search-form');
    searchInput = document.querySelector('#search-input');
    resultsContainer = document.querySelector('#results-container');
    modalOverlay = document.querySelector('#details-modal');
    // YENİ: modalContent'i de burada seçelim.
    modalContent = document.querySelector('#modal-content');

    searchForm.addEventListener('submit', handleSearchFormSubmit);
    resultsContainer.addEventListener('click', handleResultsClick);
    modalOverlay.addEventListener('click', handleModalClick);

    console.log("Film arama uygulaması başarıyla başlatıldı.");
}

document.addEventListener('DOMContentLoaded', initializeApp);