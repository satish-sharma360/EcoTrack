import reportModel from "../models/report.model.js"
import notificationService from "./notification.service.js";
import rewardService from "./reward.service.js";
import transactionService from "./transaction.service.js";

class ReportService {

    async createRepoart(location, wasteType, amount, imageUrl, userId) {

        // save Report in DB
        const newReport = new reportModel({
            userId: userId,
            location: location,
            wasteType: wasteType,
            amount: amount,
            imageUrl: imageUrl? imageUrl : "",
            status: 'Pending'
        })
        const saveReport = await newReport.save();
        // give user 10 points for reporting
        const pointToGive = 10;

        // find user's Reward or create if does not
        await rewardService.createReward(userId , pointToGive)

        // create transaction Record
        await transactionService.transactionCreate(userId , pointToGive)

        // Create notification
        await notificationService.createNotification(userId,pointToGive)
        return saveReport
    }
}
export default new ReportService()