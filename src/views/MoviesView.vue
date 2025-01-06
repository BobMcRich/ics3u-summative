<script setup>
import Genres from "../components/Genres.vue";
import Feature from "../components/Feature.vue";
import Footer from "../components/Footer.vue";
import Hero from "../components/Hero.vue";
import { useStore } from "../store";

const genresList = [
  {
    id: 28,
    genreName: "Action"
  },
  {
    id: 12,
    genreName: "Adventure"
  },
  {
    id: 27,
    genreName: "Horror"
  },
  {
    id: 10751,
    genreName: "Family"
  },
  {
    id: 36,
    genreName: "History"
  },
]

const store = useStore();
</script>

<template>
  <div class="hero">
    <div class="hero-content">
      <h1>{{ `Hello ${store.name} ${store.lastName} ${store.email}!` }}</h1>
      <div class="button-group">
        <button class="language-btn">English</button>
        <RouterLink to="/cart" class="button cart">cart</RouterLink>
        <RouterLink to="/setting" class="button settings">settings</RouterLink>
        <button class="logout">Logout</button>
      </div>
    </div>
  </div>
  <Hero />
  <div class="movie-container">
    <div class="feature-section">
      <Feature />
    </div>
    <div class="genre-list">
      <h2>Genres</h2>
      <Genres :genres="genresList" />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.movie-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 0 auto;
  padding: 20px;
  padding-top: 120px; 
  background: linear-gradient(135deg, #2a2a72, #009ffd); 
  background-size: cover; 
  color: white; 
  height: 100vh; 
  overflow-y: auto; 
  position: relative; 
}

.genre-list {
  background-color: rgba(255, 255, 255, 0.9); 
  padding: 20px;
  border-radius: 10px;
  height: auto; 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
}

.genre-list h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
}

.genre-list ul {
  list-style: none;
  padding: 0;
}

.genre-list li {
  background-color: #e2e2e2;
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
  color: #333;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.genre-list li:hover {
  background-color: #ccc;
}

.feature-section {
  background-color: rgba(255, 255, 255, 0.9); 
  padding: 20px;
  border-radius: 10px;
  height: auto; 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
}

.feature-section h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
}

.feature-section .movie-card {
  display: inline-block;
  margin-right: 15px;
  margin-bottom: 20px;
  width: 200px;
  background-color: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
}

.feature-section .movie-card img {
  width: 100%;
  height: auto;
}

.feature-section .movie-card .movie-title {
  padding: 10px;
  text-align: center;
  background-color: #333;
  color: #fff;
  font-size: 1rem;
  text-transform: uppercase;
}

.movie-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://www.transparenttextures.com/patterns/stardust.png');
  background-size: cover;
  opacity: 0.1; 
  pointer-events: none;
}

.hero {
  background: linear-gradient(135deg, #FF6F61, #D83A6A);
  display: flex;
  justify-content: space-between; 
  align-items: center;
  height: 120px; 
  position: sticky; 
  top: 0; 
  left: 0;
  right: 0;
  z-index: 10; 
  color: white;
  padding: 0 20px; 
  transition: opacity 0.3s ease-in-out; 
  will-change: opacity; 
}


.hero.hidden {
  opacity: 0; 
}


.hero-content {
  display: flex;
  justify-content: space-between; 
  align-items: center;
  width: 100%;
  max-width: 1200px; 
}

.hero h1 {
  font-size: 1.8rem; 
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0; 
}

.button-group {
  display: flex;
  align-items: center;
  margin-left: auto; 
}

.language-btn, .button {
  background-color: #FF6F61;
  color: white;
  padding: 8px 16px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
  margin-left: 10px; 
  justify-content: r;
}

.button:hover, .language-btn:hover {
  background-color: #D83A6A;
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
.logout {
  background-color: #f44336;
  color: white;
}

.logout:hover {
  background-color: #d32f2f;
}
.register {
  background-color: #4CAF50;
}

.register:hover {
  background-color: #45a049;
}

.logout {
  background-color: #f44336; 
  color: white; 
  font-size: 1rem; 
  padding: 10px 20px; 
  border: none; 
  border-radius: 5px; 
  cursor: pointer; 
  transition: all 0.3s ease; 
  display: inline-block;
}

.logout:hover {
  background-color: #d32f2f; 
  transform: scale(1.05); 
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.logout:active {
  transform: scale(0.98); 
}

.logout:focus {
  outline: none; 
  box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.5); 
}

.language-btn {
  background-color: #FFB74D;
  font-weight: bold;
}

.language-btn:hover {
  background-color: #FB8C00;
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


@media (max-width: 1024px) {
  .hero {
    opacity: 1;
  }
}
</style>
