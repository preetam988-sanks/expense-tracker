import React from 'react'
import {Button} from "../Components/UI/Button.tsx";

const Dashboard = () => {
    return (
        <div>
       <Button onClick={()=>console.log("DashBoard is here ")} variant='danger'>Dashboard</Button>
        </div>
    )
}
export default Dashboard
