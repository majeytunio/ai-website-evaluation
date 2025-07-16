// import React, { useEffect, useState } from 'react';
// import { Navbar, Nav, Container, Button } from 'react-bootstrap';
// import './Navbar.css';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '../../supabaseClient';
// import { FiLogOut } from 'react-icons/fi'; // Logout icon

// const NavBar = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Get current user on load
//     supabase.auth.getUser().then(({ data }) => {
//       setUser(data.user);
//     });

//     // Listen for login/logout events
//     const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
//       setUser(session?.user || null);
//     });

//     return () => {
//       listener.subscription.unsubscribe();
//     };
//   }, []);

//   const handleStartScan = () => {
//     if (user) {
//       navigate('/scanner');
//     } else {
//       navigate('/auth');
//     }
//   };

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     setUser(null);
//     navigate('/');
//   };

//   return (
//     <Navbar expand="lg" variant="dark" className="ai-navbar sticky-top">
//       <Container>
//         <Navbar.Brand href="/">
//           <img 
//             src="./logo192.png" 
//             alt="AI Visibility" 
//             width="40" 
//             height="40" 
//             className="d-inline-block align-top me-2"
//           />
//           <span className="ai-navbar-brand-text">AI Visibility</span>
//         </Navbar.Brand>
        
//         <Navbar.Toggle aria-controls="main-navbar" />
        
//         <Navbar.Collapse id="main-navbar">
//           <Nav className="ms-auto align-items-center">
//             <Nav.Link href="/#why">Why This Matters</Nav.Link>
//             <Nav.Link href="/#pricing-plans">Pricing</Nav.Link>
//             <Nav.Link href="/#contact">Contact</Nav.Link>

//             <Button 
//               variant="light" 
//               size="sm" 
//               className="ms-3 ai-navbar-button"
//               onClick={handleStartScan}
//             >
//               Start Free Scan
//             </Button>

//             {user && (
//               <Button 
//                 variant="outline-light" 
//                 size="sm" 
//                 className="ms-2 text-center"
//                 style={{
//                   "border-radius": "100%", 
//                   "width":"35px",
//                   "height":"35px"
//                 }}
//                 onClick={handleLogout}
//                 title="Logout"
//               >
//                 <FiLogOut />
//               </Button>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default NavBar;








import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button, Dropdown, Image } from 'react-bootstrap';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { FiUser, FiLogOut, FiClock, FiUserCheck } from 'react-icons/fi';

const NavBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get current user on load
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // Listen for login/logout events
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleStartScan = () => {
    if (user) {
      navigate('/scanner');
    } else {
      navigate('/auth');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/');
  };

  const handleHistory = () => {
    navigate('/history');
  };

  const handleAccount = () => {
    navigate('/account'); // Optional: create an account page if needed
  };

  return (
    <Navbar expand="lg" variant="dark" className="ai-navbar sticky-top">
      <Container>
        <Navbar.Brand href="/">
          <img 
            src="./logo192.png" 
            alt="AI Visibility" 
            width="40" 
            height="40" 
            className="d-inline-block align-top me-2"
          />
          <span className="ai-navbar-brand-text">AI Visibility</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="main-navbar" />
        
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="/#why">Why This Matters</Nav.Link>
            <Nav.Link href="/#pricing-plans">Pricing</Nav.Link>
            <Nav.Link href="/#contact">Contact</Nav.Link>

            <Button 
              variant="light" 
              size="sm" 
              className="ms-3 ai-navbar-button"
              onClick={handleStartScan}
            >
              Start Free Scan
            </Button>

            {user && (
              <Dropdown align="end" className="ms-3">
                <Dropdown.Toggle variant="outline-light" size="sm" className="d-flex align-items-center" style={{ borderRadius: '50%', width: '40px', height: '40px', padding: '0' }}>
                  <FiUser size={20} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleHistory}>
                    <FiClock className="me-2" />
                    Scan History
                  </Dropdown.Item>

                  <Dropdown.Item onClick={handleAccount}>
                    <FiUserCheck className="me-2" />
                    My Account
                  </Dropdown.Item>

                  <Dropdown.Divider />

                  <Dropdown.Item onClick={handleLogout}>
                    <FiLogOut className="me-2" />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
