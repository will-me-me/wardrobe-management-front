import { defineStore } from "pinia";

import {
  GetAllClothes,
  DeleteClotheById,
  AddClotheProduct,
  AddUser,
  UserLogin,
  UserLogout,
  UpdateClotheProduct,
} from "../../api/mainAxios";

export const ClothesStore = defineStore("clothes", {
  // State: your reactive data
  state: () => ({
    Allclothes: [],
    clothingItem: {},
    // isLoggeInd: !!localStorage.getItem("token"),
    isLoggeInd: !!localStorage.getItem("token"),
    snackbar: false,
    color: "",
    snackbartext: "",
    loading: true,
  }),

  // Actions: functions to modify state
  actions: {
    async getAllClothes() {
      this.loading = true;
      try {
        const response = await GetAllClothes();
        this.Allclothes = response.data;
      } catch (error) {
        console.error("Failed to fetch clothes:", error);
      } finally {
        this.loading = false;
      }
    },

    async deleteClothes(id) {
      try {
        const response = await DeleteClotheById(id);
        if (response.status === 200) {
          console.log(`Deleted clothing item with ID: ${id}`);
          this.snackbartext = `Deleted clothing item with ID: ${id}`;
          this.color = "success";
          this.snackbar = true;
          await this.getAllClothes();
        } else {
          console.error("Failed to delete clothes:", response);
          this.snackbartext = "Failed to delete clothes:";
          this.color = "warning";
          this.snackbar = true;
        }
      } catch (error) {
        console.error("Failed to delete clothes:", error);
      }
    },

    async ClothesToAdd(clothingItem) {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const newItem = await AddClotheProduct(clothingItem);
          this.Allclothes.push(newItem);
          console.log("Added clothing item:", newItem);
          this.snackbartext = "Added clothing item:";
          this.color = "success";
          this.snackbar = true;
        } else {
          console.error(
            "No token found. Please log in to add a clothing item."
          );
        }
      } catch (error) {
        console.error("Failed to add clothing item:", error);
        this.snackbartext = error;
        this.color = "error";
        this.snackbar = true;
      }
    },

    async ClothestoUpdate(id, clothingItem) {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          await UpdateClotheProduct(id, clothingItem);
          await this.getAllClothes();
          console.log("Clothing item updated and clothes list fetched.");
          this.snackbartext = "Clothing item updated and clothes list fetched.";
          this.color = "success";
          this.snackbar = true;
        } else {
          console.error(
            "No token found. Please log in to update a clothing item."
          );
        }
      } catch (error) {
        console.error("Failed to update clothing item:", error);
        (this.snackbartext = "Failed to update clothing item:"), error;
        this.color = "error";
        this.snackbar = true;
      }
    },

    async CreateUser(user) {
      try {
        const newUser = await AddUser(user);
        this.snackbartext = "User Added Succesfully.";
        this.color = "success";
        this.snackbar = true;
        return newUser;
      } catch (error) {
        console.error("Failed to add clothing item:", error);
      }
    },
    async Login(user) {
      this.loading = true;
      try {
        const newUser = await UserLogin(user);
        const token = newUser.access_token;
        if (token) {
          localStorage.setItem("token", token);
          this.isLoggeInd = true;
          this.loading = true;
          await this.getAllClothes();
          console.log("Login successful. Token stored:", token);
          this.snackbartext = "Login successful. Token stored:";
          this.color = "success";
          this.snackbar = true;
        } else {
          console.error("No token received.");
        }
        return newUser;
      } catch (error) {
        console.error("Failed to Login:", error);
        (this.snackbartext = "Failed to Login:"), error;
        this.color = "error";
        this.snackbar = true;
        throw error;
      }
    },

    async logoutUser() {
      try {
        this.isLoggeInd = null;

        await UserLogout();
        console.log("Logged out successfully");
        this.snackbartext = "Logged out successfully.";
        this.color = "success";
        this.snackbar = true;
      } catch (error) {
        console.error("Failed to log out:", error);
        (this.snackbartext = "Failed to log out:"), error;
        this.color = "error";
        this.snackbar = true;
      }
    },
  },
});
