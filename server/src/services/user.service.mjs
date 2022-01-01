import UserModel from '../models/User.mjs'

export const findUserByLogin = async (login) => {
    try {
        const user = await UserModel.findOne({ login }).exec()
        return user?.toObject()
    } catch (error) {
        console.log('Error findUserByLogin', error)
        throw new Error('Something wrong, please repeat request')
    }
}

export const createUser = async (user) => {
    try {
        const newUser = new UserModel(user)
        const result = await newUser.save()

        console.log('createUser', result)
        return { message: 'User was create successful' }

    } catch (error) {
        console.log('createUser', error)
        throw new Error(error.message)
    }
}