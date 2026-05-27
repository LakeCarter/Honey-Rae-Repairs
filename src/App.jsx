import { useEffect, useState } from "react"
import { getAllTickets } from "./services/ticketService.jsx"
import "./app.css"

export const App = () => {
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
    <div className="ticket-container">
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
      </div>
      <div>
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
        {filteredTicket.map((ticket) => {
          return (
            <section className="ticket" key={ticket.id}>
              <header className="ticket-info">#{ticket.id}</header>
              <div>{ticket.description}</div>
              <footer>
                <div>
                  <div className="ticket-info">emergency</div>
                  <div>{ticket.emergency ? "yes" : "no"}</div>
                </div>
              </footer>
            </section>
          )
        })}
      </article>
    </div>
  )
}
