<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { useStore } from '../store';

const route = useRoute();
const store = useStore();
const movieData = ref(null);  

onMounted(async () => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${route.params.id}?api_key=${import.meta.env.VITE_TMDB_KEY}&append_to_response=videos`);
    movieData.value = response.data;  
    console.log(movieData.value);
  } catch (error) {
    console.error('Error fetching movie data:', error);
  }
});
</script>

<template>
  <div v-if="movieData" class="movie-detail">
    <button
      @click="store.cart.set(route.params.id, { title: movieData.original_title, url: movieData.poster_path })"
      class="movie-site">
      Buy
    </button>
    <div class="movie-header">
      <img :src="`https://image.tmdb.org/t/p/w500${movieData.poster_path}`" alt="Movie Poster" class="movie-poster" />
      <div class="movie-info">
        <h1 class="movie-title">{{ movieData.original_title }}</h1>
        <p class="movie-release-date">Release Date: {{ movieData.release_date }}</p>
        <a class="movie-site" :href="movieData.homepage" target="_blank">Official Movie Site</a>
      </div>
    </div>

    <div class="movie-overview-section">
      <h2>Overview</h2>
      <p class="movie-overview">{{ movieData.overview }}</p>
    </div>

    <div class="trailers-section">
      <h2 class="trailers-title">Trailers</h2>
      <div class="trailers-container">
        <div v-for="trailer in movieData.videos.results" :key="trailer.id" class="trailer-tile">
          <a :href="`https://www.youtube.com/watch?v=${trailer.key}`" target="_blank">
            <img :src="`https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`" alt="Trailer" class="trailer-thumbnail" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-detail {
  background-color: #f9f9f9;
  padding: 30px 20px;
  font-family: 'Arial', sans-serif;
}

.movie-header {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}

.movie-poster {
  width: 200px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.movie-info {
  flex: 1;
  text-align: left;
}

.movie-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  text-transform: capitalize;
  letter-spacing: 1px;
}

.movie-release-date {
  font-size: 1.2rem;
  color: #777;
  margin-bottom: 20px;
}

.movie-site {
  display: inline-block;
  background-color: #FF6F61;
  color: white;
  padding: 12px 20px;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.movie-site:hover {
  background-color: #D83A6A;
}

.movie-overview-section {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.movie-overview-section h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 15px;
}

.movie-overview {
  font-size: 1.2rem;
  color: #555;
  line-height: 1.6;
  text-align: justify;
}

.trailers-section {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.trailers-title {
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.trailers-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  justify-items: center;
}

.trailer-tile {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.trailer-tile:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.trailer-thumbnail {
  width: 100%;
  height: auto;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.trailer-tile:hover .trailer-thumbnail {
  transform: scale(1.1);
}
</style>
