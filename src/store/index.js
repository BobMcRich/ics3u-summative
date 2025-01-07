import { ref } from "vue"
import { defineStore } from "pinia";

export const useStore = defineStore('store', () => {
    const email = ref("");
    const name = ref("");
    const lastName = ref("");
    const password = ref("");
    const cart = ref(new Map());
  
    return { email, cart, name, lastName, password }
  })

  export const userAuthorized = new Promise((resolve, reject) => {
    onAuthStateChanged(auth, user => {
      try {
        const store = useStore();
        store.user = user;
        const storedCart = localStorage.getItem(`cart_${store.user.email}`);
  
        store.cart = storedCart ? new Map(Object.entries(JSON.parse(storedCart))) : new Map();
        resolve();
      } catch (error) {
        reject();
      }
    })
  })