import React, { useState } from 'react';
//import './App.css';
//import "./SignUpForm.css";
import { useNavigate } from 'react-router-dom'

import axios from 'axios';

 

const ForgotPassword = () => {

  const [email, setEmail] = useState('');

  const [otp, setOTP] = useState('');

  const [newPassword, setNewPassword] = useState('');

  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [otpSent, setOTPSent] = useState(false);

  const [timer, setTimer] = useState(600);

  const navigate = useNavigate();

 

  const handleEmailSubmit = async () => {

    try {

      const response = await axios.post('/forgetPassword', { CG_Email_Address: email });

      if (response.status === 200 && response.data.verficationOtp) {

        setOTPSent(true);

        startTimer();

      }

    } catch (error) {

      console.error(error);

    }

  };

  const handleOTPVerification = async () => {

    try {

      const response = await axios.post('/verifyOTP', { CG_Email_Address: email, otp });

      if (response.status === 200) {

        resetPassword();

      }

    } catch (error) {

      console.error(error);

    }

  };

 

  const resetPassword = async () => {

    if (newPassword !== confirmNewPassword) {

      alert('New Password and Confirm New Password are not the same.');

      return;

    }

 

    try {

      const response = await axios.post('/newPassword', { CG_ID: email, New_Password: newPassword, Confirm_New_Password: confirmNewPassword });

      if (response.status === 200) {

        alert('New Password has been set successfully.');

        setOTPSent(false);

        setEmail('');

        setOTP('');

        setNewPassword('');

        setConfirmNewPassword('');

        //clearInterval(timerInterval);

      }

    } catch (error) {

      console.error(error);

    }

  };

  const data = {
    email: email,

    otp:otp,

    newPassword:newPassword,

    confirmNewPassword:confirmNewPassword,

    otpSent:otpSent,

    timer:timer,
  };

  axios

      .post("http://localhost:5000/signup", data)

      .then((res) => {
        alert(res?.data?.message);

        console.log(JSON.stringify(res));
      })

      .catch((e) => {
        alert(e);

        console.log("e", JSON.stringify(e));
      });

 

  const startTimer = () => {

    const timerInterval = setInterval(() => {

      if (timer > 0) {

        setTimer(timer - 1);

      } else {

        clearInterval(timerInterval);

      }

    }, 1000);

    navigate('/employee');

  };

 

  return (

    <div className="Container">

      <h1>Forgot Password</h1>

      {!otpSent ? (

        <form>

          <label htmlFor="email">Enter your Gmail:</label>

          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <button type="button" onClick={handleEmailSubmit}>Submit</button>

        </form>

      ) : (

        <form>

          <h1>OTP Validation</h1>

          <p>An OTP has been sent to your Gmail. Please enter the OTP below:</p>

          <input type="text" value={otp} onChange={(e) => setOTP(e.target.value)} required />

          <button type="button" onClick={handleOTPVerification}>Verify</button>

          <p id="timer">Time left: {Math.floor(timer / 60).toString().padStart(2, '0')}:{(timer % 60).toString().padStart(2, '0')}</p>

        </form>

      )}

 

      {otpSent && (

        <form>

          <h1>Reset Password</h1>

          <label htmlFor="newPassword">Enter your new password:</label>

          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />

          <label htmlFor="confirmPassword">Confirm your new password:</label>

          <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required />

          <button type="button" onClick={resetPassword}>Reset Password</button>

          

        </form>
      )}
      <button onClick={()=>navigate(-1)}>Back</button>
    </div>
  );
};
export default ForgotPassword;