import { Col, Form, Button, Modal, Image, Row } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Type = () => {
  const [loginType, setLoginType] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate("/login")
  };

  return (
    <div className="login">
      <h1>Select login type</h1>
      <Form onSubmit={(event) => handleSubmit(event)}>
        <div key="inline-radio" className="mt-3 checkBoxStyle">
            <Form.Check
              inline
              required
              label="Admin"
              value="admin"
              name="group1"
              type="radio"
              id="inline-radio-1"
              onChange={(e) => setLoginType(e.target.value)}
            />
            <Form.Check
              inline
              required
              label="User"
              value="user"
              name="group1"
              type="radio"
              onChange={(e) => setLoginType(e.target.value)}
              id="inline-radio-2"
            />
            <Form.Control.Feedback type="invalid">
              Please Select One Option
            </Form.Control.Feedback>
        </div>
        <Button type="submit" className="submitBtn">Submit</Button>
      </Form>
    </div>
  );
};

export default Type;
