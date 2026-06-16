import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getEmployeeByUserId } from "../../services/employeeService.js"
import { getTicketsByEmployeeId } from "../../services/ticketService.js"

export const EmployeeDetails = () => {

    const {employeeId} = useParams()
    const [employee,setEmployee] = useState([])
    const [employeeTickets,setEmployeeTickets] = useState()

    useEffect(()=>{
        getEmployeeByUserId(employeeId).then(data =>{
            const employeeObj = data[0]
            setEmployee(employeeObj)
        })
    },[employeeId])
    
    useEffect(()=>{
        getTicketsByEmployeeId(employee.id).then(ticketArray =>{setEmployeeTickets(ticketArray)})
    }, [employee])

    return<div>
        <section className="employee" key={employee.id}>
            <header className="employee-header">{employee.user?.fullName}</header>
            <div>
                <span className="employee-info">Email: </span>
                {employee.user?.email}
            </div>
            <div>
                <span className="employee-info">Specialty: </span>
                {employee.specialty}
            </div>
            <div>
                <span className="employee-info">Rate: </span>
                {employee.rate}
            </div>
            <footer className="employee-footer">Currently working on {employeeTickets?.length} tickets</footer>
        </section>

    </div>
}
