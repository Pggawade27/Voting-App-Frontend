import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Row, Toast, ToastBody } from 'reactstrap'
import axios from 'axios'
import { BaseURL } from '../../URL/URL'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../../contex/MyContext'

const Vote = () => {
    const { id, setId, setIsVoted } = useContext(MyContext)
    const navigate = useNavigate()
    const [selectedCandidate, setSelectedCandidate] = useState('')
    const [candidateName, setCandidateName] = useState([])
    const [user, setUser] = useState([])
    const Userid = localStorage.getItem('id')
    const isVoted = localStorage.getItem('isVoted')
    console.log(isVoted, "isVoted")
    console.log(typeof (isVoted))

    const handleVote = async () => {
        if (isVoted == "true") {
            toast.error("You have already vote")
        }
        else {
            try {
                await axios.post(`${BaseURL}/vote`, { candidate_name: selectedCandidate, _id: Userid })
                toast.success("Vote submitted successfully")
                getUser()
                console.log("Vote submitted successfully")
            } catch (error) {
                console.error("Error submitting vote:", error)
                toast.error("Failed to submit vote")
                toast.error("You have already vote")

            }
        }
    }

    useEffect(() => {
        let timer = setTimeout(() => {
            getCandidate()
        }, 100)

        return () => clearTimeout(timer)
    }, [])

    const getCandidate = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await axios.get(`${BaseURL}/get_candidate`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(response.data.data)
            setCandidateName(response.data.data)
        } catch (error) {
            console.error("Error fetching candidates:", error)
            toast.error("Failed to fetch candidates")
            if (error.response && error.response.status === 403) {
                console.log("You are not authorized to access this resource.")
                toast.error("Please login")
                navigate("/login")
            } else {
                console.log("An error occurred:", error)
            }
        }
    }

    const getUser = () => {
        axios.get(`${BaseURL}/get_user`)
            .then((res) => {
                console.log(res.data.data)
                setUser(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getUser()
    }, [])

    const handleChange = (e) => {
        setSelectedCandidate(e.target.value)
    }

    console.log(id, "id")

    return (
        <Row>
            <Col sm='12' className='d-flex justify-content-center align-items-center'>
                <div className='d-flex flex-column align-items-center gap-3 w-50 h-100 p-5 mt-5' style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                    <h4 className=''>User Dashboard</h4>
                    {
                        candidateName.map((candidate, index) => (
                            <div className='d-flex gap-3' key={index}>
                                <input
                                    type='radio'
                                    name={`cac_${index}`}
                                    value={candidate?.candidate_name}
                                    onChange={handleChange}
                                />
                                <label>{candidate?.candidate_name}</label>
                            </div>
                        ))
                    }

                    <div className='mt-4 text-center'>
                        <Button color='dark' onClick={handleVote}>Vote</Button>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default Vote
