import React, { useEffect, useState } from 'react';
import { Form, Input, message } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import './Register.css'; // Import the CSS file for styling

const Register = () => {
       const navigate = useNavigate();
       const [loading, setLoading] = useState(false);

       // Form submit
       const submitHandler = async (values) => {
              try {
                     setLoading(true);
                     console.log('Sending payload:', values);
                     await axios.post('https://trackmymoney-mern.onrender.com/api/v1/users/register', values);
                     message.success("Registration Success");
                     setLoading(false);
                     navigate('/login');
              } catch (error) {
                     setLoading(false);
                     message.error(error.response?.data?.message || 'Registration Failed');
              }
       };

       // Prevent registered users from accessing register page
       useEffect(() => {
              if (localStorage.getItem("user")) {
                     navigate("/");
              }
       }, [navigate]);

       return (
              <>
                     <div className="register-page">
                            {loading && <Spinner />}
                            <h1 className="register-header">Registertion Form</h1>
                            <Form layout="vertical" onFinish={submitHandler} className="register-form-container">
                                   <Form.Item label="Name" name="name">
                                          <Input />
                                   </Form.Item>
                                   <Form.Item label="Email" name="email">
                                          <Input type="email" />
                                   </Form.Item>
                                   <Form.Item label="Password" name="password">
                                          <Input type="password" />
                                   </Form.Item>
                                   <div className="form-footer">
                                          <Link to="/login">Already Registered? Click Here to Login</Link>
                                          <button className="btn btn-primary">Register</button>
                                   </div>
                            </Form>
                     </div>
              </>
       );
};

export default Register;
