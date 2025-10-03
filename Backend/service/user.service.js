import userModel from "../models/user.model.js";
import authService from "./auth.service.js";
import tokenService from "./token.service.js";

class UserService {
    async createUser({ name, email, password }) {
        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            throw new Error('User already exists')
        }

        const hashedPassword = await authService.hashPassword(password)

        const user = await userModel.create({ name, email, password: hashedPassword,image:`https://api.dicebear.com/5.x/initials/svg?seed=${name}` })

        return user;
    }

    async getUserByEmail(email) {
        return await userModel.findOne({ email })
    }
    async login(email, password) {
        const user = await this.getUserByEmail(email)
        if (!user) {
            throw new Error('User not found')
        }
        const ismatch = await authService.comparePassword(password, user.password)
        if (!ismatch) {
            throw new Error('Invalid credentials')
        }
        return user

    }
    async getUserById(userId) {
        return await userModel.findById(userId)
    }

    async getUserByIdFromToken(token){
        try {
            if (!token) {
                return null
            }
            const decoded = await tokenService.verifyAccessToken(token)
            if (!decoded) {
                return null
            }

            const user = await this.getUserById(decoded.id);

            return user || null
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
export default new UserService()