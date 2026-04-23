import React from 'react'
import { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { useAuth } from '../Context/AuthContext';
import toast from 'react-hot-toast';

const EditInvoice = ({ currentinvoice, setIseditInvoice, GetInvoices }) => {
  const [clientinfo, setClientinfo] = useState(currentinvoice?.clientName || '')
  const [service, setService] = useState(currentinvoice?.Service || '')
  const [amount, setAmount] = useState(currentinvoice?.Amount || '')
  const [status, setStatus] = useState(currentinvoice?.Status || '')
  const {token} = useAuth()

  const updateInvoice = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/invoice/update`, {
        clientinfo,
        service,
        amount,
        status,
        id: currentinvoice._id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setIseditInvoice(false);
        toast.success(response?.data?.message);
        GetInvoices();
      }

    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update invoice");
    }
  }
  return (
    <div className="bg-gray-950/20 fixed inset-0 z-100 min-h-screen text-white">
      <div className='absolute inset-0 bg-[#030712]/80 backdrop-blur-sm ' onClick={()=>{setIseditInvoice(false)}}>

      </div>

      <div className="flex items-center justify-center h-full p-8 max-w-4xl mx-auto">


        <div className="bg-gray-900 p-6 rounded-xl space-y-4 relative">
          <IoMdClose onClick={() => { setIseditInvoice(false) }} className="absolute top-3 right-4 text-2xl cursor-pointer" />

          <h2 className="text-2xl font-bold mb-6">
            Update Invoice
          </h2>

          <input
            className="w-full bg-gray-800 p-3 rounded-lg"
            value={clientinfo}
            onChange={(e) => { setClientinfo(e.target.value) }}
            placeholder="Client Name"
          />

          <input
            className="w-full bg-gray-800 p-3 rounded-lg"
            value={service}
            onChange={(e) => { setService(e.target.value) }}
            placeholder="Service"
          />

          <input
            className="w-full bg-gray-800 p-3 rounded-lg"
            value={amount}
            onChange={(e) => { setAmount(e.target.value) }}
            placeholder="Amount"
          />
          <select className="w-full bg-gray-800 p-3 rounded-lg" value={status} onChange={(e) => { setStatus(e.target.value) }}>
            <option className="w-full bg-gray-800 p-3 border-b border-gray-300" value="Unpaid">Unpaid</option>
            <option className="w-full bg-gray-800 p-3" value="Paid">Paid</option>
          </select>

          <button onClick={(e)=>{updateInvoice(e)}} className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 cursor-pointer  px-6 py-3 rounded-lg">
            Update Invoice
          </button>

        </div>

      </div>

    </div>
  )
}

export default EditInvoice