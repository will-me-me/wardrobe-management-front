import instance from "./axios";

const token = `Bearer ${localStorage.getItem("token")}`;

export const GetAllClothes = async () => {
  let response = await instance.get("api/clothe-items", {
    headers: {
      Authorization: token,
    },
  });
  return response;
};

export const DeleteClotheById = async (id) => {
  try {
    let response = await instance.delete(`api/clothe-items/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    console.error("invalid Token");
  }
};

export const AddClotheProduct = async (clothingItem) => {
  try {
    const response = await instance.post("api/clothe-items", clothingItem, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to add clothing item:", error);
    throw error;
  }
};

export const UpdateClotheProduct = async (id, clothingItem) => {
  try {
    const response = await instance.put(
      `api/clothe-items/${id}`,
      clothingItem,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add clothing item:", error);
    throw error;
  }
};

export const AddUser = async (user) => {
  try {
    const response = await instance.post("api/users", user);
    return response.data;
  } catch (error) {
    console.error("Failed to add clothing item:", error);
    throw error;
  }
};

export const UserLogin = async (user) => {
  try {
    const response = await instance.post("api/login", user);
    return response.data;
  } catch (error) {
    console.error("Failed to add clothing item:", error);
    throw error;
  }
};

export const UserLogout = async () => {
  try {
    const response = await instance.post(
      "api/logout",
      {},
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.removeItem("token");
    return response.data;
  } catch (error) {
    console.error("Failed to log out:", error);
    throw error;
  }
};
