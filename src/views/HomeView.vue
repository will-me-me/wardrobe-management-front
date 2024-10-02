<template>
  <HelloWorld :clothesList="counterStore.Allclothes" />
</template>

<script setup>
import { ClothesStore } from "../../src/stores/wordRobe";
import { defineComponent } from "vue";
import { onMounted } from "vue";
import HelloWorld from "../components/HomeComponent.vue";

defineComponent({
  name: "HomeView",

  components: {
    HelloWorld,
  },
});

const counterStore = ClothesStore();

onMounted(async () => {
  await counterStore.getAllClothes();
});
</script>
