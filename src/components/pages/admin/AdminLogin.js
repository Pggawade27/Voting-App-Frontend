import React, { useState } from 'react'
import { Button, Col, Row } from 'reactstrap'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { BaseURL } from '../../../URL/URL'
import toast from 'react-hot-toast'

const AdminLogin = () => {
    const navigate = useNavigate();
    const [inputChange, setInputChange] = useState({
        username: "",
        password: ""
    })

    const changeHandler = (e) => {
        setInputChange({
            ...inputChange,
            [e.target.name]: e.target.value
        });
    }


    const adminLogin = async () => {
        try {
            const response = await axios.post(`${BaseURL}/admin/login`, inputChange);
            const token = response.data.jwtToken;
            localStorage.setItem('token', token);
            console.log("Token set:", token)
            navigate("/admin_dash");
            toast.success("Login Sucess! Welcome")
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
                    <h4 className='text-center'>Admin Login</h4>
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
                    <div className='mt-4 text-center '>
                        <Button className='w-25 p-2' color='dark' onClick={(() => adminLogin())}>Login</Button>
                    </div>

                    <div className='w-100 d-flex justify-content-end mt-3'>
                        <Link to='/admin/register'>Register as admin</Link>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default AdminLogin