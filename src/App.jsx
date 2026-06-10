import "./app.css"
import { CustomerList } from "./components/customers/CustomerList.jsx"
import { TicketList } from "./components/tickets/ticketList.jsx"
import { EmployeesList } from "./components/Employees/EmployeesList.jsx"
import { Routes, Route, Outlet } from "react-router-dom"
import { NavBar } from "./components/nav/NavBar.jsx"
import { Welcome } from "./components/welcome/Welcome.jsx"
import { CustomerDetails } from "./components/customers/CustomerDetails.jsx"

export const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome/>} />
        <Route path="tickets" element={<TicketList />} />
        <Route path="employees" element={<EmployeesList />} />
        <Route path="customers">
          <Route index element={<CustomerList/>} />
          <Route path=":customerId" element={<CustomerDetails/>} /> 
        
        </Route>
      </Route>
    </Routes>
  )
}
