export const getAllTickets = () =>{
    return fetch(`http://localhost:8088/serviceTickets?_embed=employeeTickets`).then((res) => res.json())
}

export const getTicketsByEmployeeId = (employeeId) =>{
    return fetch(`http://localhost:8088/employeeTickets?employeeId=${employeeId}`).then(res =>res.json())
}