import { useEffect,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../features/auth/authThunk";

const useAuthInitializer = () => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(( state ) => state.auth);

    useEffect(() => {
  const shouldTry = localStorage.getItem("isAuthenticated") === "true"; 

  if (shouldTry && !isAuthenticated) {
    dispatch(fetchUserProfile());
  }
}, [dispatch, isAuthenticated]);

};

export default useAuthInitializer;