import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";

function Navigation() {
  // user from redux store
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  // logout function
  const logoutHandler = () => {
    // removing current user from redux store
    dispatch(logout());
    localStorage.removeItem('user');
  };

  return (
    <div>
      <nav>
        <ul>
          {user.email ? (
            <>
              <li>
                <Link to="/profile">
                  <button>Profile</button>
                </Link>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <button>Log In</button>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <button>Sign Up</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;