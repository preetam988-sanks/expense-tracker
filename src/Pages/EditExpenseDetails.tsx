import React, {useEffect, useRef, useState} from 'react'
import {Link, useNavigate, useParams} from "react-router-dom";
import {useExpenses} from "../Context/ExpenseContext.tsx";
import {Button} from "../Components/UI/Button.tsx";
import {TextField} from "../Components/UI/TextField.tsx";
import {Select} from "../Components/UI/Select.tsx";

const EditExpenseDetails = () => {
    const{id}=useParams<{id:string}>();
    const navigate=useNavigate();
    const{expenses,updateExpense}=useExpenses();
    const existingExpense=expenses.find((expense)=>expense.id===id);
    const [category, setCategory] = useState(existingExpense?.category || 'Food');
    const[description,setDescription]=useState(existingExpense?.description||"");
    const[amount,setAmount]=useState(existingExpense?.amount.toString()||'');
    const[date,setDate]=useState(existingExpense?.date||'');
    const[error,setError]=useState('');
    const amountRef=useRef<HTMLInputElement>(null);
    useEffect(()=>{
        if(amountRef.current){
            amountRef.current.focus();
        }
    },[]);
    if (!existingExpense) {
        return (
            <div className="text-center py-20 bg-white/5 rounded-xl border border-white/10 mt-10 max-w-lg mx-auto backdrop-blur-md">
                <h2 className="text-4xl font-bold text-white mb-4">404</h2>
                <p className="text-gray-300 mb-6 text-lg"> That expense doesn't exist.</p>
                <Link to="/" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-md transition-colors">
                    Back to Dashboard
                </Link>
            </div>
        );
    }
    const handleSubmit=(e)=>{
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
        updateExpense(id!,{
            description,
                amount:parsedAmount,
                category,
                date
        });
      navigate('/');
    };
    return (
        <section>
            <div className="bg-blue-300 rounded-md shadow-md border border-grey-700 max-w-lg mx-auto mt-1">
                <h2 className="text-2xl font-bold text-white mb-4 text-center">Edit Expense</h2>
                {error && <p className="text-red-500 text-lg mb-2 w-full text-center">{error}</p>}
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <section className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-white/20 max-w-lg mx-auto mt-10 w-full">
                    <div>
                        <label className="text-lg font-medium text-white">Amount (₹)</label>
                        <input
                            type="number"
                            ref={amountRef}
                            value={Number(amount) < 0 ? 0 : amount}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (Number(value) >= 0 && Number(value) < 100000000000) {
                                    setAmount(value);
                                }
                            }}
                            placeholder="Enter amount"
                            className="border border-gray-300 text-black rounded-md px-3 w-full py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mt-3 mb-3">
                        <TextField
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Food, Rent"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-2 mb-3">
                        <Select
                            label="Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            options={[
                                { value: 'Food', label: "Food" },
                                { value: "Transport", label: "Transport" },
                                { value: "Entertainment", label: "Entertainment" },
                                { value: "Shopping", label: "Shopping" },
                                { value: "Other", label: "Other" },
                            ]}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-white mt-3 block">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="border border-gray-300 text-black rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full mb-2 mt-1"
                        />
                    </div>

                    <div className="flex gap-4 mt-4">
                        <Button type="button" variant='danger' onClick={() => navigate('/')} className="w-full">
                            Cancel
                        </Button>
                        <Button type="submit" variant='primary' className="w-full">
                            Save Changes
                        </Button>
                    </div>
                </section>
            </form>
        </section>
        )
}
export default EditExpenseDetails
