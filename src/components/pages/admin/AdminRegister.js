import React, { useState } from 'react'
import { Button, Col, Row } from 'reactstrap'
import axios from 'axios'
import { BaseURL } from '../../../URL/URL'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const AdminRegister = () => {
    const navigate = useNavigate()
    const [inputChange, setInputChange] = useState({
        username: "",
        password: "",
        email: "",
        phone: "",
    })

    const changeHandler = (e) => {
        setInputChange({
            ...inputChange,
            [e.target.name]: e.target.value
        })
    }


    const adminRegister = async () => {
        try {
            await axios.post(`${BaseURL}/admin/register`, inputChange);
            console.log("Request sent successfully");
            navigate("/admin/login");
            toast.success("Regisration Sucess")
        } catch (error) {
            console.error("Error sending request:", error);
            toast.error("Something went wrong")
        }
    }

    console.log(inputChange)
    return (
        <Row>
            <Col sm='12' className='d-flex justify-content-center align-items-center'>
                <div className='d-flex flex-column gap-3 w-50 h-100 p-5 mt-5' style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                    <h4 className='text-center'>Admin Register</h4>
                    <div>
                        <label>Username</label>
                        <input className='form-control w-100 mt-2' type='text' name='username' placeholder='Username'
                            onChange={(e) => changeHandler(e)}
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input className='form-control w-100 mt-2' type='password' name='password' placeholder='Password'
                            onChange={(e) => changeHandler(e)}
                        />
                    </div>
                    <div>
                        <label>Email ID</label>
                        <input className='form-control w-100 mt-2' type='text' name='email' placeholder='Email ID'
                            onChange={(e) => changeHandler(e)}
                        />
                    </div>
                    <div>
                        <label>Phone Number</label>
                        <input className='form-control w-100 mt-2' type='number' name='phone' placeholder='Phone no'
                            onChange={(e) => changeHandler(e)}
                        />
                    </div>
                    <div className='mt-4 text-center '>
                        <Button className='w-25 p-2' color='dark' onClick={(() => {
                            adminRegister()
                            console.log(inputChange)
                        })}>Register</Button>
                    </div>

                    <div className='w-100 d-flex justify-content-end mt-3'>
                        <Link to='/admin/login'>Login as admin</Link>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default AdminRegister