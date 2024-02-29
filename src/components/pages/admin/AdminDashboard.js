import React, { useEffect, useState } from 'react'
import { BaseURL } from '../../../URL/URL'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState)
  const [inputChange, setInputChange] = useState({
    candidate_name: ""
  })
  const [editCandidate, setEditCandidate] = useState({
    candidate_name: ""
  })
  const [candidate, setCandidate] = useState([])
  const [isModal, setIsModal] = useState(false)
  const [isViewModal, setViewModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [votedUsers, setVotedUsers] = useState("");
  const [voterData, setVoterData] = useState([])
  const toggle = () => setIsModal(!isModal)
  const Edittoggle = () => setEditModal(!editModal)
  const viewtoggle = () => setViewModal(!isViewModal)

  const changeHandler = (e) => {
    setInputChange({
      ...inputChange,
      [e.target.name]: e.target.value
    })
  }

  // const getCandidate = () => {
  //   axios.get(`${BaseURL}/get_candidate`)
  //     .then((res) => {
  //       console.log(res.data, "get_candidate")
  //       const cands = res.data.data
  //       setCandidate(cands)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

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
      console.log(response.data, "get_candidate")
      const cands = response.data.data
      setCandidate(cands)
    } catch (error) {
      console.error("Error fetching candidates:", error)
      toast.error("Failed to fetch candidates")
      if (error.response && error.response.status === 403) {
        console.log("You are not authorized to access this resource.")
        toast.error("Please login")
        navigate("/admin/login")
      } else {
        console.log("An error occurred:", error)
      }
    }
  }

  const addCandidate = () => {
    axios.post(`${BaseURL}/add_candidate`, inputChange)
      .then((res) => {
        console.log(res.data)
        toast.success("Candidate added")
        getCandidate()
      })
      .catch((err) => {
        console.log(err)
        toast.error("Something went wrong")
      })
  }

  const voted_user = async () => {
    try {
      const response = await axios.get(`${BaseURL}/voted_user`);
      setVotedUsers(response.data.votedUsers);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const getVoterData = async (id) => {
    console.log(id, "dddd")
    axios.post(`${BaseURL}/get_voter`, { id: id })
      .then((res) => {
        console.log(res.data.voter.username, "llllll")
        setVoterData(res.data.voter.username)
        getCandidate()
      })
      .catch((err) => {
        console.log(err)
        toast.error("Something went wrong")
      })
  }



  useEffect(() => {
    getCandidate()
    voted_user();
  }, [])

  console.log(votedUsers, "votedUsers")

  return (
    <>
      <div className='p-5'>
        <h4 className='text-center mt-3'>Admin Dashboard</h4>
        <div className='mt-3'>
          <Table striped bordered hover variant="">
            <thead>
              <tr>
                <th className='text-center'>Sr no</th>
                <th className='text-center'>Candidate Name</th>
                <th className='text-center'>Votes</th>
                <th className='text-center'>Edit</th>
                <th className='text-center'>Delete</th>
                <th className='text-center'>Views</th>
              </tr>
            </thead>
            <tbody>
              {candidate?.map((candidate, index) => (
                <tr key={candidate._id} className="vote-table-row">
                  <td className="vote-table-cell text-center">{index + 1}</td>
                  <td className="vote-table-cell text-center">{candidate.candidate_name}</td>
                  <td className="vote-table-cell text-center">{candidate.count}</td>
                  <td className="vote-table-cell text-center">
                    <Button color='primary' onClick={() => {
                      setEditModal(candidate._id)
                      setEditCandidate(prevState => ({
                        ...prevState,
                        candidate_name: candidate.candidate_name
                      }))
                    }}>
                      Edit
                    </Button>
                    {editModal === candidate._id && (
                      <Modal isOpen={true} toggle={Edittoggle} centered>
                        <ModalHeader toggle={Edittoggle}>Edit Candidate</ModalHeader>
                        <ModalBody>
                          <div className='mt-3'>
                            {/* <label>Candidate Name</label>
                            <input
                              className='form-control w-100 mt-2'
                              type='text'
                              name='candidate_name'
                              value={editCandidate.candidate_name}
                              placeholder='Enter Candidate Name'
                              onChange={(e) => changeHandler(e)}
                            /> */}

                            <input
                              className='form-control w-100 mt-2'
                              type='text'
                              name='candidate_name'
                              value={editCandidate.candidate_name}
                              placeholder='Enter Candidate Name'
                              onChange={(e) => {
                                setEditCandidate({ ...editCandidate, candidate_name: e.target.value })
                                changeHandler(e)
                              }}
                            />

                          </div>
                        </ModalBody>
                        <ModalFooter>
                          <div>
                            <Button
                              color='primary'
                              outline
                              onClick={() => {
                                Edittoggle()
                                axios
                                  .post(`${BaseURL}/edit_candidate`, { candidate_name: inputChange.candidate_name, candidate_id: candidate._id })
                                  .then((res) => {
                                    console.log(res.data)
                                    getCandidate()
                                    setEditModal("")
                                    toast.success("Candidate edited")
                                  })
                                  .catch((err) => {
                                    console.log(err)
                                    toast.error("Something went wrong")
                                  })
                              }}
                            >
                              Edit
                            </Button>
                          </div>
                        </ModalFooter>
                      </Modal>
                    )}
                  </td>

                  <td className="vote-table-cell text-center"><Button color='danger' onClick={(() => {
                    axios.post(`${BaseURL}/delete_candidate`, { candidate_id: candidate._id })
                      .then((res) => {
                        console.log(res.data)
                        toast.success("Candidate delete")
                        getCandidate()
                      })
                      .catch((err) => {
                        console.log(err)
                        toast.error("Something went wrong")
                      })
                  })}>delete</Button></td>
                  <td className="vote-table-cell text-center">
                    <Button onClick={() => {
                      setViewModal(true)
                      getVoterData(candidate._id)
                    }}>View</Button>

                    <Modal isOpen={isViewModal} toggle={viewtoggle} centered>
                      <ModalHeader toggle={viewtoggle}>view voter</ModalHeader>
                      <ModalBody>
                        {/* <h6>{voterData}</h6> */}
                        {
                          votedUsers?.map((voted) => (
                            <h6>{voted.username}</h6>
                          ))
                        }
                      </ModalBody>
                    </Modal>

                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div >
        <div className='mt-4 w-100 d-flex justify-content-end'>
          <Button color='primary'
            onClick={(() => {
              setIsModal(!isModal)
            })}
          >
            Add Candidate
          </Button>
        </div>
      </div >

      <Modal isOpen={isModal} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>Add Candidate</ModalHeader>
        <ModalBody>
          <div className='mt-3'>
            <label>Candidate Name</label>
            <input className='form-control w-100 mt-2' type='text' name='candidate_name' placeholder='Enter Candidate Name'
              onChange={(e) => changeHandler(e)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <div>
            <Button color='primary' outline onClick={(() => {
              toggle()
              addCandidate()
            })}>Add</Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default AdminDashboard
