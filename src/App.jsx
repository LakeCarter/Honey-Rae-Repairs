import { useState } from "react"

export const App = () => {
  const [count, setCount] = useState(0)
  
const handleButtonClick = () =>{
  setCount(count+1)
  console.log(count)
}

  return (
    <>
      <h1>Hello</h1>
      <div>This thing be doing things</div>
      <button className ="btn-secondary" onClick={handleButtonClick}>Click Me!</button>
      <div>Count:{count}</div>
    </>
  )
}
