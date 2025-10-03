import 'dotenv/config'

const configration = {
    Port : process.env.PORT,
    DB_URL:process.env.MONGODB_URL,
    accessSecret:process.env.ACCESS_TOKEN_SECRET,
    refreshSecret :process.env.REFRESH_TOKEN_SECRET,
}

export default configration