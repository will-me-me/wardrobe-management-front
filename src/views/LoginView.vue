<template>
  <div class="center-container">
    <login-page />
  </div>
</template>

<script setup>
import { defineComponent } from "vue";

import LoginPage from "@/components/LoginPage.vue";

defineComponent({
  name: "HomeView",

  components: {
    LoginPage,
  },
});
</script>

<style scoped>
.center-container {
  display: flex;
  justify-content: center; /* Centers horizontally */
  align-items: center; /* Centers vertically */
  height: 80vh; /* Full height of the viewport */
}
</style>
