export const getAllEmployees = () => {
  return fetch("http://localhost:8088/employees?_expand=user").then((res) =>
    res.json()
  )
}

export const getEmployeeById = (employeeId) => {
    return fetch(`http://localhost:8088/employees/${employeeId}/?_expand=user`).then((res)=>res.json())
}

export const getEmployeeByUserId = (userId) => {
  return fetch(`http://localhost:8088/employees?userId=${userId}&_expand=user`).then((res) => res.json())
}

export const updateEmployee = (employee) =>{
  return fetch(`http://localhost:8088/employees/${employee.id}`,{
    method:"Put",
    headers: {
      "content-type":"application/json"
    },
    body:JSON.stringify(employee)
  })
}