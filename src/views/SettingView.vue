<script setup>
import Footer from "../components/Footer.vue";
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { useStore } from '../store';
import { updatePassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

const store = useStore();
const router = useRouter();
const name = ref(store.user?.displayName?.split(" ")[0] || '');
const lastName = ref(store.user?.displayName?.split(" ")[1] || '');
const email = ref(store.user?.email || '');
const password = ref('');

const changeName = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      await updateProfile(user, { displayName: `${name.value} ${lastName.value}` });

      store.user = user;
    }
  } catch (error) {
    console.error("Error occurred during name change:", error);
    alert("There was an error updating the name. Please try again.");
  }
};

const changePassword = async () => {
  try {
    const user = auth.currentUser;
    await updatePassword(user, password.value);
    alert("Password updated successfully!");
    password.value = '';
  } catch (error) {
    alert("There was an error updating the password. Please try again.");
  }
};
</script>

<template>
  <div class="hero">
    <div class="hero-content">
      <h1>SuperFlims</h1>
      <div class="button-group">
        <button class="language-btn">English</button>
        <RouterLink to="/movies" class="button movies">Movies</RouterLink>
        <RouterLink to="/cart" class="button cart">Cart</RouterLink>
        <button @click="store.logout" class="button">Logout</button>
      </div>
    </div>
  </div>

  <div class="settings">
    <form @submit.prevent="changeName" class="form">
      <div class="input-container">
        <p>{{ `First Name: ${name}` }}</p>
        <input v-model="name" type="text" id="name" class="input-field" />
        <button type="submit" class="change-name">Change</button>
      </div>
    </form>
    <form @submit.prevent="changeName" class="form">
      <div class="input-container">
        <p>{{ `Last Name: ${lastName}` }}</p>
        <input v-model="lastName" type="text" id="lastName" class="input-field" />
        <button type="submit" class="change-name">Change</button>
      </div>
    </form>
    <div class="email">
      <div class="input-container">
        <p>Email:</p>
        <input v-model="email" type="email" id="email" class="input-field" readonly />
      </div>
    </div>
    <form @submit.prevent="changePassword" class="form">
      <div class="input-container">
        <p>New Password</p>
        <input v-model="password" type="password" id="password" class="input-field" required />
        <button type="submit" class="change-name">Change Password</button>
      </div>
    </form>
  </div>

  <Footer />
</template>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}

/* Hero Section */
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

.hero-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
}

.hero h1 {
  font-size: 2rem;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
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

/* Button Styles */
.button-group {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
}

button {
  padding: 12px 18px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
}

.language-btn {
  background-color: #FF6F61;
  color: white;
}

.language-btn:hover {
  background-color: #D83A6A;
}

.cart {
  background-color: #4CAF50;
  color: white;
  font-weight: bold;
  padding: 12px 18px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  border: 2px solid #4CAF50;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.cart:hover {
  background-color: white;
  color: #4CAF50;
}

.logout {
  background-color: #f44336;
  color: white;
}

.logout:hover {
  background-color: #d32f2f;
}

/* Settings Form Styles */
.settings {
  padding: 30px;
  background-color: #fff;
  border-radius: 10px;
  margin: 40px auto;
  max-width: 800px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.settings h1 {
  font-size: 26px;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
}

.form {
  margin-bottom: 25px;
}

.input-container {
  margin-bottom: 20px;
  text-align: left;
}

.input-container p {
  font-weight: 600;
  color: #333;
}

.input-field {
  width: 100%;
  padding: 14px;
  margin-top: 8px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: #FF6F61;
}

input[readonly] {
  background-color: #f0f0f0;
}

button.change-name {
  width: 100%;
  padding: 12px;
  background-color: #FF6F61;
  color: white;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.change-name:hover {
  background-color: #D83A6A;
}

/* Footer Styles */
.Footer {
  background-color: #282c34;
  color: white;
  padding: 15px;
  text-align: center;
  font-size: 14px;
  margin-top: 50px;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .settings {
    padding: 20px;
    margin: 15px;
    max-width: 100%;
  }

  .settings h1 {
    font-size: 22px;
  }

  .form-container {
    padding: 25px;
  }

  .input-field {
    padding: 12px;
    font-size: 0.9rem;
  }

  button.save-button {
    font-size: 1rem;
  }

  .button-group {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
