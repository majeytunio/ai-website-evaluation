// UI/Components/WhyThisMatters.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './WhyThisMatters.css'; // Create this CSS file

const WhyThisMatters = () => {
  const features = [
    {
      icon: '🤖',
      title: 'AI is the New Search',
      description: 'Over 40% of users now consult AI before making purchase decisions'
    },
    {
      icon: '👁️',
      title: 'Visibility Gap',
      description: 'Most businesses are invisible to AI assistants - missing key opportunities'
    },
    {
      icon: '📈',
      title: 'Early Advantage',
      description: 'Businesses optimizing now gain a lasting edge in AI recommendations'
    }
  ];

  return (
    <section className="why-this-matters py-5" id='why'>
      <Container>
        <div className="text-center mb-5">
          <span className="section-badge">WHY THIS MATTERS</span>
          <h2 className="section-title mt-3 mb-4">
            The Silent Shift to AI-Powered Decisions
          </h2>
          <p className="section-subtitle">
            ChatGPT, Claude, Gemini and other AI tools are reshaping how customers discover and choose businesses. 
          </p>
        </div>
        
        <Row className="g-4 justify-content-center">
          {features.map((feature, index) => (
            <Col key={index} lg={4} md={6} className="d-flex">
              <div className="feature-card w-100 p-4">
                <div className="feature-icon mb-3">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default WhyThisMatters;