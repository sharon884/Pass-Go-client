import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated : false ,
    user : {
        name : "",
        email : "",
        mobile : "",
        profile_img : "",
        role : "",
    }
}

const authSlice = createSlice({
    name : "auth" ,
    initialState,
    reducers: {
        setCredentials : ( state , action ) => {
            console.log("ivde acion payload", action.payload); // Debugging line to check action payload
           state.user = {
               name : action.payload.name,
               email : action.payload.email,
               mobile : action.payload.mobile,
               profile_img : action.payload.profile_img,
               role : action.payload.role

           }
        },

        logOut : ( state ) => {
            state.user  = {
                name : "",
                email : "",
                mobile : "",
                profile_img : "",
                role : "",
            }
        }        
        
    }
});

export const { setCredentials , logOut } = authSlice.actions;
export default authSlice.reducer;

