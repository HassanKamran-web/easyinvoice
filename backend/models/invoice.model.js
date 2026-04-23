const mongoose = require('mongoose')

const InvoiceSchema = mongoose.Schema({
    clientName: {
        type: String,
        required: true
    },
    Service: {
        type: String,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    Status:{
        type: String,
        enum: ["Paid", "Unpaid"],
        default: "Unpaid"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Invoice = mongoose.model("Invoice", InvoiceSchema)

module.exports = Invoice