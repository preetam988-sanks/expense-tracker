import {NavLink, Outlet} from "react-router-dom";

export function Layout(){
    return<div className="min-h-screen bg-[url('https://thumbs.dreamstime.com/b/hand-holding-coins-to-stack-growth-plant-step-concept-saving-money-finance-accounting-135832008.jpg')] text-white flex flex-col bg-cover bg-no-repeat bg-center bg-lig bg-fixed">
          <header className='bg-gray-700 border-b border-gray-700 shadow-sm'>
              <div className="max-w-4xl max-auto px-4 h-16 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-blue-200">Expense Tracker</h1>
                <nav className="flex space-x-4 gap-10">
                  <NavLink to="/" className={({isActive})=>(`cursor-pointer ${isActive ? "text-blue-200" : ""}`)}>
                      DashBoard
                  </NavLink>
                    <NavLink to="/add" className={({isActive})=>`cursor-pointer ${isActive ? "text-blue-200" : ""}`}>
                        Add Expense
                    </NavLink>
                    <NavLink to="/stats" className={({isActive})=>`cursor-pointer ${isActive ? "text-blue-200" : ""}`}>
                        Stats
                    </NavLink>



                </nav>
              </div>
          </header>
        <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-6">
            <Outlet/>
        </main>
        </div>;
}