import { Outlet, Route, Routes } from "react-router-dom"
import { EmployeeNav } from "../components/nav/EmployeeNav.jsx"
import { TicketList } from "../components/tickets/ticketList.jsx"
import { EmployeesList } from "../components/Employees/EmployeesList.jsx"
import { Welcome } from "../components/welcome/Welcome.jsx"
import { EmployeeDetails } from "../components/Employees/EmployeesDetails.jsx"
import { CustomerDetails } from "../components/customers/CustomerDetails.jsx"
import { CustomerList } from "../components/customers/CustomerList.jsx"
import { EmployeeForm } from "../components/forms/EmployeeForm.jsx"

export const EmployeeViews = ({ currentUser }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <EmployeeNav />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome />} />
        <Route
          path="tickets"
          element={<TicketList currentUser={currentUser} />}
        />
        <Route path="employees">
          <Route index element={<EmployeesList />} />
          <Route path=":employeeId" element={<EmployeeDetails />} />
        </Route>
        <Route path="customers">
          <Route index element={<CustomerList />} />
          <Route path=":customerId" element={<CustomerDetails />} />
        </Route>
        <Route
          path="profile"
          element={<EmployeeForm currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  )
}
