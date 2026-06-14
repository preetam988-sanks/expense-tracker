import React from 'react'
import type {Expense} from "../Context/ExpenseContext.tsx";
import {Link} from "react-router-dom";
import {Button} from "./UI/Button.tsx";
interface ExpenseItemProps {
    expense:Expense
    onDelete:()=>void;
}
const ExpenseItem = ({expense,onDelete}:ExpenseItemProps) => {
    return (
        <section className='bg-white/5 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-white/20

        '>
            <div className='flex flex-col '>
                <span className="text-lg font-bold text-white">{expense.description}</span>
                <span className="text-lg font-bold text-white">{expense.category}</span>
            </div>
            <div className='flex justify-between items-center mt-4 gap-4' >
                <span className='text-xl font-bold text-white'>{expense.amount.toFixed(2)}</span>
                <div>
                    <Link to={`/expense/${expense.id}`
                    } className='px-3 py-1.5 hover:bg-gray-600 rounded-md text-white text-sm
                    text-semibold transition-colors cursor-pointer
                    '>
                     Edit
                    </Link>
                    <Button variant='danger' onClick={()=>onDelete(expense.id)}
                    className="!py-1.5 !text-sm"
                    >
                        Delete
                    </Button>
                </div>
            </div>

        </section>
    )
}
export default ExpenseItem
