"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserData } from "../redux/slices/userSlice";
import Swal from "sweetalert2";
import FullScreenLoader from "../components/Loading";

export default function Form() {
  const dispatch = useDispatch();
  const router = useRouter();

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [admin_userEmail, setAdmin_userEmail] = useState("");
  const [admin_userPassword, setAdmin_userPassword] = useState("");
  const [error, setError] = useState("");

  const token = useSelector((store) => store.loginStore.token);

  const loginForm = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        admin_userEmail,
        admin_userPassword,
      };

      const { data } = await axios.post(
        `${apiBaseUrl}/user/login`,
        payload
      );

      if (data.status === 1) {
        dispatch(loginUserData({ token: data.token }));

        Swal.fire({
          title: "Login Successfully!",
          text: "You are now logged in",
          icon: "success",
          confirmButtonColor: "black",
        }).then((result) => {
          if (result.isConfirmed) {
            setLoading(true);
            router.push("/dashboard"); // page change will remove loader automatically
          }
        });
      } else {
        Swal.fire({
          title: "Invalid Username or Password!",
          text: "Please check your credentials",
          icon: "error",
          confirmButtonColor: "black",
          timer: 2000,
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Server Error",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonColor: "black",
      });
    }
  };

  return (
    <>
      {loading && <FullScreenLoader />}

      <div className="w-screen h-screen relative bg-[url('/login-bg.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/90"></div>

        <div className="fixed top-1/2 left-1/2 z-50 w-[92%] max-w-[420px]
        -translate-x-1/2 -translate-y-1/2
        backdrop-blur-xl bg-white/10 border border-white/20
        rounded-2xl shadow-2xl">

          <div className="flex justify-center pt-6">
            <img
              src="/logo.jpg"
              alt="Logo"
              className="w-[110px] h-[110px] object-contain rounded-full bg-white p-2 shadow-md"
            />
          </div>

          <form onSubmit={loginForm} className="px-8 pb-8 pt-4">
            <h1 className="text-2xl font-semibold text-white text-center mb-6">
              Sign in to your account
            </h1>

            <div className="mb-4">
              <label className="text-sm text-gray-300 font-medium">
                Email
              </label>
              <input
                type="email"
                required
                value={admin_userEmail}
                onChange={(e) => setAdmin_userEmail(e.target.value)}
                className="mt-1 w-full rounded-lg bg-white/20 border border-white/30
                text-white placeholder-gray-300 px-4 py-3
                focus:outline-none focus:ring-2 focus:ring-white/60"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-4">
              <label className="text-sm text-gray-300 font-medium">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={admin_userPassword}
                onChange={(e) => setAdmin_userPassword(e.target.value)}
                className="mt-1 w-full rounded-lg bg-white/20 border border-white/30
                text-white placeholder-gray-300 px-4 py-3
                focus:outline-none focus:ring-2 focus:ring-white/60"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center gap-2 text-gray-300 text-sm mb-3">
              <input
                type="checkbox"
                onChange={() => setShowPassword(!showPassword)}
                className="accent-white cursor-pointer"
              />
              Show password
            </div>

            <div className="flex justify-between items-center mb-4">
              <p className="text-red-400 text-sm">{error}</p>
              <span className="text-sm text-white/80 cursor-pointer hover:underline">
                Forgot password?
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-black
              bg-white hover:bg-gray-200 disabled:opacity-60
              transition-all duration-200 active:scale-[0.98]"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
