//api anahtarını ve temel url'i burada saklıyoruz, gelecekte değişiklik yapmayı kolaylaştırır

const API_KEY = "aa9d77e3";
const BASE_URL = "http://www.omdbapi.com/";

/**
 * verilen bir arama terimi ile filmleri arar
 * @param {string} searchTerm - kullanıcının aradığı film adı
 * @param {Promise<Array>} - bulunan filmlerin bir dizisini içeren bir promise
 */

export async function searchMovies(searchTerm){
    //url'i arama parametresi(s) ve api anahtarı ile oluşturuyoruz

    const url = `${BASE_URL}?s=${searchTerm}&apikey=${API_KEY}`;

    const response =await fetch (url);
    if(!response.ok){
        throw new Error ("Filmler alınırken bir hata oluştu");
    }

    const data =  await response.json();

    //omdb, arama başarılı olduğunda "search" adlı bir dizi döndürür
    //başarısız olduğunda "error" adlı bir özellik döndürür

    if(data.Response === "True"){
        return data.Search; // sadece film dizisini döndürür
    }
    else{
        //film bulunamazsa veya başka haata varsa api'den gelen hatayı fırlatır
        throw new Error(data.Error);
    }

}

/**
 * verilen bir imdb id'si ile tek bir filmin detaylarını getirir
 * @param {string} imdbID - filmin benzersiz imdb kimliği
 * @returns {Promise<Object>} - film detaylarını içeren bir nesne döndüren bir promise
 */

export async function getMovieDetails(imdbID){
    //url'i, id parametresi (i) ve api anahtarı ile oluşturuyoruz

    const url = `${BASE_URL}?i=${imdbID}&apikey=${API_KEY}`;

    const response = await fetch(url);
    if(!response.ok){
        throw new Error("Film detayları alınırken bir hata oluştu");
    }

    const data = await response.json();

    if(data.Respons === "True"){

        return data; //film detaylarını döndürür
    }

    else{
        throw new Error (data.Error);
    }


}