import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { isAuthenticated } = useAuth0();

  console.log("isAuthenticated:", isAuthenticated);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>

      {isAuthenticated ? (
        <p>You are logged in ✅</p>
      
      ) : (
        <p>You are logged out ❌</p>
      )}

     
    </div>
  );
};

export default Home;
