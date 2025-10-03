import jwt from 'jsonwebtoken'
import configration from '../config/env.congi.js'

class TokenService{
    constructor(){
        this.accessExpiry = '15m'
        this.refreshExpiry = '7d'
    }

    async generateAccessToken(payload){
        return jwt.sign(payload,configration.accessSecret,{
            expiresIn:this.accessExpiry
        })
    }

    async generateRefreshToken(payload){
        return jwt.sign(payload,configration.refreshSecret,{
            expiresIn:this.refreshExpiry
        })
    }

    async verifyAccessToken(token){
        try {
            return jwt.verify(token ,configration.accessSecret)
        } catch (error) {
            console.log(error)
        }
    }

    async verifyRefreshToken(token){
        try {
            return jwt.verify(token ,configration.refreshSecret)
        } catch (error) {
            console.log(error)
        }
    }

    // Regenerate new Access Token using Refresh Token

    async refreshAccessToken(refreshToken){
        try {
            const decoded = await jwt.verify(refreshToken , configration.refreshSecret)
            const { id, email } = decoded;
            const newAccessToken = await this.generateAccessToken({ id, email })
            return { success: true, accessToken: newAccessToken };
        } catch (error) {
            return { success: false, message: "Invalid refresh token" };
        }
    }
}
export default new TokenService()