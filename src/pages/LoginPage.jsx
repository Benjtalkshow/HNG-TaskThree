import "../styles/index.css";
import React, { useState } from "react";
import { auth } from "../Auth/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import bg from "../assets/images/bg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Popup from "../components/Popup";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/gallery";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess("Login successful!");
      setTimeout(() => {
        setSuccess("");
        navigate(from, { replace: true });
      }, 3000);
    } catch (error) {
      setError("Invalid email or password");
      setEmail("");
      setPassword("");
      setTimeout(() => {
        setError("");
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <section
        className="bg-gray-50 relative h-screen w-screen"
        style={{
          background: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Error Banner */}
        {error && (
          <div className="fixed top-0 right-0 m-4 p-4 sm:px10 sm:py-10 bg-red-500 text-white rounded-lg shadow">
            {error}
          </div>
        )}
        {/* Success Banner */}
        {success && (
          <div className="fixed top-0 right-0 m-4 p-4 bg-green-500 text-white rounded-lg shadow">
            {success}
          </div>
        )}
        {/* popup banner */}
        <div>{showPopup && <Popup onClose={handleClosePopup} />}</div>

        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <div className="w-full bg-white  rounded-lg shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div>
                <h1 className="text-center text-2xl font-bold text-red-400">
                  Drag and Drop React Gallery
                </h1>
              </div>
              <h1 className="text-lg font-semibold leading-tight tracking-tight md:text-2 text-gray-900">
                Log in to your account
              </h1>
              {/* form */}
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   dark:placeholder-gray-900 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   dark:placeholder-gray-900 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <div
                    className="absolute  right-0 pr-3 bottom-[.8rem] flex items-center cursor-pointer"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? (
                      <FontAwesomeIcon icon={faEye} />
                    ) : (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-900">
                        Remember me
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className={`w-full text-white bg-red-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Log In"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;

