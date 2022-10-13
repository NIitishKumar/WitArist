import React, { useState } from 'react'
import './vendor.css'
import axios from 'axios'
import {useNavigate} from "react-router-dom";

function Vendor() {

    const [values, setValues] = useState({
        name:""
    })

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(values.name){
            try {
                await axios({
                    method:"post",
                    url:"http://witarist.herokuapp.com/vendor",
                    data:{name:values.name}
                }).then(res => {
                    if(res.status === 200){
                        console.log(res)
                        navigate("/resourse")
                        // setVendor(res.data?.data)
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }

    }

  return (
    <div className='container'>
        <button className='dashboard' onClick={() => navigate("/dashboard")}>Dashoard</button>
        <form onSubmit={handleSubmit}>
            <label className='label' >Enter Vendor Name</label>
            <input className='input' onChange={(e) => setValues({...values,name:e.target.value})} placeholder='Vendor Name' />
            <button className='button'>Submit</button>
        </form>
    </div>
  )
}

export default Vendor