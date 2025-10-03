import userService from "../service/user.service.js"

class AuthMiddlaware {
    async authMiddleware(req, res, next) {
        try {
            const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1]
            if (!token) {
                return res
                    .status(401)
                    .json({ success: false, message: "Access token missing" });
            }
            const user = await userService.getUserByIdFromToken(token)
            if (!user) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
            req.user = user;
            next()
        } catch (error) {
            console.error("Auth error:", error.message);
            return res
                .status(401)
                .json({ success: false, message: "Unauthorized" });

        }
    }
}
export default new AuthMiddlaware()