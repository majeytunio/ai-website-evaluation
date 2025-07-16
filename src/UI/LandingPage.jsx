// UI/LandingPage.jsx
import React from 'react';

import NavBar from './Components/Navbar';
import Header from './Components/Header';
import WhyThisMatters from './Components/WhyThisMatters';
import PricingPlans from './Components/PricingPlans';
import Footer from './Components/Footer';

const LandingPage = () => {
  return (
    <div>
      <NavBar />
      <Header />
      <WhyThisMatters />
      <PricingPlans />
      <Footer />
    </div>
  );
};

export default LandingPage;
