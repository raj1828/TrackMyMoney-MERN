import React from 'react'
import Header from './Header'
import Footer from './Footer'
import './Layout.css'; // Import the CSS file

const Layout = ({ children }) => {
       return (
              <div className="layout-container">
                     <Header />
                     <div className="content">{children}</div>
                     <Footer />
              </div>
       )
}

export default Layout
