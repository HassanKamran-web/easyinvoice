import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";

const InvoiceDetails = ({ currentinvoice, setIsinvoiceDetails }) => {
  const invoiceRef = useRef();
  const pdfRef = useRef();

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadInvoicePDF = async () => {
    setIsDownloading(true);

    await new Promise((res) => setTimeout(res, 300));

    const element = pdfRef.current;

    const originalStyle = {
      maxHeight: element.style.maxHeight,
      overflow: element.style.overflow,
    };

    element.style.maxHeight = "none";
    element.style.overflow = "visible";

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    element.style.maxHeight = originalStyle.maxHeight;
    element.style.overflow = originalStyle.overflow;

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= 295;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= 295;
    }

    pdf.save(`invoice-${currentinvoice?.clientName}.pdf`);

    setIsDownloading(false);
  };

  return (
    <div className="bg-gray-950/60 fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 text-white backdrop-blur-sm">
      <div onClick={()=>{setIsinvoiceDetails(false)}} className="absolute inset-0 bg-[#030712]/80 backdrop-blur-sm ">

      </div>
      <div className="max-w-4xl bg-gray-900 w-full rounded-xl relative p-6 sm:p-8 shadow-2xl">
        <IoMdClose
          onClick={() => setIsinvoiceDetails(false)}
          className="absolute top-4 right-4 text-2xl cursor-pointer  hover:text-gray-400 transition-colors"
        />
        <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
          <div
            ref={pdfRef}
            className={`p-6 mt-4 sm:p-8 rounded-xl w-full max-w-4xl relative
  ${isDownloading ? "bg-white text-black" : "bg-gray-900 text-white"}
  ${!isDownloading && "max-h-[90vh] overflow-y-auto"}
`}
          >
            <h2 className={`text-xl sm:text-2xl font-bold mb-6 
    ${isDownloading ? "text-black" : "text-gray-400"}`}>
              Invoice Details
            </h2>

            <h3 className={`${isDownloading ? "text-black" : "text-white"} mb-4`}>
              Client Name: {currentinvoice?.clientName}
            </h3>

            <div
              className="overflow-x-auto rounded-lg"
              style={{
                border: "1px solid #e5e7eb"
              }}
            >
              <table className="text-left w-full min-w-150 border-collapse">
                <thead
                  style={{
                    backgroundColor: isDownloading ? "#f3f4f6" : "#1f2937",
                    color: isDownloading ? "#111827" : "#9ca3af"
                  }}
                  className="text-xs sm:text-sm uppercase tracking-wider"
                >
                  <tr>
                    <th className="p-4">Items</th>
                    <th className="p-4">Description</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Total</th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    style={{
                      backgroundColor: isDownloading ? "#ffffff" : "#111827"
                    }}
                  >
                    <td className={`p-4 text-sm ${isDownloading ? "text-black" : "text-white"}`}>1</td>

                    <td className={`p-4 text-sm ${isDownloading ? "text-black" : "text-white"}`}>
                      {currentinvoice.Service}
                    </td>

                    <td className="p-4 text-sm">
                      <span
                        style={
                          currentinvoice.Status === "Paid"
                            ? {
                              backgroundColor: isDownloading ? "#dcfce7" : "#22c55e1a",
                              color: isDownloading ? "#166534" : "#4ade80"
                            }
                            : {
                              backgroundColor: isDownloading ? "#fef9c3" : "#eab3081a",
                              color: isDownloading ? "#854d0e" : "#facc15"
                            }
                        }
                        className="px-2 py-1 rounded-md text-xs"
                      >
                        {currentinvoice.Status}
                      </span>
                    </td>

                    <td className={`p-4 text-sm ${isDownloading ? "text-black" : "text-white"}`}>
                      ${currentinvoice.Amount}
                    </td>

                    <td className={`p-4 text-sm font-semibold ${isDownloading ? "text-black" : "text-white"}`}>
                      ${currentinvoice.Amount}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div
          ref={invoiceRef}
          className={`p-6 mt-4 sm:p-8 rounded-xl w-full max-w-4xl relative
   "bg-gray-900 text-white"
`}
        >
          <h2 className={`text-xl sm:text-2xl font-bold mb-6 
    "text-gray-400"`}>
            Invoice Details
          </h2>

          <h3 className={`"text-white" mb-4`}>
            Client Name: {currentinvoice?.clientName}
          </h3>

          <div
            className="overflow-x-auto rounded-lg"
            style={{
              border: "1px solid #e5e7eb"
            }}
          >
            <table className="text-left w-full min-w-150 border-collapse">
              <thead
                style={{
                  backgroundColor: "#1f2937",
                  color: "#9ca3af"
                }}
                className="text-xs sm:text-sm uppercase tracking-wider"
              >
                <tr>
                  <th className="p-4">Items</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Total</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  style={{
                    backgroundColor: "#111827"
                  }}
                >
                  <td className={`p-4 text-sm "text-white"`}>1</td>

                  <td className={`p-4 text-sm  "text-white"`}>
                    {currentinvoice.Service}
                  </td>

                  <td className="p-4 text-sm">
                    <span
                      style={
                        currentinvoice.Status === "Paid"
                          ? {
                            backgroundColor: "#22c55e1a",
                            color: "#4ade80"
                          }
                          : {
                            backgroundColor: "#eab3081a",
                            color: "#facc15"
                          }
                      }
                      className="px-2 py-1 rounded-md text-xs"
                    >
                      {currentinvoice.Status}
                    </span>
                  </td>

                  <td className={`p-4 text-sm "text-white"`}>
                    ${currentinvoice.Amount}
                  </td>

                  <td className={`p-4 text-sm font-semibold "text-white"`}>
                    ${currentinvoice.Amount}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button onClick={() => { handleDownloadInvoicePDF() }} className="w-full sm:w-auto bg-indigo-600 transition-all duration-200 ease-in hover:bg-indigo-700 cursor-pointer px-6 py-3 rounded-lg font-medium text-center">
            Download PDF
          </button>

          <button
            onClick={() => (navigator.clipboard.writeText(`${window.location.origin}/invoice/${currentinvoice?._id}`), toast.success("Invoice link copied to clipboard"))}
            className="w-full sm:w-auto border border-gray-700 hover:bg-gray-800 transition-all px-6 py-3 rounded-lg text-center"
          >
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;