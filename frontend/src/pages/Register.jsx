import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import { IoMdArrowRoundBack } from "react-icons/io";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isloading, setIsloading] = useState(false)
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const formhandle = async (e) => {
    e.preventDefault()
    setIsloading(true)
    try {
      if (!email || !password | !name) {
        return toast.error('All fields are required')
      }
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/register`, { name, email, password })
      if (response.status === 200) {
        toast.success(response?.data?.message)
        navigate('/login')
      }

    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to register")

    }finally{
      setIsloading(false)
    }
  }
  return (

    <div className="min-h-screen bg-gray-950 flex items-center overflow-hidden relative justify-center px-4">
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
        className="w-full max-w-md  border bg-slate-950 flex flex-col items-center justify-between shadow-md border-gray-800 rounded-xl py-5 px-5">
        <div className="text-white mb-4 w-full">
          <Link to={'/'}>
            <IoMdArrowRoundBack />
          </Link>
        </div>
        <h2 className="text-2xl font-bold text-white text-center">
          Create your account
        </h2>

        <p className="text-gray-400 text-center mt-2">
          Start managing your invoices
        </p>

        <form onSubmit={(e) => { formhandle(e) }} className="mt-6 space-y-4">

          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value) }}
            placeholder="Full Name"
            className="w-full p-3 rounded-lg  text-white border border-gray-700 focus:outline-none focus:border-indigo-500"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            placeholder="Email Address"
            className="w-full p-3 rounded-lg  text-white border border-gray-700 focus:outline-none focus:border-indigo-500"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            placeholder="Password"
            className="w-full p-3 rounded-lg  text-white border border-gray-700 focus:outline-none focus:border-indigo-500"
          />

          <button
            className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 p-3 rounded-lg text-white font-medium transition"
          >
            {
              isloading ? "Creating Account..." : "Create Account"
            }
          </button>

        </form>

        <p className="text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-500 hover:underline">
            Login
          </Link>
        </p>

      </motion.div>

    </div>
  );
};

export default Register;