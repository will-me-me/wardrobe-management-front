<template>
  <v-container>
    <h2 class="text-center mb-4">Clothes List</h2>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="search"
          label="Search by Name, Brand, or Material"
          append-icon="mdi-magnify"
          clearable
          variant="outlined"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="clothes in filteredClothes"
        :key="clothes?.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card
          v-if="clothes?.name"
          class="mb-4"
          outlined
          color="primary"
          variant="outlined"
        >
          <v-card-title>
            <v-row align="center">
              <v-col>
                <v-icon
                  :color="clothes?.color?.toLowerCase()"
                  class="mr-2"
                  :icon="getIcon(clothes?.name)"
                ></v-icon>

                <h3 class="headline">{{ clothes.name }}</h3>
              </v-col>
              <v-col class="text-right"> </v-col>
            </v-row>
          </v-card-title>
          <v-card-subtitle class="clothing-details">
            <v-row class="mx-0">
              <v-col cols="12" sm="6">
                <div class="clothes-detail">
                  <strong>Category:</strong>
                  <v-chip class="ml-2" color="blue" text-color="white">{{
                    clothes.category
                  }}</v-chip>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="clothes-detail">
                  <strong>Color:</strong>
                  <v-chip class="ml-2" color="green" text-color="white">{{
                    clothes.color
                  }}</v-chip>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="clothes-detail">
                  <strong>Size:</strong>
                  <v-chip class="ml-2" color="purple" text-color="white">{{
                    clothes.size
                  }}</v-chip>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="clothes-detail">
                  <strong>Brand:</strong>
                  <v-chip class="ml-2" color="orange" text-color="white">{{
                    clothes.brand
                  }}</v-chip>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="clothes-detail">
                  <strong>Material:</strong>
                  <v-chip class="ml-2" color="cyan" text-color="white">{{
                    clothes.material
                  }}</v-chip>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="clothes-detail">
                  <strong>Price:</strong>
                  <span class="price-chip">${{ clothes.price }}</span>
                </div>
              </v-col>
            </v-row>
          </v-card-subtitle>

          <v-card-actions>
            <v-btn text color="red" @click="removeClothes(clothes.id)"
              >Delete</v-btn
            >
            <v-spacer></v-spacer>
            <!-- <v-btn text color="primary"  >Update</v-btn> -->
            <update-clothe :clothes="clothes" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { defineComponent } from "vue";
import { ClothesStore } from "../stores/wordRobe";
import { defineProps, ref, computed } from "vue";
import UpdateClothe from "./UpdateClothe.vue";

defineComponent({
  name: "UpdateClotheVue",

  components: {
    UpdateClothe,
  },
});

const props = defineProps({
  clothesList: {
    type: Array,
    required: true,
  },
});

const search = ref("");

const clothesStore = ClothesStore();

const filteredClothes = computed(() => {
  return props.clothesList.filter((clothes) => {
    const lowerSearch = search.value.toLowerCase();
    return (
      clothes?.name?.toLowerCase().includes(lowerSearch) ||
      clothes?.brand?.toLowerCase().includes(lowerSearch) ||
      clothes?.material?.toLowerCase().includes(lowerSearch)
    );
  });
});

// Function to get the appropriate icon based on clothing name
const getIcon = (name) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("trouser")) return "mdi-sofa";
  if (lowerName.includes("shirt")) return "mdi-tshirt-crew-outline";
  if (lowerName.includes("t-shirt")) return "mdi-tshirt-v";
  if (lowerName.includes("pullover")) return "mdi-sweater";
  if (lowerName.includes("shoe")) return "mdi-shoe-sneaker";
  if (lowerName.includes("socks")) return "mdi-shoe-print";
  return "mdi-hanger";
};

const removeClothes = async (id) => {
  await clothesStore.deleteClothes(id);
};
</script>

<style scoped>
/* Additional custom styles */
.v-card {
  transition: transform 0.2s;
}

.v-card:hover {
  transform: scale(1.02);
}

.v-chip {
  margin: 2px;
}

.clothing-details {
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.clothes-detail {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.price-chip {
  font-size: 18px;
  font-weight: bold;
  color: #2e7d32;
}

.v-chip {
  font-size: 14px;
  margin: 0;
  padding: 0 10px;
  border-radius: 16px;
}
</style>
