import transationModel from "../models/transation.model.js"

class TransactionService{
    async transactionCreate(userId,pointToGive){
        const newtransaction = new transationModel({
            userId:userId,
            type:'earned',
            amount:pointToGive,
            description:'Points earned for reporting waste'
        })

        await newtransaction.save();
        return newtransaction;
    }
}
export default new TransactionService()