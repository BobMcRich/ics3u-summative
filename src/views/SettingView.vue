<script setup>
import { RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue';
import Footer from '../components/Footer.vue';
import { auth } from "../firebase";
import { useStore } from '../store';
import { sendPasswordResetEmail, updateProfile, updatePassword } from 'firebase/auth';

const store = useStore();

const name = ref(store.name);
const lastName = ref(store.lastName);
const email = ref(store.email);
const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const isLoggedIn = ref(false);

onMounted(() => {
  const currentUser = auth.currentUser;
  if (currentUser && currentUser.email) {
    isLoggedIn.value = true;
    name.value = store.name || '';
    lastName.value = store.lastName || '';
    email.value = store.email || '';
  }
});

const handleSave = async () => {
  if (!isLoggedIn.value) {
    alert('You need to be logged in to update your information.');
    return;
  }

  store.name = name.value;
  store.lastName = lastName.value;
  store.email = email.value;

  const currentUser = auth.currentUser;
  if (currentUser) {
    try {
      await updateProfile(currentUser, {
        displayName: `${name.value} ${lastName.value}`,
      });
      alert('Profile updated successfully.');
    } catch (error) {
      console.error(error);
      alert('Error updating profile.');
    }
  }
};

const handleChangePassword = async () => {
  if (!currentPassword.value || !newPassword.value || !confirmPassword.value) {
    alert('Please fill in all fields.');
    return;
  }

  if (newPassword.value !== confirmPassword.value) {
    alert('Passwords do not match.');
    return;
  }

  const currentUser = auth.currentUser;

  if (currentUser) {
    try {
      const credentials = firebase.auth.EmailAuthProvider.credential(
        currentUser.email,
        currentPassword.value 
      );

      
      await currentUser.reauthenticateWithCredential(credentials);

      
      await updatePassword(currentUser, newPassword.value);

      alert('Password updated successfully.');
      currentPassword.value = '';
      newPassword.value = '';
      confirmPassword.value = '';
    } catch (error) {
      console.error(error);
      alert('Error changing password. Please try again later.');
    }
  }
};

</script>

<template>
  <div>
    <div class="hero">
      <div class="hero-content">
        <h1>SuperFlims</h1>
        <div class="button-group">
          <button class="language-btn">English</button>
          <RouterLink to="/cart" class="button cart">Cart</RouterLink>
          <button class="logout">Logout</button>
        </div>
      </div>
    </div>

    <div class="settings">
      <h1>{{ `Hello ${name} ${lastName}!` }}</h1>

      <div class="form-container">
        <!-- Show the editable fields only if the user is logged in -->
        <div v-if="isLoggedIn">
          <div class="form-field">
            <label for="name">First Name:</label>
            <input v-model="name" type="text" id="name" class="input-field" />
          </div>

          <div class="form-field">
            <label for="lastName">Last Name:</label>
            <input v-model="lastName" type="text" id="lastName" class="input-field" />
          </div>

          <div class="form-field">
            <label for="email">Email:</label>
            <input v-model="email" type="email" id="email" class="input-field" disabled />
          </div>

          <button @click="handleSave" class="save-button">Save</button>
        </div>

        <!-- Password change form -->
        <div v-if="isLoggedIn">
          <div class="form-field">
            <label for="currentPassword">Current Password:</label>
            <input v-model="currentPassword" type="password" id="currentPassword" class="input-field" />
          </div>

          <div class="form-field">
            <label for="newPassword">New Password:</label>
            <input v-model="newPassword" type="password" id="newPassword" class="input-field" />
          </div>

          <div class="form-field">
            <label for="confirmPassword">Confirm New Password:</label>
            <input v-model="confirmPassword" type="password" id="confirmPassword" class="input-field" />
          </div>

          <button @click="handleChangePassword" class="save-button">Change Password</button>
        </div>

        <!-- If not logged in, show a message -->
        <div v-else>
          <p>You must be logged in to update your profile and password.</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
/* Your existing styles */
</style>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
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

.button-group {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.language-btn, .cart, .logout {
  padding: 10px 15px;
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
}

.cart:hover {
  background-color: #45a049;
}

.logout {
  background-color: #f44336;
  color: white;
}

.logout:hover {
  background-color: #d32f2f;
}

.settings {
  padding: 30px;
  text-align: center;
  background-color: #fff;
  border-radius: 8px;
  margin: 40px auto;
  max-width: 600px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.settings h1 {
  font-size: 28px;
  color: #333;
  margin-bottom: 30px;
  font-weight: 700;
  letter-spacing: 1px;
}

.form-container {
  background-color: rgba(255, 255, 255, 0.85);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.form-field {
  margin-bottom: 20px;
  text-align: left;
}

.form-field label {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  display: block;
  color: #333;
}

.input-field {
  width: 100%;
  padding: 14px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;
  background-color: #fff;
}

.input-field:focus {
  border-color: #FF6F61;
}

.input-field[disabled] {
  background-color: #e0e0e0;
  cursor: not-allowed;
}

.save-button {
  width: 100%;
  padding: 14px;
  background-color: #FF6F61;
  color: white;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

.save-button:hover {
  background-color: #D83A6A;
}

Footer {
  background-color: #282c34;
  color: white;
  padding: 15px;
  text-align: center;
  font-size: 14px;
  margin-top: 50px;
}

.Footer p {
  margin: 0;
}

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

  .save-button {
    font-size: 1rem;
  }

  .button-group {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>

