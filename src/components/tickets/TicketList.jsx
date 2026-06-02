import { useEffect, useState } from "react"
import { getAllTickets } from "../../services/ticketService.jsx"
import "./tickets.css"
import { Ticket } from "./Ticket.jsx"

export const TicketList = () => {
  const [allTickets, setAllTickets] = useState([])
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
  const [filteredTicket, setFilteredTickets] = useState([])
  useEffect(() => {
    getAllTickets().then((ticketsArray) => {
      setAllTickets(ticketsArray)
    })
  }, [])

  useEffect(() => {
    if (showEmergencyOnly) {
      const emergencyTickets = allTickets.filter(
        (ticket) => ticket.emergency === true,
      )
      setFilteredTickets(emergencyTickets)
    } else {
      setFilteredTickets(allTickets)
    }
  }, [showEmergencyOnly, allTickets])

  return (
    <div className="tickets-container">
      <h2>Tickets</h2>
      <div>
        <button
          className="filter-btn btn-primary"
          onClick={() => {
            setShowEmergencyOnly(true)
          }}
        >
          Emergency
        </button>
        <button
          className="filter-btn btn-info"
          onClick={() => {
            setShowEmergencyOnly(false)
          }}
        >
          Show All
        </button>
      </div>
      <article className="tickets">
        {filteredTicket.map((ticketObj) => {
          return <Ticket ticket={ticketObj} name="bobby" key={ticketObj.id}/>
        })}
      </article>
    </div>
  )
}
