import tokenService from "../service/token.service.js";
import userService from "../service/user.service.js";

class AuthController {
    async signup(req, res) {
        const { name, email, password } = req.body;
        try {
            if (!name || !email || !password) {
                return res.status(400).json({ success: false, message: "All fields required" })
            }
            const user = await userService.createUser({ name, email, password })

            //  token generate
            const accessToken = await tokenService.generateAccessToken({ id: user._id, email: user.email })
            const refreshToken = await tokenService.generateRefreshToken({ id: user._id, email: user.email })

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7,
            })
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7,
            })

            res.status(200).json({ user, accessToken, refreshToken })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
    async login(req, res) {
        const { email, password } = req.body;
        if (!password || !email) {
            return res.status(400).json({ success: false, message: 'Email and Password required' })
        }
        try {
            const user = await userService.login(email, password)
            const accessToken = await tokenService.generateAccessToken({ id: user._id, email: user.email })
            const refreshToken = await tokenService.generateRefreshToken({ id: user._id, email: user.email })
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7,
            })
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7,
            })

            res.status(200).json({ success: true, message: 'user Login successfully', user, accessToken: accessToken, refreshToken: refreshToken })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }

    async logout(req, res) {
        res.clearCookie('refreshToken', {
            httpOnly: true,
        })
        res.clearCookie('accessToken')
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    }

    async refreshToken(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken || req.body.refreshToken
            if (!refreshToken) {
                return res.status(400).json({ success: false, message: 'Refresh token missing' });
            }

            const result = await tokenService.refreshAccessToken(refreshToken)
            if (!result.success) {
                return res.status(401).json({ success: false, message: result.message });
            }

            res.cookie('accessToken', result.accessToken, {
                httpOnly: true,
                maxAge: 1000 * 60 * 15,
            });

            return res.status(200).json({ success: true, accessToken: result.accessToken });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Server error' });
        }
    }
}

export default new AuthController()