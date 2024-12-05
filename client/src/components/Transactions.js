import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Transactions() {

    const[transactions,setTransactions] = useState([]);
    const[formData,setFormData]=useState({
        description:"",
        type:"Credit",
        amount:""
    })
    const[error,setError] = useState("")

    useEffect(()=>{
        fetchTransactions()
    },[transactions])

    const fetchTransactions = async()=>{
        const res = await axios.get("http://localhost:8085/api/transactions");
        // console.log("data",res?.data)
        
        setTransactions(res.data);
        // console.log(transactions)
    }

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        setError("")

        try{
            const res = await axios.post('http://localhost:8085/api/addtransaction',{
                ...formData,
                amount:parseFloat(formData.amount)
            });
            console.log("res",res)
            setTransactions([res.data,...transactions])
            setFormData({description:"",type:"Credit",amount:""})
        }
        catch(err){
            setError(err.response.data.error)
        }
    }

  return (
    <div style={{padding:'20px',margin:'auto'}}>
        <h1>Bank</h1>

        <form style={{marginBottom:'20px',display:'flex',flexDirection:'column',padding:'10px'}} onSubmit={handleSubmit}>
            <input
                type='text'
                name='description'
                placeholder='Description'
                value={formData.description}
                onChange={handleChange}
                required
                style={{marginBottom:'10px',padding:'15px'}}
            />
            <select
                value={formData.type}
                onChange={handleChange}
                name='type'
                style={{marginBottom:'10px',padding:'15px'}}
            >
                <option value="Credit">Credit</option>
                <option value="Debit">Debit</option>
            </select>
            <input
                type='number'
                placeholder='amount'
                name='amount'
                value={formData.amount}
                onChange={handleChange}
                required
                style={{marginBottom:'10px',padding:'15px'}}
            />
            <button type='submit'>Add transaction</button>
        </form>
        {error && <p style={{color:"red"}}>{error}</p>}

        <table border="1" cellPadding="10" cellSpacing="0" width="100%">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Balance</th>
                </tr>
            </thead>
            <tbody>
                {
                    transactions?.map((txn)=>{
                        return(
                            <>
                                <tr key={txn._id}>  
                                <td>{txn.date ? new Date(txn.date).toLocaleDateString() : 'N/A'}</td>

                                <td>{txn.description}</td>
                                <td>{txn.type}</td>
                                <td>{txn.amount}</td>
                                <td>{txn.balance}</td>
                                </tr>
                            </>
                        )
                        
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default Transactions