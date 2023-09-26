import React, { useState, useEffect } from "react";

function Popup({ onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-end z-50 px-5 top-[-35rem] sm:top-[-39rem]  ${
        isVisible ? "animate-fly-in" : "animate-fly-out"
      }`}
    >
      <div className="bg-white px-6 sm:py-10 shadow-lg rounded-lg">
        <p className="text-gray-800 font-bold py-5 sm:py-0">
          Email: user@example.com, Password: 1Password. Happy Drag&Drop😉
        </p>
      </div>
    </div>
  );
}

export default Popup;
