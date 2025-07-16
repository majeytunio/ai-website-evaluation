// import React, { useState, useEffect } from 'react';
// import { Container, Modal, Alert, Form, Button, ProgressBar, Card, ListGroup } from 'react-bootstrap';
// import axios from 'axios';
// import './WebsiteScanner.css';
// import { supabase } from '../supabaseClient'; // Adjust path if needed
// import { useNavigate } from 'react-router-dom';

// const WebsiteScanner = () => {
//   const [website, setWebsite] = useState('');
//   const [company, setCompany] = useState('');
//   const [description, setDescription] = useState('');

//   const [loading, setLoading] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [result, setResult] = useState(null);

//   const [token, setToken] = useState(null);
//   const navigate = useNavigate();

//   // State for the alert dialog
//   const [showErrorModal, setShowErrorModal] = useState(false);
//   const [errorTitle, setErrorTitle] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
    
//   useEffect(() => {
//     // Check auth on mount
//     const checkAuth = async () => {
//     //   const sessionResponse = await supabase.auth.getSession();
//     //   const session = sessionResponse.data.session;

//       const { data: { session } } = await supabase.auth.getSession();

//       if (!session) {
//         navigate('/auth');
//       } else {
//         setToken(session.access_token);
//       }
//     };

//     checkAuth();
//   }, [navigate]);

//   const handleScan = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setProgress(10);
//     setResult(null);

//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/scan_website`, {
//         website,
//         company,
//         description
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       setProgress(100);
//       setResult(response.data);
//     } catch (err) {
//       console.error("Scan error:", err); // Log the full error for debugging

//       let title = "Scan Failed 😔";
//       let message = "An unexpected error occurred. Please try again.";

//       if (err.response) {
//         // Backend returned an error response (e.g., 4xx, 5xx)
//         if (err.response.status === 429) {
//           title = "Daily Scan Limit Reached ⛔";
//           message = err.response.data.detail || "You have exceeded your daily scan limit. Please upgrade your plan or try again tomorrow.";
//         } else if (err.response.status === 401) {
//           title = "Authentication Required 🔑";
//           message = err.response.data.detail || "Your session has expired or is invalid. Please sign in again.";
//           navigate('/auth'); // Redirect to auth page for 401 errors
//         } else if (err.response.status === 503) {
//           title = "AI Service Unavailable 🤖";
//           message = err.response.data.detail || "The AI service is currently unavailable. Please try again later.";
//         } else if (err.response.data && err.response.data.detail) {
//           // General backend error with a specific message
//           message = err.response.data.detail;
//         }
//       } else if (err.request) {
//         // Request was made but no response received (e.g., network error)
//         title = "Network Error 🌐";
//         message = "Could not connect to the server. Please check your internet connection or try again later.";
//       }

//       setErrorTitle(title);
//       setErrorMessage(message);
//       setShowErrorModal(true); // Show the modal
//       setProgress(0);
//     } finally {
//       setLoading(false); // Ensure loading is always set to false
//     }
//   };

//   return (
//     <Container className="my-5">
//       <h2 className="mb-4 text-center">AI Visibility Scanner</h2>

//       <Form onSubmit={handleScan}>
//         <Form.Group className="mb-3">
//           <Form.Label>Website URL</Form.Label>
//           <Form.Control 
//             type="url" 
//             placeholder="https://example.com" 
//             value={website} 
//             onChange={(e) => setWebsite(e.target.value)} 
//             required 
//           />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Company Name</Form.Label>
//           <Form.Control 
//             type="text" 
//             placeholder="Company Name" 
//             value={company} 
//             onChange={(e) => setCompany(e.target.value)} 
//             required 
//           />
//         </Form.Group>

//         <Form.Group className="mb-4">
//           <Form.Label>Company Description</Form.Label>
//           <Form.Control 
//             as="textarea" 
//             rows={3} 
//             placeholder="What does your company do?" 
//             value={description} 
//             onChange={(e) => setDescription(e.target.value)} 
//             required 
//           />
//         </Form.Group>

//         <Button type="submit" variant="primary" disabled={loading} className="w-100 fw-bold">
//           {loading ? "Scanning..." : "Start AI Visibility Scan"}
//         </Button>
//       </Form>

//       {loading && (
//         <div className="mt-4">
//           <ProgressBar animated now={progress} label={`${progress}%`} />
//         </div>
//       )}

//       {result && (
//         <Card className="mt-5 shadow-lg animated-result">
//           <Card.Body>
//             <Card.Title className="text-center mb-4">
//               AI Visibility Score: <span className="fw-bold text-success">{result.score}/100</span>
//             </Card.Title>

//             <h5>Why this score?</h5>
//             <ListGroup className="mb-3">
//               {result.reasons.map((reason, idx) => (
//                 <ListGroup.Item key={idx}>{reason}</ListGroup.Item>
//               ))}
//             </ListGroup>

//             <h5>Recommended Improvements</h5>
//             <ListGroup variant="flush">
//               {result.improvements.map((imp, idx) => (
//                 <ListGroup.Item key={idx} className="list-group-item-success">{imp}</ListGroup.Item>
//               ))}
//             </ListGroup>
//           </Card.Body>
//         </Card>
//       )}

//       {/* Error Modal */}
//       <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>{errorTitle}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Alert variant="danger">
//             {errorMessage}
//           </Alert>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>

//     </Container>
//   );
// };

// export default WebsiteScanner;















import React, { useState, useEffect } from 'react';
import { Container, Modal, Alert, Form, Button, ProgressBar, Card, ListGroup, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';
import './WebsiteScanner.css';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import NavBar from './Components/Navbar';

const WebsiteScanner = () => {
  const [website, setWebsite] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);

  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
      } else {
        setToken(session.access_token);
      }
    };
    checkAuth();
  }, [navigate]);

  const handleScan = async (e) => {
    e.preventDefault();
    setLoading(true);
    setProgress(10);
    setResult(null);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/scan_website`, {
        website,
        company,
        description
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setProgress(100);
      setResult(response.data);
    } catch (err) {
      console.error("Scan error:", err);
      let title = "Scan Failed 😔";
      let message = "An unexpected error occurred. Please try again.";

      if (err.response) {
        if (err.response.status === 429) {
          title = "Daily Scan Limit Reached ⛔";
          message = err.response.data.detail || "You have exceeded your daily scan limit. Please upgrade your plan.";
        } else if (err.response.status === 401) {
          title = "Authentication Required 🔑";
          message = err.response.data.detail || "Your session has expired. Please sign in again.";
          navigate('/auth');
        } else if (err.response.status === 503) {
          title = "AI Service Unavailable 🤖";
          message = err.response.data.detail || "The AI service is currently unavailable.";
        } else if (err.response.data && err.response.data.detail) {
          message = err.response.data.detail;
        }
      } else if (err.request) {
        title = "Network Error 🌐";
        message = "Could not connect to the server. Please check your internet.";
      }

      setErrorTitle(title);
      setErrorMessage(message);
      setShowErrorModal(true);
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <Container className="my-5">
        <Row>
          <Col md={result ? 6 : 8} lg={result ? 5 : 6}>
            <Card className="shadow-lg p-4 rounded-4">
              <Card.Header className='card_head'>
                <h2 className="text-center display-8 text-white fw-bold">AI Visibility Scanner</h2>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleScan}>
                  <Form.Group className="mb-3">
                    <Form.Label>Website URL</Form.Label>
                    <Form.Control
                      type="url"
                      placeholder="https://example.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Company Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Company Name"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Company Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="What does your company do?"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button type="submit" variant="primary" disabled={loading} className="w-100 fw-bold">
                    {loading ? <Spinner size="sm" animation="border" className="me-2" /> : null}
                    {loading ? "Scanning..." : "Start AI Visibility Scan"}
                  </Button>
                </Form>

                {loading && (
                  <div className="mt-4">
                    <ProgressBar animated now={progress} label={`${progress}%`} />
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          {result && (
            <Col md={6} lg={7} className="mt-4 mt-md-0">
              <Card className="shadow-lg p-4 animated-result rounded-4">
                <Card.Body>
                  <h3 className="text-center mb-4 text-success fw-bold">
                    AI Visibility Score: <span className="display-6">{result.score}/100</span>
                  </h3>

                  <Row>
                    <Col md={6}>
                      <h5 className="text-danger">Why this score?</h5>
                      <ListGroup variant="flush" className="mb-3">
                        {result.reasons.map((reason, idx) => (
                          <ListGroup.Item key={idx} className="text-danger-emphasis">
                            {reason}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Col>
                    <Col md={6}>
                      <h5 className="text-success">Recommended Improvements</h5>
                      <ListGroup variant="flush">
                        {result.improvements.map((imp, idx) => (
                          <ListGroup.Item key={idx} className="list-group-item-success">
                            {imp}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <div className="row row-cols-1 row-cols-md-2 g-4">
                    <div className='p-2'>
                      <Button className='btn-primary w-100'>View History</Button>
                    </div>
                    <div className='p-2'>
                      <Button className='btn-secondary w-100' disabled>Export PDF</Button>
                    </div>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          )}
        </Row>

        {/* Error Modal */}
        <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{errorTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Alert variant="danger" className="text-center">
              <strong>{errorMessage}</strong>
            </Alert>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default WebsiteScanner;
