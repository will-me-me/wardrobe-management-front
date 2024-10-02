<template>
  <v-app>
    <v-snackbar
      :timeout="2000"
      :color="userStore.color"
      variant="outlined"
      v-model="userStore.snackbar"
      location="bottom"
      elevation="24"
    >
      <template v-slot:activator="{ props }">
        <v-btn class="ma-2" color="success" variant="outlined" v-bind="props"
          >open</v-btn
        >
      </template>

      <h1 class="text-center text-overline">{{ userStore.snackbartext }}</h1>
    </v-snackbar>

    <v-app-bar app color="primary" dark height="100">
      <!-- <v-toolbar-title></v-toolbar-title> -->
      <v-btn
        variant="outlined"
        v-show="userStore.isLoggeInd"
        @click="LogoutoHome"
        color="warning"
      >
        <v-icon> mdi-logout </v-icon>
        Logout
      </v-btn>

      <v-spacer></v-spacer>
      <v-btn
        v-show="!userStore.isLoggeInd"
        @click="showCreateUserDialog"
        color="secondary"
        class="mr-2"
        >Create User</v-btn
      >
      <v-btn v-show="userStore.isLoggeInd" @click="showDialog" color="secondary"
        >Add Clothes</v-btn
      >
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <add-clothes
      v-model="dialog"
      :dialog="showDialog"
      @update:dialog="dialog = $event"
    />
    <create-user
      v-model="createUserDialog"
      :createUserDialog="showCreateUserDialog"
      @update:dialog="createUserDialog = $event"
    />
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { ClothesStore } from "../src/stores/wordRobe";
import { useRouter } from "vue-router";
import CreateUser from "./components/CreateUser.vue";
import addClothes from "./components/addClothes.vue";

// Initialize the user store
const userStore = ClothesStore();
const router = useRouter();
const dialog = ref(false);
const createUserDialog = ref(false);

// Methods to show dialogs
const showDialog = () => {
  dialog.value = true;
};

const showCreateUserDialog = () => {
  createUserDialog.value = true;
};

const LogoutoHome = async () => {
  // setTimeout(() => {
  await userStore.logoutUser();
  router.push("/");
  // }, 1000);
};
</script>

<script>
export default {
  components: { addClothes, CreateUser },
  name: "App",
};
</script>

<style scoped></style>
