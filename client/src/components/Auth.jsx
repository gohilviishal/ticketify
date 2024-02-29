import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Auth = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || !user.email) {
      navigate("/");
    }
  }, [user, navigate]);
  return user && user.email ? children : null;
};

export default Auth;
