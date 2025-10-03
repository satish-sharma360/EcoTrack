import reportService from "../service/report.service.js";

class ReportController {
    async createReport(req, res) {
        const { location, wasteType, amount, imageUrl } = req.body;
        const userId = req.user.id
        if (!location || !wasteType || !amount || !imageUrl) {
            return res.json({ success: false, message: 'All fealds required' })
        }

        try {
            const savedReport = await reportService.createRepoart(location, wasteType, amount, imageUrl, userId)
            res.status(201).json({
                success: true,
                message: 'Report created successfully! You earned 10 points',
                report: savedReport
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
                error: error.message
            });
        }
    }
}
export default new ReportController()