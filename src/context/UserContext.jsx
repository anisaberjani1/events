import { createContext, useContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user: auth0User, isAuthenticated , isLoading,loginWithRedirect ,logout: auth0Logout} = useAuth0();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      setUser(auth0User);
    } else {
      setUser(null);
    }
  }, [auth0User, isAuthenticated]);
  const login = () => loginWithRedirect();
  const logout = () => auth0Logout({ returnTo: window.location.origin });

  return (
    <UserContext.Provider value={{ user, isAuthenticated, isLoading, login, logout}}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext);
