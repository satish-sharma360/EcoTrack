import bcrypt from 'bcrypt'

class AuthService {
    constructor() {
        this.saltRounds = 10
    }

    async hashPassword(password){
        return await bcrypt.hash(password , this.saltRounds)
    }
    async comparePassword(password ,hashedPassword){
        return await bcrypt.compare(password , hashedPassword)
    }
}

export default new AuthService()