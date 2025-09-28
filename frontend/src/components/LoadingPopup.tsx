import React from "react";
import { motion } from "framer-motion";

interface LoadingPopupProps {
  isVisible: boolean;
}

const LoadingPopup: React.FC<LoadingPopupProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-2xl p-8 flex flex-col items-center space-y-6 shadow-2xl"
      >
        {/* Spinning Circular Loader */}
        <div className="w-20 h-20">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-200 border-t-[#0abab5]"></div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Creating your trip
          </h3>
          <p className="text-sm text-gray-600">with magic and love ✨</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingPopup;
