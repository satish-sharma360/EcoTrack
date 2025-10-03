import express from "express";
import reportController from "../controller/report.controller.js";
import authMiddlaware from "../middleware/auth.middlaware.js";

const reportRoutes = express.Router()

reportRoutes.post('/create-report', authMiddlaware.authMiddleware , reportController.createReport)

export default reportRoutes