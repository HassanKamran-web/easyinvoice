const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model')

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email, !password) {
            return res.status(400).json({ message: "All fields are requried" })
        }
        const user = await userModel.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "Email is invalid or already in use", success: false })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await userModel.create({ name, email, password: hashPassword })
        res.status(200).json({ message: "User Registered Successfully", success: true })


    } catch (err) {
        res.status(500).json({ message: "Error registering user", error: err.message, success: false })

    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are requried" })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" })
        }

        const checkedPassword = await bcrypt.compare(password, user?.password)

        if (!checkedPassword) {
            res.status(400).json({ message: "Invalid email or password" })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: "User Login Successfully", token })


    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

const getUserProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.userId).select('-password').lean();
        if (!user) {
            return res.status(404).json({ message: 'Something went wrong' });
        }
        res.status(200).json({
            user: {
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        res.status(500).json({ message: 'Error fetching user profile', error: err.message });
    }
}


module.exports = { registerUser, loginUser, getUserProfile }