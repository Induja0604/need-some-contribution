import React, { useState, useRef,useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import close from "../Assets/Close.png";
import "../Stylesheets/homepage.css";
import '../Stylesheets/Navbar.css';
import { memo } from "react";

const NavItem = memo(({ name, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <li 
      className="nav-item"   
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <a>{name}</a>
      { isOpen && items && (
        <ul className="dropdown">
          {items.map((item, index) => (
            <li key={index}><Link className="link-component" to={item.link}>{item.name}</Link></li>
          ))}
        </ul>
      )}
    </li>
  );
});

const Navbar =() => {
  const bottomNavItems = [
    { name: 'Home', items: [{ name: 'Profile', link: '/profile' },
      { name: 'Recent orders', link: '/recentorders' }] },
    { name: 'Medicine' },
    { name: 'Health care' },
    { name: 'Health Blogs' ,items: [{ name: 'Privacy Policy', link: '/Privacy Policy' }] },
    { name: 'Value Store' },
    { name: 'Offers' },
    { name: 'Cart',items: [{ name: 'cartdetails', link: '/cartdetails' }]  },
  ];
  const [phoneNumber, setPhoneNumber] = useState("");
  const [OTP, setOTP] = useState("");
  const [formVar, setFormVar] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem('user') || 'Login/Signup');
  const popupRef = useRef(null);
  const overlayRef = useRef(null);

  const sendOtp = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3005/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });
      const data = await response.json();
      console.log('OTP sent:', data);
      setFormVar(false);
    } catch (error) {
      console.error('Error sending OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3005/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, code: OTP }),
      });
      const data = await response.text();
      console.log('Verification result:', data);
      if (data === 'Verification successful') {
        // Fetch user info from MongoDB
        const userInfoResponse = await fetch(`http://localhost:3005/login/${phoneNumber}`);
        const userInfo = await userInfoResponse.json();
      if (userInfoResponse.status === 200) {
        console.log('User information:', userInfo);
        localStorage.setItem('user', phoneNumber);
        localStorage.setItem('userid', userInfo[0]._id);
        setUser(phoneNumber);
        window.location.href = '/';           
      }
      else {
        alert('User information not found.');
    }
     } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePopup = (isVisible) => {
    popupRef.current.style.display = isVisible ? 'block' : 'none';
    overlayRef.current.style.display = isVisible ? 'block' : 'none';
  };

  return (
    <div>
      <div className="top_nav">
        <div className="left">
          <div className="logo">
          <Link  to="/" style={{textDecoration:"none"}}>  <p><span><a href='#'>Pharm</a></span>pe</p></Link>
          </div>
        </div>
        <div className="right">
          <ul>
            {user === 'Login/Signup' && <li><a href="#" onClick={() => togglePopup(true)}>LogIn/SignUp</a></li>}
            {user !== 'Login/Signup' && <li><a href={`/profile?user=${localStorage.getItem('userid')}`}>Profile</a></li>}
          </ul>
        </div>
      </div>
      <div className="bottom_nav">
        <ul>
          {bottomNavItems.map((item, index) => (
            <NavItem key={index} name={item.name} items={item.items} />
          ))}
        </ul>
      </div>

      <div className="overlay" ref={overlayRef} onClick={() => togglePopup(false)}></div>
      <div className="popup" ref={popupRef}>
        <div className="loginhead">
          <img className="crossingbutton" onClick={() => togglePopup(false)} src={close} alt="Close" />
          <h1>Login/Signup to continue with your order</h1>
        </div>
        <div className="popup-content">
          {isLoading && <div className="loading">Loading...</div>}
          {!isLoading && formVar && (
            <form onSubmit={sendOtp}>
              <div className="loginformbox">
                <label htmlFor="phoneNumber" className="loginlabel">Enter your mobile number</label>
                <input 
                  type="tel" 
                  name="phoneNumber" 
                  className="addressinput" 
                  placeholder="Mobile Number*" 
                  value={phoneNumber} 
                  onChange={(e) => setPhoneNumber(e.target.value)} 
                  required 
                /><br />
                <button className="add-new-address" type="submit">Send OTP</button>
              </div>
              <div>By continuing, you agree with our Privacy Policy and Terms and Conditions</div>
            </form>
          )}
          {!isLoading && !formVar && (
            <form onSubmit={verifyOtp}>
              <div className="loginformbox">
                <label htmlFor="OTP" className="loginlabel">Enter OTP sent to your mobile*</label>
                <input 
                  type="text" 
                  name="OTP" 
                  className="addressinput" 
                  placeholder="OTP*" 
                  value={OTP} 
                  onChange={(e) => setOTP(e.target.value)} 
                  required 
                /><br />
                <button className="add-new-address" type="submit">Continue</button>
              </div>
              <div>By continuing, you agree with our Privacy Policy and Terms and Conditions</div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
