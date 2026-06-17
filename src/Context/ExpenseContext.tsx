import {useLocalStorage} from "../Hooks/useLocalStorage.ts";
import {createContext, useCallback, useContext} from "react";
import type {Expense} from "../types.ts";
// export interface Expense{
//     id:string,
//     description:string,
//     amount:number,
//     category:string,
//     date:string;
// }

interface ExpenseContextType{
    expenses:Expense[]
    addExpense:(expense:Omit<Expense,'id'>)=>void;
    deleteExpense:(id:string)=>void;
    updateExpense:(id:string,expense:Partial<Expense>)=>void;

}
const ExpenseContext=createContext<ExpenseContextType|undefined>(undefined);
export function ExpenseProvider({children}:{children:React.ReactNode}){
    const[expenses,setExpenses]=useLocalStorage<Expense[]>("expenses_tracker_data",[]);
    const addExpense=useCallback((expenseData:Omit<Expense,'id'>)=>{
        setExpenses((prevExpenses)=>[...prevExpenses,{...expenseData,id:crypto.randomUUID()}]);
    },[setExpenses]);
  const deleteExpense=useCallback((id:string)=>{
        setExpenses((prevExpenses)=>prevExpenses.filter((expense)=>expense.id!==id));
    },[setExpenses]);
  const updateExpense=useCallback((id:string,updateData:Partial<Expense>)=>{
        setExpenses((prevExpenses)=>prevExpenses.map((expense)=>expense.id===id?{...expense,...updateData}:expense));
    },[setExpenses]);
  return <ExpenseContext.Provider value={{expenses,addExpense,deleteExpense,updateExpense}}>
      {children}
  </ExpenseContext.Provider>
}
// eslint-disable-next-line react-refresh/only-export-components
export function useExpenses(){
    const context=useContext(ExpenseContext);
    if(context===undefined){
        throw new Error("useExpenses must be used within an ExpenseProvider");
    }
    return context;
}