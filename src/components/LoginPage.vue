<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="12" md="4">
        <v-card variant="outlined">
          <v-card-title class="headline">Login</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="email"
                :rules="[rules.required, rules.email]"
                label="Email"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                :rules="[rules.required]"
                label="Password"
                type="password"
                required
              ></v-text-field>

              <v-btn :disabled="!valid" @click="loginUser" color="primary"
                >Login</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { ClothesStore } from "../../src/stores/wordRobe";
const userLoginFromStore = ClothesStore();

const email = ref("");
const password = ref("");
const valid = ref(false);
const router = useRouter();

const rules = {
  required: (value) => !!value || "Required.",
  email: (value) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value) || "Invalid e-mail.";
  },
};

const loginUser = async () => {
  let user = {
    email: email.value,
    password: password.value,
  };

  console.log(user);

  try {
    await userLoginFromStore.Login(user);
    await userLoginFromStore.getAllClothes();
    setTimeout(() => {
      router.push("/wardrobe");
    }, 1000);
  } catch (error) {
    console.error("Error during login:", error);
  }
};
</script>

<style scoped></style>
