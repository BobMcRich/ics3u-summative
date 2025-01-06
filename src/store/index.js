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