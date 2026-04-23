import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"

const CreateInvoice = () => {
  const [clientinfo, setClientinfo] = useState('')
  const [service, setService] = useState('')
  const [amount, setAmount] = useState(0)
  const [status, setStatus] = useState("Unpaid")
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const { token } = useAuth()

  const createInvoice = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/invoice/create`, {
        clientinfo,
        service,
        amount,
        status
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.status === 201) {
        toast.success(response.data.message)
        setClientinfo('')
        setService('')
        setAmount(0)
        navigate('/dashboard')
      }

    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create invoice")
    }
  }

  return (

    <div className="bg-gray-950 min-h-screen text-white font-sans selection:bg-indigo-500/30">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8 max-w-2xl mx-auto"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Create Invoice
          </h2>
          <p className="text-gray-400 mt-2 text-sm">Fill in the details to generate a professional invoice.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900/50 border border-gray-800 p-8 rounded-2xl shadow-2xl backdrop-blur-sm space-y-6"
        >
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold ml-1">Client Information</label>
            <input
              className="w-full bg-gray-800/50 border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none p-3.5 rounded-xl transition-all duration-300 placeholder:text-gray-600"
              value={clientinfo}
              onChange={(e) => { setClientinfo(e.target.value) }}
              placeholder="e.g. John Doe"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold ml-1">Service Details</label>
            <input
              className="w-full bg-gray-800/50 border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none p-3.5 rounded-xl transition-all duration-300 placeholder:text-gray-600"
              value={service}
              onChange={(e) => { setService(e.target.value) }}
              placeholder="e.g. Web Development"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold ml-1">Amount ($)</label>
              <input
                type="number"
                className="w-full bg-gray-800/50 border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none p-3.5 rounded-xl transition-all duration-300 placeholder:text-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={amount}
                onChange={(e) => { setAmount(e.target.value) }}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2 relative">
              <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold ml-1">Status</label>

              {/* Custom Select Trigger */}
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-gray-800 border  focus:border-indigo-500 border-indigo-500/0 hover:border-indigo-500/50 outline-none p-3.5 rounded-xl transition-all duration-300 cursor-pointer flex justify-between items-center text-gray-200"
              >
                {status}
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  className="text-gray-500 text-xs"
                >
                  ▼
                </motion.span>
              </div>

              {/* Custom Options Menu */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 w-full mt-2 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl"
                  >
                    {['Unpaid', 'Paid'].map((option) => (
                      <div
                        key={option}
                        onClick={() => {
                          setStatus(option);
                          setIsOpen(false);
                        }}
                        className={`px-4 py-3 cursor-pointer transition-colors duration-200 
              ${status === option ? 'bg-indigo-600/20 text-indigo-400' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}
                      >
                        {option}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-200 cursor-pointer"
            onClick={(e) => { createInvoice(e) }}
          >
            Generate Invoice
          </motion.button>
        </motion.div>
      </motion.div>
    </div>

  );
};

export default CreateInvoice;