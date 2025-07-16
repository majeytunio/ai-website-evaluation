// // UI/Components/PricingPlans.jsx
// import React from 'react';
// import { Container, Row, Col, Card, Button } from 'react-bootstrap';
// import './PricingPlans.css'; // Create this CSS file

// const PricingPlans = () => {
//   const plans = [
//     {
//       name: 'Starter',
//       price: 'Free Forever',
//       features: [
//         '1 Free AI Visibility Scan',
//         'Basic Visibility Score',
//         'Limited Recommendations',
//         'No PDF Report or Fix Guidance',
//         'Upgrade anytime'
//       ],
//       cta: 'Get Started',
//       variant: 'outline-primary',
//       popular: false
//     },
//     {
//       name: 'Pro',
//       price: '$29/month',
//       features: [
//         '5 AI Visibility Scans/Month',
//         'Full Visibility Score & Breakdown',
//         'GPT-Powered Fix Recommendations',
//         'Downloadable PDF Reports',
//         'Priority Email Support'
//       ],
//       cta: 'Start 7-Day Trial',
//       variant: 'primary',
//       popular: true
//     },
//     {
//       name: 'Business',
//       price: '$99/month',
//       features: [
//         '20 Scans/Month',
//         'Team Member Access',
//         'Advanced Fix Suggestions + AI Templates',
//         'Competitor Visibility Benchmarking',
//         'Premium Support + Roadmap Priority'
//       ],
//       cta: 'Contact Sales',
//       variant: 'dark',
//       popular: false
//     }
//   ];

//   return (
//     <section className="pricing-plans py-5 bg-light" id='pricing-plans'>
//       <Container>
//         <div className="text-center mb-5">
//           <span className="section-badge">PRICING PLANS</span>
//           <h2 className="section-title mt-3 mb-3">
//             Simple Pricing for Every Business Need
//           </h2>
//           <p className="section-subtitle">
//             Start small and upgrade as you grow. No contracts, cancel anytime.
//           </p>
//         </div>
        
//         <Row className="g-4 justify-content-center">
//           {plans.map((plan, index) => (
//             <Col key={index} lg={4} md={6} className="d-flex">
//               <Card className={`pricing-card w-100 ${plan.popular ? 'popular' : ''}`}>
//                 {plan.popular && (
//                   <div className="popular-badge">Most Popular</div>
//                 )}
//                 <Card.Body className="p-4 d-flex flex-column">
//                   <div className="d-flex justify-content-between align-items-start mb-3">
//                     <div>
//                       <h3 className="plan-name mb-1">{plan.name}</h3>
//                       <p className="plan-price">{plan.price}</p>
//                     </div>
//                     <div className="plan-icon">
//                       {index === 0 && '🟢'}
//                       {index === 1 && '🔵'}
//                       {index === 2 && '🟣'}
//                     </div>
//                   </div>
//                   <ul className="feature-list mb-4">
//                     {plan.features.map((feature, i) => (
//                       <li key={i} className="d-flex mb-2">
//                         <span className="me-2">✅</span>
//                         <span>{feature}</span>
//                       </li>
//                     ))}
//                   </ul>
//                   <Button 
//                     variant={plan.variant} 
//                     size="lg" 
//                     className="mt-auto"
//                   >
//                     {plan.cta}
//                   </Button>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
        
//         <div className="text-center mt-5">
//           <p className="guarantee-text">
//             <i className="fas fa-lock-open me-2"></i> All plans include a 30-day money back guarantee
//           </p>
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default PricingPlans;









import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient'
import './PricingPlans.css';

// Initialize Stripe outside component
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PricingPlans = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const handlePlanSelect = async (planName) => {
    setLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth'); // Now properly defined
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/create-subscription-session`,
        { plan: planName },
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const stripe = await stripePromise;
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: response.data.id
      });

      if (stripeError) throw stripeError;

    } catch (err) {
      console.error("Checkout failed:", err);
      setError(err.response?.data?.detail || err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const plans = [
    {
      name: 'Starter',
      price: 'Free Forever',
      features: [
        '1 Free AI Visibility Scan',
        'Basic Visibility Score',
        'Limited Recommendations',
        'No PDF Report or Fix Guidance',
        'Upgrade anytime'
      ],
      cta: 'Get Started',
      variant: 'outline-primary',
      popular: false,
      action: () => handlePlanSelect('starter')
    },
    {
      name: 'Pro',
      price: '$29/month',
      features: [
        '5 AI Visibility Scans/Month',
        'Full Visibility Score & Breakdown',
        'GPT-Powered Fix Recommendations',
        'Downloadable PDF Reports',
        'Priority Email Support'
      ],
      cta: loading ? 'Processing...' : 'Start 7-Day Trial',
      variant: 'primary',
      popular: true,
      action: () => handlePlanSelect('pro')
    },
    {
      name: 'Business',
      price: '$99/month',
      features: [
        '20 Scans/Month',
        'Team Member Access',
        'Advanced Fix Suggestions + AI Templates',
        'Competitor Visibility Benchmarking',
        'Premium Support + Roadmap Priority'
      ],
      cta: loading ? 'Processing...' : 'Contact Sales',
      variant: 'dark',
      popular: false,
      action: () => handlePlanSelect('business')
    }
  ];

  return (
    <section className="pricing-plans py-5 bg-light" id='pricing-plans'>
      <Container>
        {error && (
          <Alert variant="danger" onClose={() => setError(null)} dismissible>
            {error}
          </Alert>
        )}
        
        <div className="text-center mb-5">
          <span className="section-badge">PRICING PLANS</span>
          <h2 className="section-title mt-3 mb-3">
            Simple Pricing for Every Business Need
          </h2>
          <p className="section-subtitle">
            Start small and upgrade as you grow. No contracts, cancel anytime.
          </p>
        </div>
        
        <Row className="g-4 justify-content-center">
          {plans.map((plan, index) => (
            <Col key={index} lg={4} md={6} className="d-flex">
              <Card className={`pricing-card w-100 ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && (
                  <div className="popular-badge">Most Popular</div>
                )}
                <Card.Body className="p-4 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h3 className="plan-name mb-1">{plan.name}</h3>
                      <p className="plan-price">{plan.price}</p>
                    </div>
                    <div className="plan-icon">
                      {index === 0 && '🟢'}
                      {index === 1 && '🔵'}
                      {index === 2 && '🟣'}
                    </div>
                  </div>
                  <ul className="feature-list mb-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="d-flex mb-2">
                        <span className="me-2">✅</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant={plan.variant} 
                    size="lg" 
                    className="mt-auto"
                    onClick={plan.action}
                    disabled={loading}
                  >
                    {plan.cta}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        
        <div className="text-center mt-5">
          <p className="guarantee-text">
            <i className="fas fa-lock-open me-2"></i> All plans include a 30-day money back guarantee
          </p>
        </div>
      </Container>
    </section>
  );
};

export default PricingPlans;