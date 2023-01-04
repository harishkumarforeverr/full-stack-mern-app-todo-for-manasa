import React, { useState } from 'react'
import Footer from './Footer'

export default function Header() {

    const [first, setfirst] = useState(false)

    const [abc, setabc] = useState('abc')



    
 const callBackfn=(e)=>{
     setabc(e)
 }

    return (

        <React.Fragment>


            <div>
                {abc}

                <button onClick={() => {
                    setfirst(true)
                }}>click</button>
            </div>
            {first &&
                <Footer footerCallBack={callBackfn} />
            }



        </React.Fragment>


    )
}
