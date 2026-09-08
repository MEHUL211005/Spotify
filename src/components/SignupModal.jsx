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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col overflow-hidden rounded-lg bg-[#282828]"
        style={{
          width: "810px",
          height: "428px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main section */}
        <div
          className="flex items-center"
          style={{
            height: "378px",
            paddingLeft: "70px",
            paddingRight: "70px",
          }}
        >
          {/* Album Image */}
          <div
            className="shrink-0 overflow-hidden rounded-md"
            style={{
              width: "300px",
              height: "300px",
            }}
          >
            <img
              src={song?.image}
              alt={song?.title || "Song"}
              style={{
                width: "300px",
                height: "300px",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          {/* Right Content */}
          <div
            className="flex flex-col items-center"
            style={{
              marginLeft: "68px",
              width: "370px",
            }}
          >
            {/* Heading */}
            <h2
              className="font-bold text-white"
              style={{
                width: "370px",
                fontSize: "32px",
                lineHeight: "1.3",
                margin: 0,
                textAlign: "left",
              }}
            >
              Start listening with a free Spotify account
            </h2>

            {/* Signup */}
            <button
              type="button"
              onClick={handleSignup}
              className="rounded-full bg-[#1ed760] font-bold text-black transition hover:scale-[1.03]"
              style={{
                width: "178px",
                height: "49px",
                marginTop: "28px",
                fontSize: "15px",
              }}
            >
              Sign up for free
            </button>

            <button
              type="button"
              className="rounded-full border border-[#727272] font-bold text-white transition hover:border-white"
              style={{
                width: "178px",
                height: "49px",
                marginTop: "15px",
                fontSize: "15px",
              }}
            >
              Download app
            </button>

            {/* Login */}
            <p
              className="text-[#b3b3b3]"
              style={{
                marginTop: "32px",
                fontSize: "14px",
              }}
            >
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
        <div
          className="flex items-center justify-center"
          style={{
            height: "50px",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="font-bold text-white hover:underline"
            style={{
              fontSize: "15px",
            }}
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
