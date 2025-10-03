import notificationModel from "../models/notification.model.js"

class NotificationService{
    async createNotification(userId ,pointToGive){
        const newNotification = new notificationModel({
            userId:userId,
            message:`You earned ${pointToGive} ponits for reporting waste!`,
            type:'reward'
        })
        await newNotification.save()
        return newNotification
    }
}
export default new NotificationService()