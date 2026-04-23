import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Landing = () => {
  return (
    <div className="bg-gray-950 text-white min-h-screen relative overflow-hidden">

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

      <header className="flex justify-between px-8 py-6 relative z-10">
        <h1 className="text-2xl font-bold text-white">EasyInvoice</h1>


        <div className="space-x-4">
          <Link to={'/login'} className="text-gray-400 hover:text-white">
            Login
          </Link>

          <Link to={'/register'} className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg">
            Sign Up
          </Link>
        </div>
      </header>

      <section className="flex flex-col items-center text-center mt-24 px-6 relative z-10">

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold leading-tight"
        >
          Create Professional Invoices <br />
          In Seconds
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-400 mt-6"
        >
          Perfect tool for freelancers and agencies to manage invoices.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            to={'/register'}
            className="mt-8 inline-block bg-indigo-600 px-8 py-3 rounded-lg text-lg hover:bg-indigo-700"
          >
            Get Started
          </Link>
        </motion.div>

        <motion.div
          className="mt-16 text-indigo-400 text-sm"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🚀 Fast • Simple • Professional
        </motion.div>

      </section>

    </div>
  );
};

export default Landing;