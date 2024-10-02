<template>
  <div class="centered-container">
    <not-authorized />
  </div>
</template>

<script>
import NotAuthorized from "@/components/NotAuthorized.vue";

export default {
  components: { NotAuthorized },
};
</script>

<style scoped>
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
</style>
