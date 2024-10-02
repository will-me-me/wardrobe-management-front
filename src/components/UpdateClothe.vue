<template>
  <v-btn @click="dialog = true" color="success"> Update </v-btn>
  <v-dialog
    transition="dialog-top-transition"
    v-model="dialog"
    max-width="600px"
  >
    <v-col sm="12">
      <v-card>
        <v-card-title class="headline text-center"
          >Updating a {{ localClothes.name }}
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="localClothes.name"
              label="Name"
              :rules="rules.name"
            ></v-text-field>

            <v-text-field
              v-model="localClothes.category"
              label="Category"
              :rules="rules.category"
            ></v-text-field>

            <v-text-field
              v-model="localClothes.size"
              label="Size"
              :rules="rules.size"
            ></v-text-field>

            <v-text-field
              v-model="localClothes.color"
              label="Color"
              :rules="rules.color"
            ></v-text-field>

            <v-text-field
              v-model="localClothes.brand"
              label="Brand"
              :rules="rules.brand"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="warning" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="submitFormandUpdate"
            >Submit</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-dialog>
</template>

<script setup>
import { ref, reactive, defineProps } from "vue";
import { ClothesStore } from "../stores/wordRobe";

const UseClothesStores = ClothesStore();

const props = defineProps({
  clothes: {
    type: Object,
    required: true,
  },
});

const dialog = ref(false);
const valid = ref(false);

// Create a reactive local copy of the clothes object
const localClothes = reactive({ ...props.clothes });

// Validation rules
const rules = {
  name: [
    (v) => !!v || "Name is required",
    (v) => v.length <= 255 || "Name must be less than 255 characters",
  ],
  category: [
    (v) => !!v || "Category is required",
    (v) => v.length <= 255 || "Category must be less than 255 characters",
  ],
  size: [
    (v) => !!v || "Size is required",
    (v) => v.length <= 10 || "Size must be less than 10 characters",
  ],
  color: [
    (v) => !!v || "Color is required",
    (v) => v.length <= 50 || "Color must be less than 50 characters",
  ],
  brand: [
    (v) => !!v || "Brand is required",
    (v) => v.length <= 50 || "Brand must be less than 50 characters",
  ],
};

// Close dialog method
const closeDialog = () => {
  dialog.value = false;
};

// Submit form method
const submitFormandUpdate = async () => {
  if (valid.value) {
    try {
      await UseClothesStores.ClothestoUpdate(localClothes.id, localClothes);
      await UseClothesStores.getAllClothes();
      console.log("Form submitted with updated data:", localClothes);
      closeDialog();
    } catch (error) {
      console.error("Failed to update clothing item:", error);
    }
  }
};
</script>

<style scoped></style>
