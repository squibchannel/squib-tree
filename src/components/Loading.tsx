// Loading.tsx
import React from "react";

interface LoadingProps {
  isOpen: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isOpen }) => {
  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-900 opacity-75"></div>
        <div className="relative bg-gray-800 w-96 rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <div className="flex items-center">
              <img
                src="/pika_running_loading.gif"
                alt="Loading animation"
                className="w-[50%] h-[50%] mr-3"
              />
              <p className="white text-lg relative overflow-hidden">
                <span className="animate-typewriter block">Loading...</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
