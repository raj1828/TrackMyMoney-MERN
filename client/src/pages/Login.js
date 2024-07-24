import React, { useState, useEffect } from 'react';
import { Form, Input, message } from "antd";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import './Login.css'; // Make sure to create this CSS file

const Login = () => {
       const [loading, setLoading] = useState(false);
       const navigate = useNavigate();

       // Form submit
       const submitHandler = async (values) => {
              try {
                     setLoading(true);
                     const { data } = await axios.post('https://trackmymoney-mern.onrender.com/api/v1/users/login', values);
                     setLoading(false);
                     localStorage.setItem('user', JSON.stringify({ ...data.user, password: "" }));
                     message.success("Login Successfully");
                     navigate('/');
              } catch (error) {
                     setLoading(false);
                     message.error("Login Failed");
              }
       };

       // Prevent login if already logged in
       useEffect(() => {
              if (localStorage.getItem("user")) {
                     navigate("/");
              }
       }, [navigate]);

       return (
              <div className="login-container">
                     {loading && <Spinner />}
                     <header className="login-header">
                            <h1>TrackMyMoney</h1>
                     </header>
                     <div className="login-form-container">
                            <Form layout="vertical" onFinish={submitHandler}>
                                   <Form.Item
                                          label="Email"
                                          name="email"
                                          rules={[
                                                 { required: true, message: 'Please enter your email!' },
                                                 { type: 'email', message: 'Please enter a valid email!' }
                                          ]}
                                   >
                                          <Input type="email" />
                                   </Form.Item>
                                   <Form.Item
                                          label="Password"
                                          name="password"
                                          rules={[{ required: true, message: 'Please enter your password!' }]}
                                   >
                                          <Input type="password" />
                                   </Form.Item>
                                   <div className="form-footer">
                                          <Link to="/register">Not a User? Click Here to Register</Link>
                                          <button type="submit" className="btn btn-primary">Login</button>
                                   </div>
                            </Form>
                     </div>
              </div>
       );
}

export default Login;
