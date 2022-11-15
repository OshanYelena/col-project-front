import React from "react";
import { useRouter } from "next/router";

const AuthContext = React.createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = React.useState({
    token: "",
    type: "",
  });

  const setUserAuthInfo = ({ data }) => {
    const token = localStorage.getItem("auth-token");
    const type = localStorage.getItem("type");
    setAuthState({
      token,
      type,
    });
  };

  // checks if the user is authenticated or not
  const isUserAuthenticated = () => {
    if (!authState.token) {
      return false;
    }
  };

  const isUserType = () => {
    if (authState.type) {
      return authState.type;
    }
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
        isUserAuthenticated,
        isUserType,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
