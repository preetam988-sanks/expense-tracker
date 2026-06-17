import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ExpenseProvider } from "./Context/ExpenseContext.tsx";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes} from "react-router-dom";
import {Layout} from "./Layout.tsx";
import Dashboard from "./Pages/Dashboard.tsx";
import AddExpense from "./Pages/AddExpense.tsx";
import EditExpenseDetails from "./Pages/EditExpenseDetails.tsx";
import Stats from "./Pages/Stats.tsx";
import NotFound from "./Pages/NotFound.tsx";
// import App from './App.tsx'

const router=createBrowserRouter(
createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path="/add" element={<AddExpense/>}/>
        <Route path="/expense/:id" element={<EditExpenseDetails/>}/>
        <Route path="stats" element={<Stats/>}/>
        <Route path="*" element={<NotFound/>}/>

    </Route>
)
)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ExpenseProvider>
      <RouterProvider router={router}/>
      </ExpenseProvider>
  </StrictMode>,
)
