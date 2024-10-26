const bcrypt = require("bcrypt");
const userModel = require('../models/user.model')
const forgetPasswordModel = require('../models/forgetPassword.model')

const getData = require('../utils/formatRes')
const _ = require('lodash');
const nodemailer = require("nodemailer")

class AccessService {
    static signUp = async ({ username, password, role }) => {
        try {
            const user = await userModel.findOne({ username: username })

            if (user) {
                return {
                    success: false,
                    message: "username has been used"
                }
            }

            const hash = bcrypt.hashSync(password, 10)

            const newAccount = new userModel({
                "username": username,
                "password": hash,
                "role": role
            })

            await newAccount.save()

            return {
                success: true,
                message: "create account successfully"
            }

        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static login = async ({ username, password }) => {
        try {
            const user = await userModel.findOne({ username: username })

            if (!user) {
                return {
                    success: false,
                    message: "wrong username"
                }
            }

            const check = await bcrypt.compare(password, user.password)

            if (!check) {
                return {
                    success: false,
                    message: "wrong password"
                }
            }

            return {
                success: true,
                message: "login successfully",
                id: user.id
            }

        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static forgotPassword = async ({ email }) => {
        try {
            const user = await userModel.findOne({ email: email })

            if (!user) {
                return {
                    success: false,
                    message: "wrong email"
                }
            }

            const code = JSON.stringify(Math.floor(Math.random() * 9000 + 1000))

            const forgotPassword = await forgetPasswordModel.findOne({ email: email })

            if (forgotPassword) {
                await forgetPasswordModel.findOneAndDelete({ email: email })

                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                        user: "shopcaulonguit@gmail.com",
                        pass: "znpf vyru qrdo xvhv",
                    },
                    from: "shopcaulonguit@gmail.com"
                });

                let info = await transporter.sendMail({
                    from: 'shopcaulonguit@gmail.com',
                    to: `${email}`,
                    subject: "Mã xác nhận",
                    html: `
                    Chào ${user.username},<br>

Để hoàn tất quy trình, vui lòng nhập mã xác nhận dưới đây:<br>

<h1>Mã xác nhận của bạn là: ${code}</h1>

Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này hoặc liên hệ với chúng tôi để được hỗ trợ.
<br>
Trân trọng,<br>
Shop Cầu lông uit                    
`,
                })

                const newForgetPassword = new forgetPasswordModel({
                    "email": email,
                    "code": code,
                })

                await newForgetPassword.save()

                return {
                    success: true,
                    message: "confirmation code sent"
                }
            }
            else {
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                        user: "shopcaulonguit@gmail.com",
                        pass: "znpf vyru qrdo xvhv",
                    },
                    from: "shopcaulonguit@gmail.com"
                });

                let info = await transporter.sendMail({
                    from: 'shopcaulonguit@gmail.com',
                    to: `${email}`,
                    subject: "Mã xác nhận",
                    html: `
                    Chào ${user.username},<br>

Để hoàn tất quy trình, vui lòng nhập mã xác nhận dưới đây:<br>

<h1>Mã xác nhận của bạn là: ${code}</h1>

Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này hoặc liên hệ với chúng tôi để được hỗ trợ.
<br>
Trân trọng,<br>
Shop Cầu lông uit                    
`,
                })

                const newforgetPassword = new forgetPasswordModel({
                    "email": email,
                    "code": code,
                })

                await newforgetPassword.save()

                return {
                    success: true,
                    message: "confirmation code sent",
                }
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static confirmCode = async ({ email, code, newPassword }) => {
        try {
            const forgetPassword = await forgetPasswordModel.findOne({ email: email })
            const user = await userModel.findOne({ email: email })

            if (!forgetPassword) {
                return {
                    success: false,
                    message: "wrong email"
                }
            }

            if (forgetPassword.code == code) {
                const forgetPassword = await forgetPasswordModel.findOneAndDelete({ email: email })

                // let transporter = nodemailer.createTransport({
                //     host: "smtp.gmail.com",
                //     port: 465,
                //     secure: true,
                //     auth: {
                //         user: "shopcaulonguit@gmail.com",
                //         pass: "znpf vyru qrdo xvhv",
                //     },
                //     from: "shopcaulonguit@gmail.com"
                // });

                // let info = await transporter.sendMail({
                //     from: 'shopcaulonguit@gmail.com',
                //     to: `${email}`,
                //     subject: "Xác nhận thành công",
                //     html: `
                //     <h1>Tài khoản của bạn là: ${user.Username}</h1>
                //     <h1>Mật khẩu của bạn là: ${user.password}</h1> 
                //     `,
                // })

                const hash = bcrypt.hashSync(newPassword, 10)
                user.password = hash

                await user.save()

                return {
                    success: true,
                    message: "Change password successfully",
                }
            }

            return {
                success: false,
                message: "wrong code",
            }

        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }
}

module.exports = AccessService;