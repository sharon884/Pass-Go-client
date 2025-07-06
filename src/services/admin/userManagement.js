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






