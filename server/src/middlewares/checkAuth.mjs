import HttpStatus from 'http-status-codes'
import jwt from 'jsonwebtoken';
import config from 'config'

export const checkAuth= (req, res, next) => {
    try {
        const token = req.headers.authorization
        const secret = config.get('secret')
        jwt.verify(token,config.secret);
        const { id } = jwt.verify(token,config.secret);
        req.body.userId = id
        next()
    } catch (error) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: 'CheckAuth failed' })
    }
}