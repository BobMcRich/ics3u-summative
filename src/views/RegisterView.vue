<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { auth } from "../firebase";
import { ref } from 'vue';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useStore } from "../store";

const store = useStore();
const router = useRouter();
const email = ref('');
const password = ref('');
const rePassword = ref('');
const lastName = ref('');
const name = ref('');

async function registerByEmail() {
  if (password.value !== rePassword.value) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const user = (await createUserWithEmailAndPassword(auth, email.value, password.value)).user;
    await updateProfile(user, { displayName: `${name.value} ${lastName.value}` });
    store.user = user;
    router.push("/movies");
  } catch (error) {
    alert("There was an error creating a user with email!");
  }
}

async function registerByGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    await updateProfile(user, { displayName: `${name.value} ${lastName.value}` });
    store.user = user;
    router.push("/movies");
  } catch (error) {
    alert("There was an error with Google authentication!");
  }
}
</script>

<template>
  <div class="hero">
    <div class="overlay">
      <div class="navbar">
        <h1>SuperFilms</h1>
        <RouterLink to="/login" class="button login">Login</RouterLink>
      </div>
      <div class="form-container">
        <h2>Create an Account</h2>
        <form @submit.prevent="registerByEmail">
          <input v-model="name" type="text" placeholder="Name" class="input-field" required />
          <input v-model="lastName" type="text" placeholder="Last Name" class="input-field" required />
          <input v-model="email" type="email" placeholder="Email" class="input-field" required />
          <input v-model="password" type="password" placeholder="Password" class="input-field" required />
          <input v-model="rePassword" type="password" placeholder="Re-Enter Password" class="input-field" required />
          <button type="submit" class="button register">Register</button>
        </form>
        <button @click="registerByGoogle()" class="button register">Register by Google</button>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
.hero {
  background: linear-gradient(135deg, #FF6F61, #D83A6A);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  position: relative;
  color: white;
  overflow: hidden;
}

.overlay {
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
  padding: 12px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.button:hover {
  background-color: #FF6F61;
  color: white;
}

.login {
  font-size: 1.1rem;
}

.form-container {
  background-color: rgba(255, 255, 255, 0.85);
  padding: 30px 40px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.form-container h2 {
  font-size: 2rem;
  font-weight: 600;
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

.register {
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

.register:hover {
  background-color: #D83A6A;
}
</style>