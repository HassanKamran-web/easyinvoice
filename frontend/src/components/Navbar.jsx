import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdDashboard, MdMenu, MdClose, MdAddCircle } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-[#101828] border-b border-gray-800 px-6 py-4 relative z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <Link  className="text-xl font-bold text-white tracking-tight">
          EasyInvoice
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link 
            to={'/dashboard'} 
            className="text-gray-400 flex items-center gap-2 hover:text-white transition-colors"
          >
            <MdDashboard className="text-xl" />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          
          <Link 
            to={'/createinvoice'} 
            className="bg-[#432DD7] hover:bg-[#3522ab] px-5 py-2.5 rounded-lg text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-500/10"
          >
            Create Invoice
          </Link>
        </div>

        <button 
          onClick={toggleMenu}
          className="md:hidden text-white text-3xl focus:outline-none"
        >
          {isOpen ? <MdClose /> : <MdMenu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-[#101828] border-t border-gray-800 mt-4"
          >
            <div className="flex flex-col gap-4 pb-6 pt-2">
              <Link 
                to={'/dashboard'} 
                onClick={toggleMenu}
                className="flex items-center gap-3 text-gray-300 hover:text-white py-2"
              >
                <MdDashboard className="text-2xl" />
                <span className="text-lg">Dashboard</span>
              </Link>

              <Link 
                to={'/createinvoice'} 
                onClick={toggleMenu}
                className="flex items-center justify-center gap-2 bg-[#432DD7] text-white py-3 rounded-xl font-bold"
              >
                <MdAddCircle className="text-xl" />
                Create Invoice
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;