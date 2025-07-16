// UI/Components/Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css'; // We'll create this CSS file

const Footer = () => {
  const links = [
    {
      title: 'Product',
      items: ['Features', 'Pricing', 'API', 'Integrations']
    },
    {
      title: 'Resources',
      items: ['Documentation', 'Blog', 'Guides', 'Help Center']
    },
    {
      title: 'Company',
      items: ['About', 'Careers', 'Privacy', 'Terms']
    }
  ];

  return (
    <footer className="footer">
      <Container>
        <Row className="footer-row">
          {/* First Column - Brand Info */}
          <Col lg={4} md={12} className="footer-brand-col mb-4 mb-lg-0">
            <div className="footer-brand">
              <h3 className="footer-brand-title">AI Visibility Scanner</h3>
              <p className="footer-brand-text">
                Helping businesses stay visible in the age of AI-powered decisions.
              </p>
              <div className="footer-social-links">
                <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                <a href="#" className="social-link"><i className="fab fa-linkedin"></i></a>
                <a href="#" className="social-link"><i className="fab fa-facebook"></i></a>
                <a href="#" className="social-link"><i className="fab fa-github"></i></a>
              </div>
            </div>
          </Col>

          {/* Middle Columns - Links */}
          {links.map((link, index) => (
            <Col key={index} lg={2} md={4} sm={6} className="footer-links-col mb-4 mb-md-0">
              <div className="footer-links">
                <h4 className="footer-links-title">{link.title}</h4>
                <ul className="footer-links-list">
                  {link.items.map((item, i) => (
                    <li key={i} className="footer-links-item">
                      <a href="#" className="footer-link">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          ))}

          {/* Last Column - Contact */}
          <Col lg={2} md={4} sm={6} className="footer-contact-col">
            <div className="footer-contact">
              <h4 className="footer-contact-title">Contact</h4>
              <ul className="footer-contact-list">
                <li className="footer-contact-item">xxx@xxx.xxx</li>
                <li className="footer-contact-item">+x (xxx) xxx-xxx</li>
                <li className="footer-contact-item">Xxx Xxxxxx, Xx</li>
              </ul>
            </div>
          </Col>
        </Row>

        <hr className="footer-divider" />

        <Row className="footer-bottom-row">
          <Col md={12} className="footer-copyright-col">
            <p className="footer-copyright text-center">
              © {new Date().getFullYear()} AI Visibility Scanner. All rights reserved.
            </p>
          </Col>
          {/* <Col md={6} className="footer-credits-col">
            <p className="footer-credits">
              Made with 💗 for the AI future
            </p>
          </Col> */}
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;