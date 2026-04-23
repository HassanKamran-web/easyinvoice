const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router()
const { createInvoice, getInvoices, updateInvoice, deleteInvoice, getInvoiceById } = require('../controllers/invoice.controller')

router.post('/create', authMiddleware, createInvoice)
router.get('/get', authMiddleware, getInvoices)
router.get('/get/:id', getInvoiceById)
router.put('/update', authMiddleware, updateInvoice)
router.delete('/delete/:id', authMiddleware, deleteInvoice)

module.exports = router