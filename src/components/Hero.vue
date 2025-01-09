<script setup>
</script>

<template>
  <div class="hero">
    <div class="hero-content">
      <h1 class="website-name">SuperFilms</h1>
      <p class="slogan">Where Every Film Finds Its Hero</p>
    </div>
  </div>
  <div v-if="response" class="movie-grid">
    <div v-for="number in numbers" :key="response.data.results[number].id" class="movie-card">
      <img :src="`https://image.tmdb.org/t/p/w500${response.data.results[number].poster_path}`" alt="Movie Poster" class="movie-poster" />
      <p class="movie-title">{{ response.data.results[number].title }}</p>
    </div>
  </div>
</template>

<style scoped>
.hero {
  background: linear-gradient(135deg, #FF6F61, #D83A6A); 
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh; 
  text-align: center;
  position: relative;
  color: white;
  padding: 40px; 
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3); 
  margin-bottom: 40px; 
}

.hero-content {
  z-index: 2;
  padding: 20px;
  backdrop-filter: blur(10px); 
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  background: rgba(0, 0, 0, 0.5); 
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); 
}

.website-name {
  font-size: 3rem; 
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 10px;
  font-family: 'Roboto', sans-serif;
  animation: fadeIn 1.5s ease-out;
}

.slogan {
  font-size: 1.5rem; 
  font-weight: 300;
  margin-top: 10px;
  opacity: 0.9;
  letter-spacing: 1px;
  animation: fadeIn 2s ease-out;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding-top: 20px;
}

.movie-card {
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  transform: scale(1);
  transition: transform 0.3s ease;
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

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
