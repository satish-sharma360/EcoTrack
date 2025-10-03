import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import configration from './config/env.congi.js'
import connectDb from './utils/database.js'
import authRouter from './routes/auth.routes.js'
import reportRoutes from './routes/report.routes.js'

const app = express()


const SERVERPORT = configration.Port
app.use(cors({
  origin: "http://localhost:5173",  // your frontend URL
  credentials: true                 // allow cookies
}));
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth',authRouter)
app.use('/api/report',reportRoutes)

app.get("/", (req, res) => {
    res.send("API is working 🚀");
});
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

(async (req, res) => {
    try {
        await connectDb()

        app.listen(SERVERPORT, () => {
            console.log(`Server is listening on port ${SERVERPORT}...`)
        })
    } catch (error) {
        console.error('Failed to start server due to a database connection error.');
    }
})()