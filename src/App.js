import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import './Global.css';

// import './UI/Global.css'; // Your custom CSS should come after Bootstrap

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './UI/LandingPage';
import AuthPage from './UI/Components/Auth/AuthPage';
import WebsiteScanner from './UI/WebsiteScanner';
import History from './UI/History';
import Dashboard from './UI/Dashboard';
import Account from './UI/Account';

function App() {

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<LandingPage />}
        />
        
        <Route path="/auth" element={<AuthPage />} />
        
        <Route path="/scanner" element={<WebsiteScanner />} />

        <Route path="/dashboard" element={<Dashboard />} /> {/* New route */}

        <Route path="/history" element={<History />} /> {/* New route */}
        
        <Route path="/account" element={<Account />} /> {/* New route */}

      </Routes>
    </Router>
  );

}

export default App;
