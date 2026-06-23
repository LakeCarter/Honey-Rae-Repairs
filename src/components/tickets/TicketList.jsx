import { useEffect, useState } from "react"
import { getAllTickets } from "../../services/ticketService.js"
import "./tickets.css"
import { Ticket } from "./Ticket.jsx"
import { TicketFilterBar } from "./TicketFilterBar.jsx"

export const TicketList = ({ currentUser }) => {
  const [allTickets, setAllTickets] = useState([])
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
  const [showOpenTicketsOnly, SetShowOpenTicketsOnly] =useState(false)
  const [filteredTicket, setFilteredTickets] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  

  const getAndSetTickets = () => {
    getAllTickets().then((ticketsArray) => {
      if (currentUser.isStaff) {
        setAllTickets(ticketsArray)
      } else {
        const customerTickets = ticketsArray.filter(
          (ticket) => ticket.userId === currentUser.id,
        )
        setAllTickets(customerTickets)
      }
    })
  }

  useEffect(() => {
    getAndSetTickets()
  }, [currentUser])

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

  useEffect(() => {
    const foundTickets = allTickets.filter((ticket) =>
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredTickets(foundTickets)
  }, [searchTerm, allTickets])

  useEffect(()=>{
    if(showOpenTicketsOnly){
      const openTickets = allTickets.filter((ticket)=> ticket.dateCompleted==="")
      setFilteredTickets(openTickets)
    }
    else {setFilteredTickets(allTickets)}
  },[showOpenTicketsOnly, allTickets])

  return (
    <div className="tickets-container">
      <h2>Tickets</h2>
      <TicketFilterBar
        setShowEmergencyOnly={setShowEmergencyOnly}
        setSearchTerm={setSearchTerm}
        currentUser={currentUser}
        SetShowOpenTicketsOnly={SetShowOpenTicketsOnly}
      />
      <article className="tickets">
        {filteredTicket.map((ticketObj) => {
          return (
            <Ticket
              ticket={ticketObj}
              currentUser={currentUser}
              getAndSetTickets={getAndSetTickets}
              key={ticketObj.id}
            />
          )
        })}
      </article>
    </div>
  )
}
