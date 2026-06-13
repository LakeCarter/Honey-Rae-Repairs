import { useEffect, useState } from "react"
import { getStaffUsers } from "../../services/userService.js"
import { User } from "../users/User.jsx"
import "./Employees.css"
import { Link } from "react-router-dom"

export const EmployeesList = () => {
  const [allEmployees, setAllEmployees] = useState([])

  useEffect(() => {
    getStaffUsers().then((employeeArray) => setAllEmployees(employeeArray))
  }, [])

  return (
    <div className="employees">
      {allEmployees.map((employee) => {
        return (
          <Link to={`/employees/${employee.id}`} key={employee.id}>
            <User user={employee}/>
          </Link>
        )
      })}
    </div>
  )
}
