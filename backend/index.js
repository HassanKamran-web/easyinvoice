const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT || 3000
const connectDB = require('./config/db')
connectDB()
const userRoutes = require('./routes/user.route')
const invoiceRoutes = require('./routes/invoice.route')
const compression = require('compression');

app.use(compression());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,

}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/user', userRoutes)
app.use('/api/invoice', invoiceRoutes)
app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(PORT, () => {
    console.log(`PORT is running on ${PORT}`)
})

module.exports = app;