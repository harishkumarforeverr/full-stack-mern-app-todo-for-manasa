import React ,{useState}from 'react'

export default function Child({value}) {

 const [age, setage] = useState(25)


  return (
    <div>

<button onClick={()=>{value(age)}}>click here</button>
    </div>
  )
}
