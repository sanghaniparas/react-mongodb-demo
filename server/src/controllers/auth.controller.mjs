import HttpStatus from 'http-status-codes'
import jwt from 'jsonwebtoken';
import config from 'config'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import * as userServices from '../services/user.service.mjs'

export const registration = async (req, res) => { 
    const { email, password, login } = req.body
    if(!email || !password || !login){
        return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Email, password and login are required' })  
    }
    const isUserExist = await userServices.findUserByLogin(login)
    try{
    if (isUserExist) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Registration error!!!!' })
    }
    const hash = await bcrypt.hash(password, 10)
    const _id = await new mongoose.Types.ObjectId()
    const user = {
        _id,
        email,
        password: hash,
        login
    }
    const result = await userServices.createUser(user)
    const secret = config.get('secret')
    const token = jwt.sign({id:_id}, secret);
    return res
            .status(HttpStatus.CREATED)
            .json({
                ...result,
                token
            })
        }catch (error) {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: 'Something wrong, please repeat request', error })
        }
}

export const login = async (req, res) => {
    try{
    const {  password, login } = req.body
    if(!password || !login){
        return res.status(HttpStatus.BAD_REQUEST).json({ error: 'Password and login are required' })  
    }
    const user = await  userServices.findUserByLogin(login)
    if(!user){
        return res.status(HttpStatus.BAD_REQUEST).json({
            error: 'Auth failed',
        }) 
    }
    const secret = config.get('secret')
    const token = jwt.sign({id: user._id}, secret);
    const isCorrectPassword = await bcrypt.compare(password, user.password)
    if(!isCorrectPassword){
        return res.status(HttpStatus.BAD_REQUEST).json({
            error: 'Auth failed',
        }) 
    }
    delete user.password
    return res
            .status(HttpStatus.OK)
            .json({
                ...user,
                token,
            })
        }catch (error) {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: 'Something wrong, please repeat request', error })
        }
}