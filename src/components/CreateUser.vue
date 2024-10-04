<template>
  <v-dialog
    transition="dialog-bottom-transition"
    v-model="dialog"
    max-width="500px"
  >
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
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            hint="At least 8 characters"
          />

          <v-list>
            <v-list-item
              v-for="(rule, index) in passwordValidationRules"
              :key="index"
            >
              <v-icon size="20" :color="rule.valid ? 'success' : 'error'">{{
                rule.valid ? "mdi-check-circle" : "mdi-close-circle"
              }}</v-icon>
              <v-list-item-content>
                <v-list-item-title class="text-caption">{{
                  rule.message
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          :disabled="!valid || !isPasswordValid"
          color="green darken-1"
          text
          @click="createNewUser()"
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
import { ref, watch, computed } from "vue";

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

    const showPassword = ref(false);

    const passwordValidationRules = ref([
      {
        message: "At least 8 characters",
        valid: false,
      },
      {
        message: "At least one uppercase letter",
        valid: false,
      },
      {
        message: "At least one lowercase letter",
        valid: false,
      },
      {
        message: "At least one number",
        valid: false,
      },
      {
        message: "At least one special character",
        valid: false,
      },
    ]);

    // Watch password input and update the validity of the rules dynamically
    watch(
      () => user.value.password,
      (newPassword) => {
        passwordValidationRules.value = [
          { message: "At least 8 characters", valid: newPassword.length >= 8 },
          {
            message: "At least one uppercase letter",
            valid: /[A-Z]/.test(newPassword),
          },
          {
            message: "At least one lowercase letter",
            valid: /[a-z]/.test(newPassword),
          },
          { message: "At least one number", valid: /\d/.test(newPassword) },
          {
            message: "At least one special character",
            valid: /[!@#$%^&*]/.test(newPassword),
          },
        ];
      }
    );

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

    const isPasswordValid = computed(() => {
      return passwordValidationRules.value.every((rule) => rule.valid);
    });

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
      showPassword,
      passwordValidationRules,
      createNewUser,
      closeDialog,
      rules,
      isPasswordValid,
    };
  },
};
</script>
