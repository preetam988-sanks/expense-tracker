import React, {useMemo, useState} from 'react'
import {Button} from "../Components/UI/Button.tsx";
import {useExpenses} from "../Context/ExpenseContext.tsx";
import {Select} from "../Components/UI/Select.tsx";
import {Link} from "react-router-dom";
import ExpenseItem from "../Components/ExpenseItem.tsx";



const Dashboard = () => {
    const {expenses, addExpense,deleteExpense,updateExpense} = useExpenses();
    const [filter, setFilter] = useState("all");
    const filteredAndSortedExpenses = useMemo(() => {
        const filtered = filter === "all" ? expenses :
            expenses.filter((expense) => expense.category === filter);
        return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    }, [expenses, filter])
    const totalAmount = useMemo(
        () => {
            return filteredAndSortedExpenses.reduce(
                (sum, expenses) => {
                    sum = sum + expenses.amount;
                    return sum;
                }, 0)
        }, [filteredAndSortedExpenses])
    const categoryBreakDown = useMemo(() => {
        const breakDown: Record<string, number> = {};
        filteredAndSortedExpenses.forEach(expense => {
            if (!breakDown[expense.category]) {
                breakDown[expense.category] = 0;
            }
            breakDown[expense.category] += expense.amount;
        });
        return breakDown;
    }, [filteredAndSortedExpenses])
    const filteredOption = [
        {value: "all", label: "All"},
        {value: "Food", label: "Food"},
        {value: "Transport", label: "Transport"},
        {value: "Entertainment", label: "Entertainment"},
        {value: "Shopping", label: "Shopping"},
        {value: "Other", label: "Other"},
    ]
    return (
        <section>
            {/*<Button onClick={()=>console.log("DashBoard is here ")} variant='danger'>Dashboard</Button>*/}
            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-md p-6
               rounded-xl shadow-lg border border-white/20">
                        <h3 className='text-white text-sm font-medium uppercase tracking-wider
                   '>
                            TotalExpense
                        </h3>
                        <p className='text-lg font-bold text-black mt-2'>
                            {totalAmount}
                            {console.log(totalAmount+"thi is the amount")}
                        </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20">
                        <h3 className="text-gray-300 text-sm font-medium uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
                            BreakDown
                        </h3>
                        {Object.keys(categoryBreakDown).length === 0 ? (
                            <p className="text-gray-400 text-sm">No expenses found</p>
                        ) : (
                            <div className="flex flex-col gap-2">
                                {Object.entries(categoryBreakDown).map(
                                    ([category, amount]) => (
                                        <div key={category} className="flex justify-between items-center">
                                            <p className="text-black text-sm">{category}</p>
                                            {console.log(category+"this is the category")}
                                            {console.log(expenses)}
                                            <p className="text-lg font-bold text-black">{amount}</p>
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="bg-white/15 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
                        <h2 className="text-2xl font-bold text-white">Recent Expenses</h2>
                        <div className="w-full md:w-48">
                            <Select
                            label="Filter by Category"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            options={filteredOption}
                            />
                            </div>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    {filteredAndSortedExpenses.length === 0 ? (
                        <div className="text-center py-12 bg-white/5 rounded-lg border border-white/5 border-dashed">
                        <p className="text-black mb-4 text-lg">
                            No expenses found</p>
                            <Link to="/add" className='bg-blue-800 hover:bg-blue-600 text-white px-4 py-2'>Add Your First Expense</Link>
                        </div>
                    ):(
                       (filteredAndSortedExpenses.map(expense=> <ExpenseItem
                              key={expense.id}
                              expense={expense}
                              onDelete={deleteExpense}
                              />))
                    )
                    }
                </div>

            </div>
        </section>
    )
}
export default Dashboard
