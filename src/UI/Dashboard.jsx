// UI/LandingPage.jsx
import React from 'react';

import NavBar from './Components/Navbar';
import Header from './Components/Header';
import WhyThisMatters from './Components/WhyThisMatters';
import PricingPlans from './Components/PricingPlans';
import Footer from './Components/Footer';
import ScanHistory from './ScanHistory';

const Dashboard = () => {
  return (
    <div>
      <NavBar />
      <ScanHistory />
      <Footer />
    </div>
  );
};

export default Dashboard;
