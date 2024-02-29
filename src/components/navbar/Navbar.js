import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button, Col, Row } from 'reactstrap'

const Navbar = () => {

  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const logout = () => {
    localStorage.removeItem('token');
    navigate("/login");
  }

  return (
    <>
      <div>
        <Row>
          <Col md='12' style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", padding: "20px", display: "flex", justifyContent: "end" }}>
            <div style={{ display: "flex", gap: "20px" }}>
              {token ? (
                <Button color='primary' onClick={logout}>Logout</Button>
              ) : (
                <>
                  <Button color='primary' outline onClick={() => navigate("/login")}>Login</Button>
                  <Button color='primary' onClick={() => navigate("/register")}>Register</Button>

                  {/* <Button color='primary' onClick={() => navigate("/admin/login")}>Admin Login</Button>
                  <Button color='primary' onClick={() => navigate("/admin/register")}>Admin Register</Button> */}
                </>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Navbar
