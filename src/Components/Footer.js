import React from 'react';
import "../Stylesheets/Footer.css";

const Footer = () => {
  return (
    <footer className="bg-footer">
      <div className="footercontainer">
        <div className="footer-content">
          <div className="footer-section">
            <h6 className="footer-heading">Our Company</h6>
            <ul className="footer-link">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Team</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h6 className="footer-heading">Services</h6>
            <ul className="footer-link">
              <li><a href="#">Medicine</a></li>
              <li><a href="#">Healthcare Products</a></li>
              <li><a href="#">Skin Care Products</a></li>
              <li><a href="#">Diabetic Prodducts</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h6 className="footer-heading">Help</h6>
            <ul className="footer-link">
              <li><a href="#">Sign Up &amp;Login</a></li>
              <li><a href="/Privacy Policy">Privacy Policy</a></li>
              <li><a href="#">Terms &amp; Conditions</a></li>
              <li><a href="#">Faq</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h6 className="footer-heading">Contact Us</h6>
            <p className="contact-info">Contact us if you need help with anything</p>
            <p className="contact-info">+01 123-456-7890</p>
            <div className="footer-social">
              <a href="#" className="footer-social-icon facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="footer-social-icon twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" className="footer-social-icon google"><i className="fab fa-google"></i></a>
            </div>
          </div>
        </div>
        <p className="footer-alt">2024 © Pharmpe, All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
