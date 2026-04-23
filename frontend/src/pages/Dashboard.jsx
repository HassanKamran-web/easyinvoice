import React from "react";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import InvoiceTable from "../components/InvoiceTable";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import InvoiceDetails from "./InvoiceDetails";
import EditInvoice from "../components/EditInvoice";
import DeleteInvoice from "../components/DeleteInvoice";
import { FaSackDollar } from "react-icons/fa6";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";

const Dashboard = () => {

    const [isinvoiceDetails, setIsinvoiceDetails] = useState(false)
    const [iseditInvoice, setIseditInvoice] = useState(false)
    const [currentinvoice, setCurrentinvoice] = useState(null)
    const [isDelete, setIsDelete] = useState(false)


    const [invoices, setInvoices] = useState([])
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const { token } = useAuth()

    const filteredInvoices = invoices.filter((inv) => {
        const matchesSearch = inv.clientName
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "all" || inv.Status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const GetInvoices = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/invoice/get`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setInvoices(response.data.invoices)
            }

        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to fetch invoices")
        }
    }
    useEffect(() => {
        GetInvoices()
    }, [])
    return (

        <div className="bg-gray-950 min-h-screen text-white">

            <Navbar />

            <div className="p-8">

                <h2 className="text-2xl font-bold mb-6">
                    Dashboard
                </h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

                    <StatCard title="Invoices" value={invoices.length} icon={<FaFileInvoiceDollar size={28} />} />
                    <StatCard title="Revenue" value={invoices.reduce((total, invoice) => total + invoice.Amount, 0).toLocaleString()} icon={<FaSackDollar size={28} />} />
                    <StatCard title="Pending" value={invoices.filter(invoice => invoice.Status === "Unpaid").reduce((total, invoice) => total + invoice.Amount, 0).toLocaleString()} icon={<MdOutlinePendingActions size={28} />} />

                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-between mb-6 w-full">

                    <input
                        type="text"
                        placeholder="Search by client name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full  px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none"
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full md:w-1/4 px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white"
                    >
                        <option value="all">All</option>
                        <option value="Paid">Paid</option>
                        <option value="Unpaid">Unpaid</option>
                    </select>

                </div>

                <InvoiceTable setIsDelete={setIsDelete} setIseditInvoice={setIseditInvoice} invoices={filteredInvoices} setCurrentinvoice={setCurrentinvoice} setIsinvoiceDetails={setIsinvoiceDetails} />



            </div>

            {
                isinvoiceDetails && (
                    <InvoiceDetails currentinvoice={currentinvoice} setIsinvoiceDetails={setIsinvoiceDetails} />
                )
            }

            {
                iseditInvoice && (
                    <EditInvoice GetInvoices={GetInvoices} currentinvoice={currentinvoice} setIseditInvoice={setIseditInvoice} />
                )
            }
            {
                isDelete && (
                    <DeleteInvoice GetInvoices={GetInvoices} currentinvoice={currentinvoice} setIsDelete={setIsDelete} />
                )
            }

        </div>
    );
};

export default Dashboard;