<script setup>
import Header from '../components/Header.vue';
import Feature from '../components/Feature.vue';
import Hero from '../components/Hero.vue';
import Footer from '../components/Footer.vue';
</script>

<template>
  <div class="page-container">
    <Header />
    <Hero />
    <Feature />
    <Footer />
  </div>
</template>

<style scoped>

.page-container {
  min-height: 100vh; 
  display: flex;
  flex-direction: column;
}

footer {
  margin-top: auto; 
}
</style>
