import api from "../../utils/api/api";

//fetch user and host
export const fetchUserBasedOnRole  = async ( search, page, role  ) => {
    try {
        const response = await api.get("/admin/user-management/userList" , {
            params : { search, page, role}
        });

        return response.data;
    } catch ( error ) {
        console.log("Error fetching users and host:", error.response.data);
        throw new Error("Failed to fetch users and host");
    }
} 

export const toggleBlockUser = async (userId) => {
  try {
    const response = await api.put(`/admin/user-management/users/block/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error blocking/unblocking user:", error.response?.data?.message);
    throw new Error("Failed to toggle block status for user");
  }
};



export const editUser = async (userData) => {
  try {
    const response = await api.put("/admin/user-management/users/edit", {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      mobile: userData.mobile,
    });
    return response.data;
  } catch (error) {
    console.error("Error editing user:", error.response?.data?.message);
    throw new Error("Failed to edit user details");
  }
};




