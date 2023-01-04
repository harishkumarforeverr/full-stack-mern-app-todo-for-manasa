import React, { useEffect } from 'react'

export default function Footer(props) {
    useEffect(()=>{
        props.footerCallBack('hi')
    },[])


  return (
    <div>
        i am infooter
    </div>
  )
}
