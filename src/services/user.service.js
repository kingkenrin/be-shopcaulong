const bcrypt = require("bcrypt");
const userModel = require('../models/user.model')
const getData = require('../utils/formatRes')
const _ = require('lodash');

class UserService {
    static getAlluser = async () => {
        try {
            const users = await userModel.find({})

            return users.map(user =>
                getData({ fields: ["avatar", "name", "phone", "email", "address", "birthday", "role", "discount",], object: user })
            )

        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static getUserById = async ({ id }) => {
        try {
            const user = await userModel.findById(id)

            if (!user) {
                return {
                    success: false,
                    message: "wrong user"
                }
            }

            return getData({ fields: ['_id', "avatar", "name", "phone", "email", "address", "birthday", "role", "discount",], object: user })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static addUser = async (file, { username, password, name, phone, email, address, birthday, role, discount }) => {
        try {
            let birthdayTemp = undefined
            if (birthday) {
                const time = birthday.split('/')
                birthdayTemp = new Date(time[2], time[1] - 1, time[0])
            }

            const user = await userModel.findOne({ username: username })
            const emailExist = await userModel.findOne({ email: email })

            if (user) {
                return {
                    success: false,
                    message: "username exists"
                }
            }

            if (emailExist) {
                return {
                    success: false,
                    message: "email exists"
                }
            }

            const hash = bcrypt.hashSync(password, 10)

            const newuser = new userModel({
                "username": username,
                "password": hash,
                "avatar": file ? file.path : undefined,
                "birthday": birthdayTemp,
                "name": name,
                "phone": phone,
                "email": email,
                "address": address,
                "role": role,
                "discount": discount
            })

            const saveduser = await newuser.save()

            return getData({ fields: ['_id', "avatar", "name", "phone", "email", "address", "birthday", "role", "discount",], object: saveduser })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static updateUser = async (file, { id, oldPassword, newPassword, name, phone, email, address, birthday, role, discount }) => {
        try {
            const user = await userModel.findById(id)

            const emailExist = await userModel.findOne({ email: email })

            if (emailExist && user.email != email) {
                return {
                    success: false,
                    message: "email exists"
                }
            }

            if (!user) {
                return {
                    success: false,
                    message: "wrong user"
                }
            }

            const check = await bcrypt.compare(oldPassword, user.password)

            if (oldPassword && newPassword) {
                if (!check) {
                    return {
                        success: false,
                        message: "wrong old password"
                    }
                }
                else {
                    const hash = bcrypt.hashSync(newPassword, 10)
                    user.password = hash
                }
            }

            if (name)
                user.name = name

            if (phone)
                user.phone = phone

            if (address)
                user.address = address

            if (role)
                user.role = role

            if (discount)
                user.discount = discount

            if (file)
                user.avatar = file.path

            if (birthday) {
                const time = birthday.split('/')
                const birthdayTemp = new Date(time[2], time[1] - 1, time[0])
                user.birthday = birthdayTemp
            }

            const saveduser = await user.save()

            return getData({ fields: ['_id', "avatar", "name", "phone", "email", "address", "birthday", "role", "discount",], object: saveduser })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static deleteUser = async ({ id }) => {
        try {
            const user = await userModel.findByIdAndDelete(id)

            if (!user) {
                return {
                    success: false,
                    message: "wrong user"
                }
            }

            return {
                success: true,
                message: "delete successfully"
            }
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }
}

module.exports = UserService;