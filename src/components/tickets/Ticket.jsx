import { useEffect, useState } from "react"
import { getEmployeeById } from "../../services/employeeService.js"
import { use } from "react"

export const Ticket = ({ ticket }) => {
  const [assignedEmployee, setAssignedEmployee] = useState("")

  useEffect(() => {
    if (ticket.employeeTickets.length) {
      getEmployeeById(ticket.employeeTickets[0].employeeId).then((employee) => {
        setAssignedEmployee(employee)
      })
    }
  }, [ticket])

  return (
    <section className="ticket">
      <header className="ticket-info">#{ticket.id}</header>
      <div>{ticket.description}</div>
      <footer>
        <div>
          <div className="ticket-info">assignee</div>
          <div>
            {assignedEmployee ? assignedEmployee.user?.fullName : "None"}
          </div>
        </div>
        <div>
          <div className="ticket-info">emergency</div>
          <div>{ticket.emergency ? "yes" : "no"}</div>
        </div>
      </footer>
    </section>
  )
}
