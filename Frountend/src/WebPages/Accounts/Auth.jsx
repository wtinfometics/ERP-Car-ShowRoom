import React from 'react'
import { Navigate } from "react-router-dom";

const Auth = ({children}) => {
    const token = localStorage.getItem("user");

    if (!token) {
      // If no token, redirect to the login page
      return <Navigate to="/auth/login" />;
    }
  
    return children;
}

export default Auth