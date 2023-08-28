import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/login';
import SignUp from './components/SignUpForm';
import ForgotPassword from './components/ForgotPassword';
//import Reset from './components/reset';
//import Forgot from './components/forgot';

import Type from './components/selectType';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <Type />
            }
          />
          <Route path="/login" element={<Login />} />

          <Route path="/Signup" element={<SignUp />} />

          <Route path="/Forgotpassword" element={<ForgotPassword />} />

        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
