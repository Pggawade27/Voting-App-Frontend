import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Col, Row } from 'reactstrap'

const MainPage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login')
        }, 5000)

        return () => clearTimeout(timer)
    }, [navigate])

    return (
        <>
            <Row>
                <Col md='12' className='d-flex justify-content-center align-items-center mt-5'>
                    <h4>Welcome to the voting app</h4>
                </Col>

                <Col md='12' className='d-flex justify-content-center align-items-center mt-2'>
                    <h5>Please login to vote</h5>
                </Col>
            </Row>
        </>
    )
}

export default MainPage
