import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Header.css'; // Make sure to create and import your CSS file

const Header = () => {
       const navigate = useNavigate();
       const [loginUser, setLoginUser] = useState('');

       useEffect(() => {
              const user = JSON.parse(localStorage.getItem('user'));
              if (user) {
                     setLoginUser(user);
              }
       }, []);

       const logoutHandler = () => {
              localStorage.removeItem('user');
              navigate('/login');
              message.success("Logout Success");
       };

       return (
              <nav className="navbar navbar-expand-lg navbar-light bg-light custom-navbar">
                     <div className="container-fluid">
                            <Link className="navbar-brand custom-navbar-brand" to="/">
                                   TrackMyMoney
                            </Link>
                            <button
                                   className="navbar-toggler"
                                   type="button"
                                   data-bs-toggle="collapse"
                                   data-bs-target="#navbarTogglerDemo01"
                                   aria-controls="navbarTogglerDemo01"
                                   aria-expanded="false"
                                   aria-label="Toggle navigation"
                            >
                                   <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                                   <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                          <li className="nav-item d-flex align-items-center">
                                                 <UserOutlined />
                                                 <p className="nav-link mb-0 ms-2">{loginUser && loginUser.name}</p>
                                          </li>
                                          <li className="nav-item">
                                                 <button className="btn btn-primary custom-logout-btn" onClick={logoutHandler}>
                                                        Logout
                                                 </button>
                                          </li>
                                   </ul>
                            </div>
                     </div>
              </nav>
       );
}

export default Header;
