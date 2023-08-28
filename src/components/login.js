import { Col, Form, Button, Modal, Image, Row } from "react-bootstrap";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { db } from "../firebase_setup/firebase";
import React, { useState } from "react";
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("");
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const db = getFirestore();
    try {
      const myCollectionRef = collection(db, 'CG_SignUp_DB');
      const q = query(myCollectionRef, where('CG_ID', '==', email));
      const querySnapshot = await getDocs(q);
      const newData = querySnapshot.docs.map((doc) => doc.data())
      if(newData[0]?.Password === password){
        setSuccess(true)
        setError(false)
      }else{
        setError(true)
        setSuccess(false)
      }
    } catch (error) {
      console.log('errror', error)
    }
  };

   const handleClose = () => {
    setSuccess(false);
    window.location.reload(true);
  };

  const handleErrorClose = () => {
    setError(false);

    navigate('/Login');
  };


  return (
    <div className="login">
      <h1>Login</h1>
      <Form onSubmit={(event) => handleSubmit(event)}>
        <Form.Group className="mt-2">
          <Form.Label className="formLabel" for="email">CG_Id</Form.Label>
          <Form.Control
            type="text"
            name="email"
            id="email"
            required
            value={email}
            placeholder="Enter CG_Id"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label className="formLabel" for="password">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="password"
            required
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mt-2">
        
                    
                          
                    <button onClick={e => navigate('/signup')}>Sign Up</button><br></br>

                    <button onClick={e => navigate('/forgotpassword')}>Forgot Password</button><br></br>
                
                <button onClick={()=>navigate(-1)}>Back</button>

        </div>
        
        
        
        <Button type="submit" className="submitBtn">Submit</Button>
      </Form>

      <Modal
        show={error}
        onHide={() => handleErrorClose()}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title className="center ModalTitle errorTitle">
            Error
            <Image
              src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='25' height='25' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e"
              style={{ paddingLeft: 5, paddingBottom: 2 }}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="TextCenter" style={{color: "red"}}>Invalid Login</h6>
          <Row
            style={{ flexDirection: "row", justifyContent: "space-between" }}
            className="mt-4"
          >
            <Col>
              <center>
                <Button
                  className="submitBtn"
                  onClick={() => handleErrorClose()}
                >
                  Done
                </Button>
              </center>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

       <Modal
        show={success}
        onHide={() => handleClose()}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title className="center" style={{color: "green"}}>
           Success
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="TextCenter" style={{color: "green"}}>Login Successfull</h6>
          <Row
            style={{ flexDirection: "row", justifyContent: "space-between" }}
            className="mt-4"
          >
            
            <Col>
              <center>
                <Button className="submitBtn" onClick={() => handleClose()}>
                  Done
                </Button>
              </center>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Login;
