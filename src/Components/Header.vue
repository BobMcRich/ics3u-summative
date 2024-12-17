<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="hero">
    <div class="hero-content">
      <h1>SuperFlims</h1>
      <div class="button-group">
        <button class="language-btn">English</button>
        <RouterLink to="/register" class="button register">Register</RouterLink>
        <RouterLink to="/login" class="button login">Login</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

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

.register {
  background-color: #4CAF50;
}

.register:hover {
  background-color: #45a049;
}

.login {
  background-color: #2196F3;
}

.login:hover {
  background-color: #0b7dda;
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
