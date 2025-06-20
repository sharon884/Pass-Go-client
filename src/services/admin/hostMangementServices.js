import api from "../../utils/api/api";

//fetch all host 
export const fetchAllHost = async ( search, page ) => {
    try {
        const response = await api.get("/admin/host-management/host-list", {
            params : { search, page }
        });
        return response.data;
    }  catch ( error ) {
        console.log("Error fetching all host", error.response.data.message );
        throw new Error("Failed to fetch all host");  
    }
};

//Toggle Block Host
export const toggleBlockHost = async ( hostId ) => {
    try {
        const response = await api.put(`/admin/host-management/host/block/${hostId}`)
        return response.data;
    } catch ( error ) {
        console.log("Error toggling block host", error.response.data.message );
        throw new Error("Failed to toggle block host");
    }

}

//Toggle Verify Host
export const toggleVerify = async ( hostId ) => {
    console.log(hostId)
    try {
        const response = await api.put(`/admin/host-management/host/verify/${hostId}`)
        return response.data;

    } catch ( error ) {
        console.log("Error toggling verify host", error.response.data.message );
        throw new Error("Failed to toggle verify host");
    }
};

//Edit Host 
export const editHost = async ( hostData ) => {
    try {
        const response = await api.put("/admin/host-management/host/edit", {
            id : hostData.id,
            name : hostData.name,
            email : hostData.email,
            mobile : hostData.mobile,
        });

        return response.data;
    } catch ( error ) {
        console.log("Error editing host", error.response.data.message);
        throw new Error("Failed to edit host");
    }

};

// Fetch pending request of host 

export const fetchPendingHostRequests = async () => {
    try {
        const response = await api.get("/admin/host-management/pending-hosts");
        return response.data;
    } catch ( error ) {
        console.error("Error Fetching pending verify request of host ", error.response.message);
        throw new Error("Failed to fetch pending verify request of host");
    }
}

// approve host request 
export const approveHostRequest  = async ( userId ) => {
    
    try {
        const response = await api.patch(`/admin/host-management/approve-host/${userId}`);
        return response.data;
    } catch ( error ) {
        console.error("Error approving host verify request", response.error.message);
        throw new Error("Failed to do the verify request approve of host");
    }
};


// reject host verifyRequest 

export const rejectHostVerifyRequest = async ( userId, reason ) => {
    try {
        const response = await api.patch(`/admin/host-management/reject-host/${userId}`, { reason });
        return response.data;
    } catch ( error ) {
        console.error("failed to reject host verify request", response.error.message);
        throw new Error("Failed to reject host verify request");
    }
}