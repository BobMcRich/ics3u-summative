<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { ref } from 'vue';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { useStore } from "../store";

const router = useRouter();
const email = ref(''); 
const password = ref(''); 

const store = useStore();

const handleLogin = () => {
  if (password.value === "iloveyou") {
    store.email = email.value; 
    router.push("/movies"); 
  } else {
    alert("Invalid Password");
  }
};
</script>


<template>
  <div class="hero">
    <div class="overlay">
      <div class="navbar">
        <h1>SuperFilms</h1>
        <RouterLink to="/register" class="button register">Register</RouterLink>
      </div>
      <div class="form-container">
        <h2>Login to Your Account</h2>
        <form @submit.prevent="handleLogin">
          <input v-model="email" type="email" placeholder="Email" class="input-field" required />
          <input v-model="password" type="password" placeholder="Password" class="input-field" required />
          <button type="submit" class="button login">Login</button>
        </form>
      </div>
    </div>
  </div>
  <Footer />
</template>


<style scoped>
.hero {
  background: linear-gradient(135deg, #FF6F61, #D83A6A); 
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  position: relative;
}

.overlay {
  background: rgba(0, 0, 0, 0.5); 
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
}

.navbar {
  position: absolute;
  top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}

.navbar h1 {
  font-size: 2.5rem;
  font-weight: bold;
}

.button {
  background-color: #fff;
  color: #D83A6A;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #FF6F61;
  color: white;
}

.register {
  font-size: 1.1rem;
}

.form-container {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 30px 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-container h2 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.input-field {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
  transition: border 0.3s ease;
}

.input-field:focus {
  border-color: #FF6F61;
}

.login {
  width: 100%;
  padding: 12px;
  background-color: #FF6F61;
  color: white;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login:hover {
  background-color: #D83A6A;
}
</style>
