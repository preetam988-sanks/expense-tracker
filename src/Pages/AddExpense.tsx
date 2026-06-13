import React, {useEffect, useRef, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {useExpenses} from "../Context/ExpenseContext.tsx";
import {TextField} from "../Components/UI/TextField.tsx";
import {Select} from "../Components/UI/Select.tsx";
import {Button} from "../Components/UI/Button.tsx";

const AddExpense = () => {

    const navigate=useNavigate();
    const{addExpense}=useExpenses();
    const[description,setDescription]=useState("");
    const[amount,setAmount]=useState('');
    const[category,setCategory]=useState('');
    const[date,setDate]=useState(new Date().toISOString().split('T')[0]);
    const[error,setError]=useState('');
    const amountRef=useRef<HTMLInputElement>(null);
        useEffect(()=>{
           if(amountRef.current){
               amountRef.current.focus();
           }
         },[])

    const handleSubmit=(e:React.FormEvent)=>{
            e.preventDefault();
            if(description.trim()===''){
                setError("Description is required");
                return;
            }
            const parsedAmount=parseFloat(amount);
            if(isNaN(parsedAmount)||parsedAmount<=0){
                setError("Amount must be a positive number");
                amountRef.current?.focus();
                return;
            }
            addExpense({description,amount:parsedAmount,category,date});
            navigate('/');
    }
    return (
        <div >
            <div className="bg-blue-300  rounded-md shadow-md border border-grey-700
         max-w-lg mx-auto mt-1
        ">
                <h2 className="text-2xl font-bold text-white mb-4 text-center">Add Expenses</h2>
                {
                    error && <p className="text-red-500 text-lg mb-2 w-full">{error}</p>
                }
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <section className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-white/20 max-w-lg mx-auto mt-10 w-3xl"
            >
                <div>
                <label className="tx-lg font-large text-white "><h1>Amount(₹)</h1></label>
                <input
                type="number"
                ref={amountRef}
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
                placeholder="Enter amount"
                className="border border-gray-300 rounded-md px-3 w-full py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>
                <div className="mt-3 mb-3">
                <TextField className="white text-white" label="Description" value={description} onChange={(e)=>setDescription(e.target.value)
                }
                 placeholder="Food, Rent "
                />
                    </div>

                <div className="grid grid-cols-2 gap-4 mt-2 mb-3">
                  <Select
                      label="Category"
                      value={category}
                      className="text-white"
                      onChange={(e)=>setCategory(e.target.value)}
                      options={[
                          {value:"Food",label:"Food"},
                          {value:"Transport",label:"Transport"},
                          {value:"Entertainment",label:"Entertainment"},
                          {value:"Shopping",label:"Shopping"},
                          {value:"Other",label:"Other"},
                      ]}
                  />
                </div>
                <div>
                    <label className="text-sm
                    font-medium text-white mt-3">Date</label>
                    <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500
                    w-full mb-2 mt-3"/>
                </div>
                <Button type="button" variant='danger' onClick={()=>navigate('/')}>
                    Cancel
                </Button>
                <Button type="submit" variant='primary'>
                    Add Expense
                </Button>
            </section>
            </form>
        </div>
    )
}
export default AddExpense
