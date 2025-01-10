<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';


const response = ref(null);
const numbers = ref([]);


numbers.value = (() => {
  const set = new Set();


  while (true) {
    set.add(Math.floor(Math.random() * 19));


    if (set.size === 3) {
      return set;
    }
  }
})();


onMounted(async () => {
  response.value = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_KEY}`);
})
</script>


<template>
  <div class="feature-section">
    <div v-if="response" class="movie-grid">
      <div v-for="number in numbers" :key="response.data.results[number].id" class="movie-card">
        <img :src="`https://image.tmdb.org/t/p/w500${response.data.results[number].poster_path}`" alt="Movie Poster" class="movie-poster" />
        <p class="movie-title">{{ response.data.results[number].title }}</p>
      </div>
    </div>
  </div>
</template>


<style scoped>
.feature-section {
  padding: 40px 20px;  
  width: 100%;
  box-sizing: border-box;
  background: linear-gradient(135deg, #FF6F61, #D83A6A);
}


.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}


.movie-card {
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  transform: scale(1);
  transition: transform 0.3s ease;
  background-color: #fff;
}


.movie-card:hover {
  transform: scale(1.05);
}


.movie-poster {
  width: 100%;
  height: auto;
  border-radius: 15px;
}


.movie-title {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  border-radius: 0 0 15px 15px;
}


@media (max-width: 768px) {
  .movie-title {
    font-size: 1rem;
  }
}


.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://www.transparenttextures.com/patterns/star-animated.gif');
  background-size: cover;
  opacity: 0.2;
  pointer-events: none;
}
</style>