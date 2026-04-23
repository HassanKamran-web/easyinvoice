import React, { useState } from "react";

const Sidebar = () => {

  const [open, setOpen] = useState(false);

  return (
    <>


      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-indigo-600 p-2 rounded"
      >
        ☰
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 border-r border-gray-800 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300`}
      >

        <div className="p-6 border-b border-gray-800">

          <h1 className="text-xl font-bold text-white">
            EasyInvoice
          </h1>

        </div>

        <nav className="p-4 space-y-2">

          <a
            href="/dashboard"
            className="block text-gray-300 hover:bg-gray-800 p-3 rounded-lg"
          >
            Dashboard
          </a>

          <a
            href="/clients"
            className="block text-gray-300 hover:bg-gray-800 p-3 rounded-lg"
          >
            Clients
          </a>

          <a
            href="/create-invoice"
            className="block text-gray-300 hover:bg-gray-800 p-3 rounded-lg"
          >
            Create Invoice
          </a>

          <a
            href="/invoices"
            className="block text-gray-300 hover:bg-gray-800 p-3 rounded-lg"
          >
            Invoices
          </a>

        </nav>

      </div>

    </>
  );
};

export default Sidebar;