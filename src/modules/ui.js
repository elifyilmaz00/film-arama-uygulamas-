//dom elementlerini seçme

const resultContainer = document.querySelector("#results-container");
const modalOverlay = document.querySelector("#modal-overlay");
const modalContent = document.querySelector("#modal-content");

/**
 * arama sonuçlarını (film kartlarını) gösterir
 * @param {Array} movies - api'den gelen film dizisi
 */

export function displaySearchResults(movies){
    //önceki sonuçları veya arama yapın mesajını temizler

    resultContainer.innerHTML = "";

    if(!movies || movies.length === 0){
        resultContainer.innerHTML = '<p class="info-text">Film bulunamadı.</p>';
        return;
    }

    movies.forEach(movie => {
        //her bir film için bir kart oluşturur
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        //tıkladığımızda hangi film olduğunu anlamak için imdb id data attribute olarak ekleriz

        movieCard.dataset.imdbId = movie.imdbID;

        //afişi olmayan filmler için varsayılan bir resim kullanırız

        const poster = movie.Poster === "N/A" ? "https://via.placeholder.com/200x300.png?text=No+Image" : movie.Poster;

        movieCard.innerHTML = `
            <img src="${poster}" alt="${movie.Title} afişi">
            <h3>${movie.Title}</h3>
        `;
        resultContainer.appendChild(movieCard);

    });
}

/**
 * bir filmin detaylarını modal içinde gösterir
 * @param {Object} movieDetails - api'den gelen film detayları nesnesi
 */

export function displayMovieDetails(movieDetails){
    //modalın içeriğini film detayları ile doldurur
 modalContent.innerHTML = `
        <button class="modal-close-btn" id="modal-close-btn">×</button>
        <img src="${movieDetails.Poster === "N/A" ? "https://via.placeholder.com/300x450.png?text=No+Image" : movieDetails.Poster}" alt="${movieDetails.Title} afişi" style="width:200px; object-fit:contain;">
        <div>
            <h2>${movieDetails.Title} (${movieDetails.Year})</h2>
            <p><strong>IMDb Puanı:</strong> ${movieDetails.imdbRating} / 10</p>
            <p><strong>Yönetmen:</strong> ${movieDetails.Director}</p>
            <p><strong>Oyuncular:</strong> ${movieDetails.Actors}</p>
            <p><strong>Özet:</strong> ${movieDetails.Plot}</p>
        </div>
    `;

    //modalı görünür yapar
    modalOverlay.classList.remove("hidden");
} 

/**
 * yükleme durumunu kullanıcıya gösterir
 * @param {boolean} isLoading - yükleme durumu
 */   

export function setLoading(isLoading){
    if(isLoading){
        resultContainer.innerHTML = '<p class="info-text">Yükleniyor...</p>';
    }
    else{
        //yükleme tamamlandığında herhangi bir şey yapmaya gerek yok
        //çünkü sonuçlar veya hata mesajları başka fonksiyonlar tarafından gösterilecek
    }
}

//modal penceresini gizler

export function hideModal(){
    modalOverlay.classList.add("hidden");
}