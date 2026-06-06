import "./app.css"
import { CustomerList } from "./components/customers/CustomerList.jsx"
import { TicketList } from "./components/tickets/ticketList.jsx"
import { EmployeesList } from "./components/Employees/EmployeesList.jsx"
export const App = () => {
  return (
    <>
      {/* <TicketList/> */}
      <EmployeesList />
    </>
  )
}
