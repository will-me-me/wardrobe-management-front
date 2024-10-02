<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title class="text-center">
        <span class="headline">Create User</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <!-- Name Field -->
          <v-text-field
            v-model="user.username"
            :rules="[rules.required, rules.maxLength(255)]"
            label="Name"
            required
          />
          <!-- Email Field -->
          <v-text-field
            v-model="user.email"
            :rules="[rules.required, rules.email]"
            label="Email"
            required
            type="email"
          />
          <!-- Password Field -->
          <v-text-field
            v-model="user.password"
            :rules="[rules.required, rules.minLength(8)]"
            label="Password"
            required
            type="password"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="green darken-1" text @click="createNewUser()"
          >Create User</v-btn
        >
        <v-btn color="grey" text @click="$emit('update:dialog', false)"
          >Cancel</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { useRouter } from "vue-router";
import { ref } from "vue";

import { ClothesStore } from "../../src/stores/wordRobe";

export default {
  // Props to control dialog visibility
  props: {
    createUserDialog: {
      type: Boolean,
      required: true,
    },
    createUserCallback: {
      type: Function,
      required: true,
    },
  },
  setup(props, { emit }) {
    const router = useRouter();
    // Data and form validity
    const valid = ref(false);
    const user = ref({
      username: "",
      email: "",
      password: "",
    });

    // Validation rules
    const rules = {
      required: (v) => !!v || "This field is required",
      email: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      maxLength: (max) => (v) => v.length <= max || `Max ${max} characters`,
      minLength: (min) => (v) => v.length >= min || `Min ${min} characters`,
    };

    const userfromStore = ClothesStore();

    // Create user function
    const createNewUser = async () => {
      if (valid.value && (await validateForm())) {
        try {
          await userfromStore.CreateUser(user.value);
          emit("user-created", user.value);
          closeDialog();
          router.push("/");
        } catch (error) {
          console.error("Error creating user:", error);
        }
      }
    };

    // Form validation
    const validateForm = () => {
      return new Promise((resolve) => {
        resolve(valid.value);
      });
    };

    // Close dialog function
    const closeDialog = () => {
      emit("update:dialog", false);
    };

    // Expose variables and functions
    return {
      valid,
      user,
      createNewUser,
      closeDialog,
      rules,
    };
  },
};
</script>
