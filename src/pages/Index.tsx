import { useState } from "react";
import LoginSection from "@/components/LoginSection";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {!isLoggedIn ? (
        <LoginSection onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <Dashboard onLogout={() => setIsLoggedIn(false)} />
      )}
    </>
  );
};

export default Index;
