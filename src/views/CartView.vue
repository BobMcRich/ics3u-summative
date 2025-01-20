<script setup>
import { ref } from 'vue';
import { useStore } from '../store';
const saveMovies = async 

const store = useStore();
const thankYouMessage = ref(false);

const handleCheckout = () => {
  store.cart = new Map();
  thankYouMessage.value = true;
};
</script>

<template>
  <div class="cart" v-if="!thankYouMessage">
    <h1>Shopping Cart</h1>
    <div class="item" v-for="([key, value]) in store.cart" :key="key">
      <img :src="`https://image.tmdb.org/t/p/w500${value.url}`" class="item-image" />
      <div class="item-details">
        <h2>{{ value.title }}</h2>
        <button @click="store.cart.delete(key)" class="remove-button">Remove</button>
      </div>
    </div>
    <div>
      <button @click="handleCheckout" class="remove-button">Checkout</button>
    </div>
  </div>
  
  <div v-else class="thank-you-message">
    <h1>Thank you for your purchase!</h1>
  </div>
</template>

<style scoped>
.cart {
  padding: 20px;
  font-family: 'Arial', sans-serif;
  text-align: center;
  background: linear-gradient(to right, #ff6f61, #d83a6a); 
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.item {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  align-items: center;
}

.item-image {
  width: 100px;
  height: auto;
  border-radius: 8px;
}

.item-details {
  flex: 1;
  text-align: left;
}

.item-details h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
}

.remove-button {
  background-color: #ff6f61;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.remove-button:hover {
  background-color: #d83a6a;
}

.thank-you-message {
  padding: 50px;
  font-family: 'Arial', sans-serif;
  text-align: center;
  background: linear-gradient(to right, #ff6f61, #d83a6a); 
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
