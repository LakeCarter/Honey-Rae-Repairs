import { Route, Outlet, Routes} from "react-router-dom"
import { NavBar } from "../components/nav/NavBar.jsx"
import { Welcome } from "../components/welcome/Welcome.jsx"
import { EmployeeDetails } from "../components/Employees/EmployeesDetails.jsx"
import { EmployeesList } from "../components/Employees/EmployeesList.jsx"
import { CustomerDetails } from "../components/customers/CustomerDetails.jsx"
import { CustomerList } from "../components/customers/CustomerList.jsx"
import { TicketList } from "../components/tickets/ticketList.jsx"
import { useEffect, useState } from "react"

export const ApplicationViews = () => {
const [currentUser,setCurrentUser] = useState({})

  useEffect(()=>{
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    setCurrentUser(honeyUserObject)
  },[])

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
        <Route index element={<Welcome />} />
        <Route path="tickets" element={<TicketList currentUser={currentUser} />} />
        <Route path="employees">
          <Route index element={<EmployeesList />} />
          <Route path=":employeeId" element={<EmployeeDetails />} />
        </Route>
        <Route path="customers">
          <Route index element={<CustomerList />} />
          <Route path=":customerId" element={<CustomerDetails />} />
        </Route>
      </Route>
    </Routes>
  )
}
