const InvoiceModel = require('../models/invoice.model');
const createInvoice = async (req, res) => {
    try {
        const { clientinfo, service, amount, status } = req.body;

        const newInvoice = await InvoiceModel.create({
            clientName: clientinfo,
            Service: service,
            Amount: amount,
            Status: status || "Unpaid",
            userId: req.user.userId
        });

        res.status(201).json({ message: "Invoice created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getInvoices = async (req, res) => {
    try {
        const invoices = await InvoiceModel.find({ userId: req.user.userId }).lean();
        res.status(200).json({ invoices });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getInvoiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await InvoiceModel.findById(id).lean();
        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateInvoice = async (req, res) => {
    try {
        const { clientinfo, service, amount, status, id } = req.body;

        const updatedInvoice = await InvoiceModel.findByIdAndUpdate(id, {
            clientName: clientinfo,
            Service: service,
            Amount: amount,
            Status: status
        });

        if (!updatedInvoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }

        res.status(200).json({ message: "Invoice updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;


        const deletedInvoice = await InvoiceModel.findByIdAndDelete(id);

        if (!deletedInvoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }

        res.status(200).json({ message: "Invoice deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createInvoice,
    getInvoices,
    updateInvoice,
    deleteInvoice,
    getInvoiceById
}