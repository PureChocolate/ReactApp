/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
    // user from redux store
    const { user, loaded } = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        /* In the body of the useEffect hook, check if loaded is true and user.email is falsy. If so, call the navigate function and pass in /login as the first argument and an options object as the second argument, with the replace property set to true. */        
        
        //CODE HERE
        if(loaded && !user?.email){
            return navigate("/login", {replace: true});
        }

    }, [loaded, user])

    return children;
};

export default Protected;