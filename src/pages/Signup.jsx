import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/signup",
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );

      console.log(response.data);

      toast.success("Signup Successful");

      setName("");

      setEmail("");

      setPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div
      className="
      min-h-screen
      bg-gray-100
      flex
      items-center
      justify-center
      p-4
    "
    >
      <div
        className="
        max-w-6xl
        w-full
        bg-white
        rounded-2xl
        shadow-lg
        p-6
        md:p-10
      "
      >
        <div
          className="
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-10
          items-center
        "
        >
          {/* Left Section */}

          <div
            className="
            text-center
            lg:text-left
          "
          >
            <h1
              className="
              text-3xl
              font-bold
              text-gray-800
            "
            >
              Welcome Back!!!
            </h1>

            <p
              className="
              mt-2
              text-gray-500
            "
            >
              Please enter your credentials.
            </p>

            <img
              src="/characterpose25.png"
              alt="login"
              className="
              mt-8
              w-full
              max-w-sm
              mx-auto
              lg:mx-0
            "
            />
          </div>

          {/* Right Section */}

          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="grid gap-5">
              {/* Username */}

              <div>
                <label
                  className="
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  mb-2
                "
                >
                  Username
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your Username"
                  className="
                  w-full
                  h-12
                  border
                  border-gray-300
                  rounded-lg
                  px-4
                  bg-gray-50
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
                />
              </div>

              {/* Email */}

              <div>
                <label
                  className="
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  mb-2
                "
                >
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@domain.com"
                  className="
                  w-full
                  h-12
                  border
                  border-gray-300
                  rounded-lg
                  px-4
                  bg-gray-50
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
                />
              </div>

              {/* Password */}

              <div>
                <label
                  className="
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  mb-2
                "
                >
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="
                  w-full
                  h-12
                  border
                  border-gray-300
                  rounded-lg
                  px-4
                  bg-gray-50
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
                />
              </div>

              {/* Submit Button */}

              <div
                className="
                text-center
                mt-2
              "
              >
                <button
                  type="submit"
                  className="
                  bg-blue-500
                  hover:bg-blue-600
                  text-white
                  font-semibold
                  py-3
                  px-8
                  rounded-lg
                  transition
                "
                >
                  Signup
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
