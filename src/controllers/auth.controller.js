const { FaFileDownload } = require("react-icons/fa");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

//user register controller
// POST /api/auth/register
async function userRegisterController(req, res) {
    const { name, email, password } = req.body;
    const isExist = await userModel.findOne({ email: email })
    if (isExist) {
        return res.status(422).json(
            {
                message: "User already exists",
                status: "Failed"
            })
    }
    const user = await userModel.create({ name, email, password })
    // token ko hame cookies me set karna hoga for that we need to install cookie-parser package
    // npm install cookie-parser


    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.cookie("token", token)
    return res.status(201).json(
        {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt

            }, token
        }

    )

}
//login controller
async function userLoginController(req, res) {
    const { email, password } = req.body
    const user = await userModel.findOne({ email: email })
    if (!user) {
        return res.status(401).json(
            {
                message: "Email or Password is invalid",
                status: "Failed"
            }
        )
    }
    const isValidPassword = await userModel.comparePassword(password, user.password)
    if (!isValidPassword) {
        return res.status(401).json(
            {
                message: "Email or Password is invalid",
                status: "Failed"
            }
        )
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.cookie("token", token)
    return res.status(200).json(
        {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }, token
        }
    )


}

module.exports = {
    userRegisterController,
    userLoginController
}


