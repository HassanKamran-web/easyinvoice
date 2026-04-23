import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";
import { MdEdit, MdDelete } from "react-icons/md"
const InvoiceTable = ({ invoices, setIsinvoiceDetails, setCurrentinvoice, setIseditInvoice, setIsDelete }) => {

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">

      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-175">

          <thead className="bg-gray-800 text-gray-400 text-sm">
            <tr>
              <th className="p-4">Client</th>
              <th className="p-4">Service</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
              <th className="p-4">Edit</th>
            </tr>
          </thead>

          <tbody>
            {
              invoices.length === 0 ? (
                <tr className="border-t border-gray-800">
                  <td colSpan={6} className="p-4 text-center text-gray-500">
                    No invoices found.
                  </td>
                </tr>
              ) : (
                invoices.map((invoice) => (
                  <tr
                    key={invoice._id}
                    className="border-t border-gray-800 hover:bg-gray-800/40 transition"
                  >
                    <td className="p-4 text-white whitespace-nowrap">
                      {invoice.clientName}
                    </td>

                    <td className="p-4 text-gray-300 whitespace-nowrap">
                      {invoice.Service}
                    </td>

                    <td className="p-4 text-gray-300 whitespace-nowrap">
                      ${invoice.Amount}
                    </td>

                    <td className="p-4">
                      <span
                        className={`${invoice.Status === "Paid"
                            ? "bg-green-600/20 text-green-400"
                            : "bg-yellow-600/20 text-yellow-400"
                          } px-3 py-1 rounded-full text-xs sm:text-sm`}
                      >
                        {invoice.Status}
                      </span>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => {
                          setIsinvoiceDetails(true);
                          setCurrentinvoice(invoice);
                        }}
                        className="text-indigo-500 text-sm cursor-pointer sm:text-base"
                      >
                        View
                      </button>
                    </td>

                    <td className="p-4 flex items-center gap-3 text-lg sm:text-2xl">
                      <MdEdit
                        onClick={() => {
                          setIseditInvoice(true);
                          setCurrentinvoice(invoice);
                        }}
                        className="text-indigo-600 cursor-pointer hover:text-indigo-700 transition"
                      />

                      <MdDelete
                        onClick={() => {
                          setIsDelete(true);
                          setCurrentinvoice(invoice);
                        }}
                        className="text-red-600 cursor-pointer hover:text-red-700 transition"
                      />
                    </td>
                  </tr>
                ))
              )
            }
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default InvoiceTable;