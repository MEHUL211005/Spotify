import React, { useState } from "react";
import { FaSpotify, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPersonalDetails } from "../store/signupSlice";

const PersonalDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { name, phone } = useSelector(
    (state) => state.signup
  );

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  });

  const handleNext = (e) => {
    e.preventDefault();

    const newErrors = {
      name: "",
      phone: "",
    };

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Please enter your name.";
    } else if (!/^[A-Za-z\s]+$/.test(name.trim())) {
      newErrors.name =
        "Name should contain only letters.";
    }

    // Phone validation
    if (!phone.trim()) {
      newErrors.phone =
        "Please enter your phone number.";
    } else if (!/^\d{10}$/.test(phone.trim())) {
      newErrors.phone =
        "Please enter a valid 10-digit phone number.";
    }

    setErrors(newErrors);

    // Stop if validation fails
    if (newErrors.name || newErrors.phone) {
      return;
    }

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
    <div className="flex min-h-screen justify-center bg-[#121212] text-white">
      <div className="w-full max-w-[436px] px-4 pt-12">

        {/* Spotify Logo */}
        <div className="mb-10 flex justify-center">
          <FaSpotify className="text-[32px] text-white" />
        </div>

        {/* Progress Bar */}
        <div className="mb-5 h-[2px] w-full bg-[#727272]">
          <div className="h-[2px] w-2/3 bg-[#1ed760]"></div>
        </div>

        {/* Step + Back Arrow */}
        <div className="flex items-start gap-5">

          {/* Back Arrow */}
          <button
            type="button"
            onClick={() =>
              navigate("/signup/password")
            }
            className="mt-1 text-[#b3b3b3] transition hover:text-white"
            aria-label="Go back"
          >
            <FaArrowLeft className="text-xl" />
          </button>

          <div className="flex-1">

            {/* Step */}
            <p className="mb-2 text-[15px] text-[#b3b3b3]">
              Step 2 of 3
            </p>

            {/* Title */}
            <h1 className="mb-9 text-[16px] font-bold">
              Tell us about yourself
            </h1>

            {/* Form */}
            <form
              onSubmit={handleNext}
              noValidate
            >

              {/* Name */}
              <div className="w-full">

                <label className="mb-1 block text-[14px] font-bold">
                  Name
                </label>

                <p className="mb-3 text-[14px] text-[#b3b3b3]">
                  This name will appear on your profile
                </p>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    dispatch(
                      setPersonalDetails({
                        name: e.target.value,
                        phone,
                      })
                    );

                    if (errors.name) {
                      setErrors((prev) => ({
                        ...prev,
                        name: "",
                      }));
                    }
                  }}
                  placeholder="Enter your name"
                  className={`h-12 w-full rounded-md border bg-[#121212] px-3 text-white outline-none placeholder:text-[#727272] transition focus:border-white ${
                    errors.name
                      ? "border-red-500"
                      : "border-[#727272]"
                  }`}
                />

                {/* Name Error */}
                {errors.name && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.name}
                  </p>
                )}

              </div>

              {/* Phone */}
              <div className="mt-6 w-full">

                <label className="mb-1 block text-[14px] font-bold">
                  Phone number
                </label>

                <p className="mb-3 text-[14px] text-[#b3b3b3]">
                  Enter your phone number
                </p>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    dispatch(
                      setPersonalDetails({
                        name,
                        phone: e.target.value,
                      })
                    );

                    if (errors.phone) {
                      setErrors((prev) => ({
                        ...prev,
                        phone: "",
                      }));
                    }
                  }}
                  placeholder="Enter your phone number"
                  className={`h-12 w-full rounded-md border bg-[#121212] px-3 text-white outline-none placeholder:text-[#727272] transition focus:border-white ${
                    errors.phone
                      ? "border-red-500"
                      : "border-[#727272]"
                  }`}
                />

                {/* Phone Error */}
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.phone}
                  </p>
                )}

              </div>

              {/* Next */}
              <button
                type="submit"
                className="mt-16 h-12 w-full rounded-full bg-[#1ed760] font-bold text-black transition hover:scale-[1.02] hover:bg-[#1fdf64]"
              >
                Next
              </button>

            </form>

            {/* reCAPTCHA */}
            <div className="mt-9 text-center text-[11px] leading-4 text-[#b3b3b3]">
              This site is protected by reCAPTCHA and the Google{" "}
              <span className="cursor-pointer underline">
                Privacy Policy
              </span>{" "}
              and{" "}
              <span className="cursor-pointer underline">
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