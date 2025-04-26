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
              state.isAuthenticated = true;
           state.user = {
                id : action.payload.id,
               name : action.payload.name,
               email : action.payload.email,
               mobile : action.payload.mobile,
               profile_img : action.payload.profile_img,
               role : action.payload.role

           }
        },

        logOut : ( state ) => {
            state.isAuthenticated = false;
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

