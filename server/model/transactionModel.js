import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    date:{type:Date , default:Date.now},
    description:{type:String,required:true},
    type:{type:String,enum:["Credit","Debit"],required:true},
    amount:{type:Number,required:true},
    balance:{type:Number,required:true}
},{timestamps:true})

const TransactionModel = mongoose.model("Transaction",transactionSchema);

export default TransactionModel;