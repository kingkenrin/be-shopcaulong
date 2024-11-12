const shopModel = require('../models/shop.model')
const getData = require('../utils/formatRes')
const _ = require('lodash');

class ShopService {
    static getShop = async () => {
        try {
            const shop = await shopModel.findOne({})

            return getData({ fields: ['banner', 'logo', 'about', 'address', 'email', 'hotline', 'phone'], object: shop })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }

    static updateShop = async (files, { about, address, email, hotline, phone, }) => {
        try {
            const shop = await shopModel.findOne({})

            if (!shop) {
                let bannerImg = []
                let logoImg = undefined

                files.forEach((file) => {
                    if (file.originalname.includes("banner"))
                        bannerImg.push(file.path)
                    else if (file.originalname.includes("logo")) {
                        logoImg = file.path
                    }
                })

                const newShop = new shopModel({
                    banner: bannerImg,
                    logo: logoImg,
                    about,
                    address,
                    email,
                    hotline,
                    phone
                })

                await newShop.save()

                return getData({ fields: ['banner', 'logo', 'about', 'address', 'email', 'hotline', 'phone'], object: newShop })
            }

            if (files.length != 0) {
                files.forEach((file) => {
                    if (file.originalname.includes("banner"))
                        shop.banner.push(file.path)
                    else if (file.originalname.includes("logo")) {
                        shop.logo = file.path
                    }
                })
            }

            if (about)
                shop.about = about

            if (address)
                shop.address = address

            if (email)
                shop.email = email

            if (hotline)
                shop.hotline = hotline

            if (phone)
                shop.phone = phone

            const savedShop = await shop.save()

            return getData({ fields: ['banner', 'logo', 'about', 'address', 'email', 'hotline', 'phone'], object: savedShop })
        } catch (error) {
            return {
                success: false,
                message: error.message
            }
        }
    }
}

module.exports = ShopService;