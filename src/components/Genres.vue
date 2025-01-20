<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { useStore } from '../store';

const props = defineProps(["genres"]);
const router = useRouter();
const store = useStore();
const selectedGenre = ref(28);
const response = ref(null);

async function getMovieByGenre() {
  response.value = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false&with_genres=${selectedGenre.value}`);
}

function getMovieDetails(id) {
  router.push(`/movies/${id}`);
}

onMounted(async () => {
  response.value = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false&with_genres=${selectedGenre.value}`);
});
</script>

<template>
  <div class="movie-gallery">
    <select v-model="selectedGenre" @change="getMovieByGenre" class="genre-selector">
      <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.genreName }}</option>
    </select>

    <div v-if="response" class="movie-list">
      <div v-for="movie in response.data.results" :key="movie.id" class="movie-card">
        <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie Poster" class="movie-poster" @click="getMovieDetails(movie.id)" />
        <p class="movie-title">{{ movie.title }}</p>
        <button
          @click="store.addToCart(movie.id, { title: movie.title, url: movie.poster_path })" class="buy-button">
          {{ store.cart.has(movie.id) ? 'Added' : 'Buy' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-gallery {
  background-color: #f4f4f4;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  text-align: center;
}

.genre-selector {
  padding: 10px 15px;
  margin-bottom: 30px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 1rem;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.genre-selector:focus {
  border-color: #FF6F61; 
}

.movie-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  justify-items: center;
}

.movie-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 10px;
  width: 200px;
  text-align: center;
}

.movie-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.movie-poster {
  width: 100%;
  height: auto;
  border-radius: 8px;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.movie-card:hover .movie-poster {
  transform: scale(1.05);
}

.movie-title {
  margin-top: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  line-height: 1.4;
  text-transform: capitalize;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.buy-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #ff6f61;
  color: white;
  border: none;
  border-radius: 0 0 10px 10px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.buy-button:disabled {
  background-color: #d83a6a;
  cursor: not-allowed;
}

.buy-button:hover:not(:disabled) {
  background-color: #d83a6a;
}

@media (max-width: 768px) {
  .genre-selector {
    width: 100%;
    margin-bottom: 20px;
  }

  .movie-list {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
