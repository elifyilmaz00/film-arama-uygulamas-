/**
 * arama sonuçlarını (film kartlarını) gösterir
 * @param {Array} movies - api'den gelen film dizisi
 * @param {HTMLElement} container - Sonuçların gösterileceği HTML elementi.
 */
export function displaySearchResults(movies, container) {
    container.innerHTML = "";

    if (!movies || movies.length === 0) {
        container.innerHTML = '<p class="info-text">Film bulunamadı.</p>';
        return;
    }

    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.dataset.imdbid = movie.imdbID;
        const poster = movie.Poster === "N/A" ? "https://via.placeholder.com/200x300.png?text=No+Image" : movie.Poster;
        movieCard.innerHTML = `
            <img src="${poster}" alt="${movie.Title} afişi">
            <h3>${movie.Title}</h3>
        `;
        container.appendChild(movieCard);
    });
}

/**
 * bir filmin detaylarını modal içinde gösterir
 * @param {Object} movieDetails - api'den gelen film detayları nesnesi
 * @param {HTMLElement} modalContentEl - Modal içeriğinin gösterileceği HTML elementi.
 * @param {HTMLElement} modalOverlayEl - Modal'ın kendisi (gösterip gizlemek için).
 */
export function displayMovieDetails(movieDetails, modalContentEl, modalOverlayEl) {
    modalContentEl.innerHTML = `
        <button class="modal-close-btn" id="modal-close-btn">×</button>
        <img src="${movieDetails.Poster === "N/A" ? "..." : movieDetails.Poster}" alt="${movieDetails.Title} afişi" style="width:200px; object-fit:contain;">
        <div>
            <h2>${movieDetails.Title} (${movieDetails.Year})</h2>
            <p><strong>IMDb Puanı:</strong> ${movieDetails.imdbRating} / 10</p>
            <p><strong>Yönetmen:</strong> ${movieDetails.Director}</p>
            <p><strong>Oyuncular:</strong> ${movieDetails.Actors}</p>
            <p><strong>Özet:</strong> ${movieDetails.Plot}</p>
        </div>
    `;
    modalOverlayEl.classList.remove("hidden");
}

export function setLoading(container) {
    container.innerHTML = '<p class="info-text">Yükleniyor...</p>';
}

export function hideModal(modalOverlayEl) {
    modalOverlayEl.classList.add("hidden");
}