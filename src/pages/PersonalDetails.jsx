import React from "react";
import { FaSpotify, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPersonalDetails } from "../store/signupSlice";

const PersonalDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { name, phone } = useSelector((state) => state.signup);

  const handleNext = (e) => {
    e.preventDefault();

    dispatch(
      setPersonalDetails({
        name,
        phone,
      })
    );

    console.log("Name:", name);
    console.log("Phone:", phone);

    navigate("/signup/terms");
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex justify-center">
      <div className="w-full max-w-[436px] px-4 pt-12">

        {/* Spotify Logo */}
        <div className="flex justify-center mb-10">
          <FaSpotify className="text-[32px] text-white" />
        </div>

        {/* Progress Bar */}
        <div className="h-[2px] w-full bg-[#727272] mb-5">
          <div className="h-[2px] w-2/3 bg-[#1ed760]"></div>
        </div>

        {/* Step + Back Arrow */}
        <div className="flex items-start gap-5">

          {/* Back Arrow */}
          <button
            type="button"
            onClick={() => navigate("/signup/password")}
            className="mt-1 text-[#b3b3b3] hover:text-white transition"
            aria-label="Go back"
          >
            <FaArrowLeft className="text-xl" />
          </button>

          <div className="flex-1">

            {/* Step */}
            <p className="text-[15px] text-[#b3b3b3] mb-2">
              Step 2 of 3
            </p>

            {/* Title */}
            <h1 className="text-[16px] font-bold mb-9">
              Tell us about yourself
            </h1>

            {/* Form */}
            <form onSubmit={handleNext}>

              {/* Name */}
              <div className="w-full">
                <label className="block text-[14px] font-bold mb-1">
                  Name
                </label>

                <p className="text-[14px] text-[#b3b3b3] mb-3">
                  This name will appear on your profile
                </p>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    dispatch(
                      setPersonalDetails({
                        name: e.target.value,
                        phone,
                      })
                    )
                  }
                  placeholder="Enter your name"
                  required
                  className="w-full h-12 rounded-md border border-[#727272] bg-[#121212] px-3 text-white outline-none placeholder:text-[#727272] focus:border-white transition"
                />
              </div>

              {/* Phone */}
              <div className="w-full mt-6">
                <label className="block text-[14px] font-bold mb-1">
                  Phone number
                </label>

                <p className="text-[14px] text-[#b3b3b3] mb-3">
                  Enter your phone number
                </p>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    dispatch(
                      setPersonalDetails({
                        name,
                        phone: e.target.value,
                      })
                    )
                  }
                  placeholder="Enter your phone number"
                  required
                  className="w-full h-12 rounded-md border border-[#727272] bg-[#121212] px-3 text-white outline-none placeholder:text-[#727272] focus:border-white transition"
                />
              </div>

              {/* Next */}
              <button
                type="submit"
                className="mt-16 w-full h-12 rounded-full bg-[#1ed760] text-black font-bold hover:bg-[#1fdf64] hover:scale-[1.02] transition"
              >
                Next
              </button>

            </form>

            {/* reCAPTCHA */}
            <div className="mt-9 text-center text-[11px] leading-4 text-[#b3b3b3]">
              This site is protected by reCAPTCHA and the Google{" "}
              <span className="underline cursor-pointer">
                Privacy Policy
              </span>{" "}
              and{" "}
              <span className="underline cursor-pointer">
                Terms of Service
              </span>{" "}
              apply.
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;