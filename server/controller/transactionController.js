import TransactionModel from "../model/transactionModel.js"



export async function addTransaction(req, res) {
  try {
    const { description, type, amount } = req.body;

    // Validate required fields
    if (!description || !type || !amount) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Ensure `amount` is a positive number
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ error: "Invalid amount!" });
    }

    // Get the latest transaction to calculate the current balance
    const latestTransaction = await TransactionModel.findOne().sort({ date: -1 });
    const currentBalance = latestTransaction ? latestTransaction.balance : 0;

    // Calculate the new balance based on transaction type
    let newBalance;
    if (type === "Credit") {
      newBalance = currentBalance + parsedAmount;
    } else if (type === "Debit") {
      if (currentBalance < parsedAmount) {
        return res.status(400).json({ error: "Insufficient balance!" });
      }
      newBalance = currentBalance - parsedAmount;
    } else {
      return res.status(400).json({ error: "Invalid transaction type! Use 'Credit' or 'Debit'." });
    }

    // Create a new transaction
    const transaction = new TransactionModel({
      description,
      type,
      amount: parsedAmount,
      balance: newBalance,
    });

    // Save the transaction
    const result = await transaction.save();

    // Send a success response
    res.status(200).json({
      message: "Transaction added successfully!",
      transaction: result,
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error adding transaction:", error);

    // Send an internal server error response
    res.status(500).json({ error: "An error occurred while adding the transaction." });
  }
}


export async function getTRansactions(req,res){
  const transactions = await TransactionModel.find().sort({date:-1});
  res.json(transactions);
}


