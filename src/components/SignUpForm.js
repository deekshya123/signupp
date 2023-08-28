import { Col, Form, Button, Modal, Image, Row } from "react-bootstrap";
import React, { useState } from "react";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [CG_ID, setCGID] = useState("");
  const [CG_Email_Address, setEmail] = useState("");
  const [Full_Name, setName] = useState("");
  const [Phone_Number, setPhoneNumber] = useState("");
  const [Password, setPassword] = useState("");
  //const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  //const [userData, setUserData] = useState(null); // State to store user data by CG_ID
  //const [showUserData, setShowUserData] = useState(false); // State 

  const navigate = useNavigate();

  const handleCGIDChange = (event) => {
    const idPattern = /^\d{8}$/;

  

    if (!idPattern.test(CG_ID)) {
      setCGID(event.target.value);
      console.log("Invalid ID (8 digits required)");
      return;
    } else {
      setCGID(event.target.value);
    }
  };

  const handleEmailChange = (event) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailPattern.test(CG_Email_Address)) {
      setEmail(event.target.value);

      console.log("Invalid email");

      return;
    } else {
      setEmail(event.target.value);
    }
  };

  const handleNameChange = (event) => {
    if (!Full_Name) {
      setName(event.target.value);

      console.log("Name is required");

      return;
    } else {
      setName(event.target.value);
    }
  };

  const handlePhoneNumberChange = (event) => {
    const phonePattern = /^\d{10}$/;

    if (Phone_Number && !phonePattern.test(Phone_Number)) {
      setPhoneNumber(event.target.value);
      console.log("Invalid phone number (10 digits required)");
      return;
      //return false;
    } else {
      setPhoneNumber(event.target.value);
    }
  };

  const handlePasswordChange = (event) => {
    const passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;

    if (!passwordPattern.test(Password)) {
      setPassword(event.target.value);

      console.log(
        "Invalid password (minimum 8 characters, at least one digit and one special character)"
      );

      return;
    } else {
      setPassword(event.target.value);
    }
  };

  const handleCheckUserExistence = async () => {
    const db = getFirestore();
    const myCollectionRef = collection(db, 'CG_SignUp_DB'+ 'CG_ID');

    const queryByEmail = await getDocs(query(myCollectionRef, where("CG_Email_Address", "==" , CG_Email_Address)));
    const queryByCGID = await getDocs(query(myCollectionRef, where("CG_ID" , "==" , CG_ID)));

    if (queryByEmail.size > 0 || queryByCGID.size > 0) {
      showPopup("User already exists");
      navigate('/Login');
      //setSuccess(false);
    } else {
      handleSubmit();
      //setError(false);
      //setSuccess(true);
    }
  };



    const handleSubmit = async (event) => {
      event.preventDefault();

    const db = getFirestore();

  
    try {
      const myCollectionRef = collection(db, 'CG_SignUp_DB');
      const docRef = await addDoc(myCollectionRef,
        {
        CG_ID: CG_ID,
        CG_Email_Address: CG_Email_Address, 
        Full_Name: Full_Name,
        Phone_number: Phone_Number,
        Password: Password,
      });

      setSuccess(true);
      setError(false);
    } catch (error) {
      console.log('error', error);
      setError(true);
      setSuccess(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError(false);

          //signup logic

          console.log('CGID:',  CG_ID);
          console.log('Email:',  CG_Email_Address);
          console.log('Name:', Full_Name);
          console.log('PhoneNumber:', Phone_Number);
          console.log('Password:', Password);
      
          // Reset form
          setCGID('');
          setEmail('');
          setName('');
          setPhoneNumber('');
          setPassword('');
          setShowPopup(true);
      
          navigate('/Login');

  };

  return (
    <div className="signup">
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mt-2">
          <Form.Label className="formLabel" htmlFor="CGID">CG ID(8 digits)<span className="required">*</span></Form.Label>
          <Form.Control
            type="text"
            name="CG_ID"
            id="CGID"
            required
            value={CG_ID}
            placeholder="Enter your CG ID"
            onChange={(e) => handleCGIDChange(e)}
          />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label className="formLabel" htmlFor="email">CG Email Address<span className="required">*</span></Form.Label>
          <Form.Control
            type="email"
            name="email"
            id="email"
            required
            value={CG_Email_Address}
            placeholder="Enter email"
            onChange={(e) => handleEmailChange(e)}
          />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label className="formLabel" htmlFor="fullName">Full Name<span className="required">*</span></Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            id="name"
            required
            value={Full_Name}
            placeholder="Enter full name"
            onChange={(e) => handleNameChange(e)}
          />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label className="formLabel" htmlFor="phone">Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            id="phone"
            value={Phone_Number}
            placeholder="Enter phone number"
            onChange={(e) => handlePhoneNumberChange(event)}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label className="formLabel" htmlFor="password">Password
          Password:<br></br>
            <div className="new">
              (minimum 8 characters, at least one digit and one special
              character)
            </div>
          </Form.Label>
       

          <Form.Control
            type="password"
            name="password"
            id="password"
            required
            value={Password}
            placeholder="Enter password"
            onChange={(e) => handlePasswordChange(e)}
          />

        </Form.Group>
        
        
        <div className="mt-2">
          <button onClick={() => navigate('/login')}>Already have an account? Login</button>
        </div>
        <Button type="submit" className="submitBtn">Sign Up</Button>

      </Form>

      <Modal
        show={error}
        onHide={handleClose}
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
          <h6 className="TextCenter" style={{color: "red"}}>Sign-up failed</h6>
          <Row
            style={{ flexDirection: "row", justifyContent: "space-between" }}
            className="mt-4"
          >
            <Col>
              <center>
                <Button type="button"
                  className="submitBtn"
                  //onClick={handleClose}
                  onClick={handleCheckUserExistence }
                >
                  Done
                </Button>

                <Modal
        show={showPopup !== ""}
        onHide={() => setShowPopup("")}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* ... (existing Modal content) */}
      </Modal>

              </center>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      <Modal
        show={success}
        onHide={handleClose}
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
          <h6 className="TextCenter" style={{color: "green"}}>Sign-up Successfull</h6>
          <Row
            style={{ flexDirection: "row", justifyContent: "space-between" }}
            className="mt-4"
          >
            <Col>
              <center>
                <Button className="submitBtn" onClick={handleClose}>
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

export default SignUp;


