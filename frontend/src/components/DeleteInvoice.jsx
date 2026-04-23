import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../Context/AuthContext'
import toast from 'react-hot-toast'
import axios from 'axios'
import { MdDeleteOutline, MdClose, MdWarningAmber } from 'react-icons/md';

const DeleteInvoice = ({ GetInvoices, setIsDelete, currentinvoice }) => {
    const { token } = useAuth()
    const DeleteInvoiceHandler = async () => {

        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BASE_URL}/api/invoice/delete/${currentinvoice._id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            if (response.status === 200) {
                setIsDelete(false);
                GetInvoices();
                toast.success(response?.data?.message || 'Invoice Delete Successfully')
            }

        } catch (err) {
            toast.error(err?.response?.data?.messge || 'Failed to Delete Invoice')
            console.error(err.response?.data || err.message || err)

        }
    }
    return (
        <AnimatePresence>
            <div className='fixed inset-0 z-100 flex items-center justify-center p-4'>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsDelete(false)}
                    className='absolute inset-0 bg-[#030712]/80 backdrop-blur-sm'
                />

                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-md bg-[#101828] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden"
                >

                    <div className="h-1.5 w-full bg-red-600" />

                    <div className="p-6">

                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-red-500/10 p-3 rounded-xl">
                                <MdWarningAmber className="text-red-500 text-2xl" />
                            </div>
                            <button
                                onClick={() => setIsDelete(false)}
                                className="text-gray-500 hover:text-white transition-colors p-1"
                            >
                                <MdClose size={24} />
                            </button>
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-xl font-bold text-white">Delete Invoice?</h2>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Are you sure you want to delete this invoice? This action cannot be undone.
                            </p>
                        </div>

                        <div className="my-6 p-4 bg-[#030712] border border-gray-800 rounded-xl space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-500 text-xs uppercase tracking-wider font-semibold">Client</span>
                                <span className="text-gray-200 text-sm">{currentinvoice?.clientName || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 text-xs uppercase tracking-wider font-semibold">Service</span>
                                <span className="text-gray-200 text-sm truncate max-w-37.5">{currentinvoice?.Service || 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 text-xs uppercase tracking-wider font-semibold">Amount</span>
                                <span className="text-[#432DD7] font-bold text-sm">${currentinvoice?.Amount}</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mt-8">
                            <button
                                onClick={() => setIsDelete(false)}
                                className="flex-1 px-6 py-3 cursor-pointer rounded-xl bg-gray-800 text-white font-medium hover:bg-gray-700 transition-all order-2 sm:order-1"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={DeleteInvoiceHandler}
                                className="flex-1 flex items-center cursor-pointer justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg shadow-red-600/20 transition-all order-1 sm:order-2"
                            >
                                <MdDeleteOutline size={20} />
                                Delete
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}

export default DeleteInvoice