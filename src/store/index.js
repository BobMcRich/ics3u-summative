import { ref } from "vue";
import { defineStore } from "pinia";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "vue-router";  

export const useStore = defineStore('store', () => {
  const cart = ref(new Map());
  const user = ref(null);
  const router = useRouter();  

  function addToCart(id, movieData) {
    cart.value.set(id, movieData);
    saveCartToLocalStorage();
  }

  function removeFromCart(id) {
    cart.value.delete(id);
    saveCartToLocalStorage();
  }

  function clearCart() {
    if (user.value && user.value.email) {
      localStorage.removeItem(`cart_${user.value.email}`);
    }
  }

  function saveCartToLocalStorage() {
    if (user.value && user.value.email) {
      localStorage.setItem(`cart_${user.value.email}`, JSON.stringify(Object.fromEntries(cart.value)));
    }
  }

  const logout = async () => {
    try {
      await signOut(auth);
      user.value = null;
      cart.value.clear();
      localStorage.removeItem(`cart_${user.value?.email}`);
      router.push("/login");  
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return { user, cart, addToCart, removeFromCart, clearCart, saveCartToLocalStorage, logout };
});

export const userAuthorized = new Promise((resolve, reject) => {
  onAuthStateChanged(auth, user => {
    try {
      const store = useStore();
      store.user = user;
      const storedCart = localStorage.getItem(`cart_${store.user?.email}`);

      store.cart = storedCart ? new Map(Object.entries(JSON.parse(storedCart))) : new Map();
      resolve();
    } catch (error) {
      reject();
    }
  });
});
