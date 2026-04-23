import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import { IoMdArrowRoundBack } from "react-icons/io";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"
import { useAuth } from "../Context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isloading, setIsloading] = useState(false)
  const { setToken } = useAuth()
  const navigate = useNavigate()

  const handleform = async (e) => {
    e.preventDefault()
    setIsloading(true)
    try {
      if (!email || !password) {
        return toast.error('All fields are required')
      }
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/login`, { email, password })

      if (response.status === 400) {
        toast.error(response?.data?.message)
      }

      if (response.status === 200) {
        const data = response.data
        if (data?.token) {
          localStorage.setItem('token', data?.token)
          setToken(data.token)
          toast.success(data?.message)
        }
        else {
          navigate('/login')
          toast.error("Login failed, please try again")
        }

      }

    } catch (err) {
      toast.error(err.response.data.message)

    } finally {
      setIsloading(false)
    }
  }
  return (
    <div className="min-h-screen bg-gray-950 flex items-center
     relative overflow-hidden justify-center px-4">
      <motion.div
        className="absolute -top-25 -left-25 w-75 h-75 bg-indigo-600 rounded-full blur-3xl opacity-30"
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-25 -right-25 w-75 h-75 bg-purple-600 rounded-full blur-3xl opacity-30"
        animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md border border-gray-800 bg-slate-950  flex flex-col items-center justify-between rounded-xl p-5">
        <div className="text-white mb-4 w-full">
          <Link to={'/'}>
            <IoMdArrowRoundBack />
          </Link>
        </div>



        <h2 className="text-2xl font-bold text-white text-center">
          Login to your account
        </h2>

        <p className="text-gray-400 text-center mt-2">
          Welcome back to EasyInvoice
        </p>

        <form onSubmit={(e) => { handleform(e) }} className="mt-6 space-y-4">

          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            placeholder="Email Address"
            className="w-full p-3 rounded-lg text-white border border-gray-700 focus:outline-none focus:border-indigo-500"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            placeholder="Password"
            className="w-full p-3 rounded-lg text-white border border-gray-700 focus:outline-none focus:border-indigo-500"
          />

          <button
            className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 p-3 rounded-lg text-white font-medium transition"
          >
            {
              isloading ? "Logging in..." : "Login"
            }
          </button>

        </form>

        <p className="text-gray-400 text-center mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-500 hover:underline">
            Sign Up
          </Link>
        </p>

      </motion.div>

    </div>
  );
};

export default Login;