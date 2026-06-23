import { useEffect, useState } from "react"
import {
  getEmployeeById,
  getAllEmployees,
} from "../../services/employeeService.js"
import { assignTicket, deleteTicket, updateTicket } from "../../services/ticketService.js"

export const Ticket = ({ ticket, currentUser, getAndSetTickets }) => {
  const [assignedEmployee, setAssignedEmployee] = useState("")
  const [allEmployees, setAllEmployees] = useState([])

  useEffect(() => {
    if (ticket.employeeTickets.length) {
      getEmployeeById(ticket.employeeTickets[0].employeeId).then((employee) => {
        setAssignedEmployee(employee)
      })
    }
    getAllEmployees().then((employeeArray) => setAllEmployees(employeeArray))
  }, [ticket])

  const handleClaim = () => {
    const currentEmployee = allEmployees.find(
      (employee) => employee.userId === currentUser.id,
    )

    const newEmployeeTicket = {
      employeeId: currentEmployee.id,
      serviceTicketId: ticket.id,
    }

    assignTicket(newEmployeeTicket).then(() => {
      getAndSetTickets()
    })
  }

  const handleClose = () => {
    const closedTicket = {
      id: ticket.id,
      userId: ticket.userId,
      description: ticket.description,
      emergency: ticket.emergency,
      dateCompleted: new Date(),
    }

    updateTicket(closedTicket).then(() => {
      getAndSetTickets()
    })
  }

  const handleDelete = () =>{
    deleteTicket(ticket).then(() => getAndSetTickets())
  }

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
        <div className="btn-container">
          {/*If the logged in user is and employee and there is no employee assciated with the service ticket, then a button to claim the ticket should display*/}
          {currentUser.isStaff && !assignedEmployee && (
            <button className="btn btn-secondary" onClick={handleClaim}>
              Claim
            </button>
          )}

          {/*If the logged in user is an employee and the ticket is assigned to an employee and does not have a close date, then a button to close the ticket should appear*/}
          {assignedEmployee?.userId === currentUser.id &&
          !ticket.dateCompleted ? (
            <button className="btn btn-warning" onClick={handleClose}>
              Close
            </button>
          ) : (
            ""
          )}

          {/*If the currentUser is non staff then they will have the option to delete their tickets.*/}
          {!currentUser.isStaff && (
            <button className="btn btn-warning" onClick={handleDelete}>Delete</button>
          )}
        </div>
      </footer>
    </section>
  )
}
