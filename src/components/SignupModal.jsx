import React from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

const SignupModal = ({ song, onClose }) => {
  const navigate = useNavigate();

  const handleSignup = () => {
    onClose();
    navigate("/signup");
  };

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  const modal = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-4 py-4"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[95vh] w-full max-w-[810px] flex-col overflow-y-auto rounded-lg bg-[#282828]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main section */}
        <div className="flex flex-col items-center px-5 py-6 sm:px-8 md:flex-row md:items-center md:px-10 lg:px-[70px]">
          
          {/* Album Image */}
          <div className="shrink-0 overflow-hidden rounded-md">
            <img
              src={song?.image}
              alt={song?.title || "Song"}
              className="h-[180px] w-[180px] object-cover sm:h-[220px] sm:w-[220px] md:h-[250px] md:w-[250px] lg:h-[300px] lg:w-[300px]"
            />
          </div>

          {/* Right Content */}
          <div className="mt-6 flex w-full flex-col items-center md:ml-8 md:mt-0 md:w-[370px] lg:ml-[68px]">
            
            {/* Heading */}
            <h2 className="w-full text-center text-2xl font-bold leading-tight text-white sm:text-[28px] md:text-left lg:text-[32px]">
              Start listening with a free Spotify account
            </h2>

            {/* Signup */}
            <button
              type="button"
              onClick={handleSignup}
              className="mt-6 h-12 w-[178px] rounded-full bg-[#1ed760] text-[15px] font-bold text-black transition hover:scale-[1.03] sm:mt-7"
            >
              Sign up for free
            </button>

            {/* Download */}
            <button
              type="button"
              className="mt-3 h-12 w-[178px] rounded-full border border-[#727272] text-[15px] font-bold text-white transition hover:border-white"
            >
              Download app
            </button>

            {/* Login */}
            <p className="mt-6 text-center text-xs text-[#b3b3b3] sm:mt-8 sm:text-sm">
              Already have an account?{" "}
              <button
                type="button"
                onClick={handleLogin}
                className="font-bold text-white underline hover:text-[#1ed760]"
              >
                Log in
              </button>
            </p>
          </div>
        </div>

        {/* Close */}
        <div className="flex h-[50px] shrink-0 items-center justify-center">
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-bold text-white hover:underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

export default SignupModal;