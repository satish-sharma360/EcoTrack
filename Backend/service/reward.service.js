import rewardsModel from "../models/rewards.model.js"

class RewardService {
    async createReward(userId, ponitsToGive) {
        let userReward = await rewardsModel.findOne({ userId: userId })
        if (!userReward) {
            userReward = new rewardsModel({
                userId: userId,
                name: 'My Rewards',
                collectionInfo: 'Points collected',
                points: 0,
                level: 1
            })
        }
        userReward.points = userReward.points + ponitsToGive;
        await userReward.save()
        return userReward;
    }
}
export default new RewardService()