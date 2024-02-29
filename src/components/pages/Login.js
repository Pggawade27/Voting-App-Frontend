import React, { useContext, useState } from 'react'
import { Button, Col, Row } from 'reactstrap'
import axios from 'axios'
import { BaseURL } from '../../URL/URL'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { MyContext } from '../../contex/MyContext'

const Login = () => {
    const { id, setId, isVoted, setIsVoted } = useContext(MyContext)
    const navigate = useNavigate()
    const [inputChange, setInputChange] = useState({
        username: "",
        password: ""
    })

    const changeHandler = (e) => {
        setInputChange({
            ...inputChange,
            [e.target.name]: e.target.value
        })
    }

    const login = async () => {
        try {
            const response = await axios.post(`${BaseURL}/user/admin/login`, inputChange)
            const token = response.data.jwtToken
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('id', response.data.userAdmin._id)
            setIsVoted(response.data.userAdmin.isVoted)
            localStorage.setItem("isVoted", response.data.userAdmin.isVoted ? response.data.userAdmin.isVoted : "")
            console.log("Token set:", token)
    
            // Check if the user is an admin
            if (response.data.userAdmin.isAdmin === true) {
                navigate("/admin_dash")
            } else {
                navigate("/vote")
            }
    
            toast.success("Login Success! Welcome")
        } catch (error) {
            console.error("Error sending request:", error)
            toast.error("Something went wrong")
        }
    }
    

    return (
        <Row>
            <Col sm='12' className='d-flex justify-content-center align-items-center'>
                <div className='d-flex flex-column gap-3 w-50 h-100 p-5 mt-5' style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                    <h4 className='text-center'>User Login</h4>
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
                        <Button className='w-25 p-2' color='dark' onClick={(() => login())}>Login</Button>
                    </div>

                    {/* <div className='w-100 d-flex justify-content-between mt-3'>
                        <Link to='/admin/login'>Login as admin</Link>
                        <Link to='/admin/register'>Register as admin</Link>
                    </div> */}
                </div>
            </Col>
        </Row>
    )
}

export default Login
