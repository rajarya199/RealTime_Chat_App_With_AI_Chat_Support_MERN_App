import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../context/user.context";
import WelcomeMessage from "../components/WelcomeMsg.jsx";

const WelcomeUser = () => {
  const { user } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState(null);
  const [showWelcome, setShowWelcome] = useState(user ? true : false);
  useEffect(() => {
    // Simulate checking if user is logged in
    const timer = setTimeout(() => {
      setUserInfo({
        name: user.username,
        email: user.email,
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        lastLogin: new Date(Date.now() - 86400000).toLocaleDateString(),
        projects: 5,
        notifications: 3,
      });
      setShowWelcome(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [user]);
  return (
    <div>
      {user && userInfo && showWelcome ? (
        <WelcomeMessage user={userInfo} onClose={() => setShowWelcome(false)} />
      ) : !user ? (
        <div className="fixed inset-x-0 top-16 z-40 flex justify-center items-center transition-opacity duration-500 opacity-100">
          <div className="relative w-full max-w-4xl mx-4">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/90 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 scale-100 translate-y-0" />
            <div className="relative p-6 sm:p-8 text-white text-center">
              <div className="text-2xl sm:text-3xl font-bold">
                Please log in to see your profile info.
              </div>
              <p className="mt-2 text-indigo-100 max-w-xl mx-auto">
                Your personalized dashboard and updates will be available once
                you're signed in.
              </p>
            </div>
            {" "}
          </div>
          {" "}
          <style>{`
 @keyframes float {
 0%, 100% {
 transform: translateY(0) scale(1);
 opacity: 0.7;
}
 50% {
 transform: translateY(-20px) scale(0.5);
 opacity: 0.3;
 }
 }
 `}</style>
          {" "}
        </div>
      ) : null}
    </div>
  );
};

export default WelcomeUser;
