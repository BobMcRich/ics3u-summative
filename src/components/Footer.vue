<script setup>
</script>

<template>
  <div class="footer">
    <p class="footer-text">SuperFilms, 2024</p>
    <p class="author">Author: <a href="mailto:Samuel.li2@student.tdsb.on.ca">Samuel.li2@student.tdsb.on.ca</a></p>
  </div>
</template>

<style scoped>
.footer {
  background-color: #222;
  color: #fff;
  padding: 20px;
  text-align: center;
  font-family: 'Arial', sans-serif;
  width: 100%;
}

.footer-text {
  font-size: 1.2rem;
  font-weight: 400;
  letter-spacing: 1px;
  margin: 0;
  opacity: 0.8;
}

.footer-text:hover {
  opacity: 1;
}

.author {
  font-size: 1rem;
  margin-top: 10px;
  opacity: 0.7;
}

.author a {
  color: #FF6F61;
  text-decoration: none;
}

.author a:hover {
  color: #D83A6A;
}
</style>
