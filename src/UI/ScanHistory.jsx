// src/components/ScanHistory.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, ListGroup, Spinner, Alert, Button, Navbar, Col, Row, Modal } from 'react-bootstrap';
import { supabase } from '../supabaseClient'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';

import './ScanHistory.css';

import NavBar from './Components/Navbar';

const ScanHistory = () => {
  // const [history, setHistory] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [token, setToken] = useState(null);
  // const navigate = useNavigate();

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    const [selectedScan, setSelectedScan] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const navigate = useNavigate();


    const handleViewDetails = (scanEntry) => {
      setSelectedScan(scanEntry);
      setShowDetails(true);
    };

    const handleCloseDetails = () => {
      setShowDetails(false);
      setSelectedScan(null);
    };

  useEffect(() => {
    const fetchSessionAndHistory = async () => {
      setLoading(true);
      setError(null); // Clear previous errors

      try {
        // 1. Get the current Supabase session to retrieve the access token
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
          // If no session, redirect to authentication page
          navigate('/auth');
          return;
        }

        const userToken = session.access_token;
        setToken(userToken); // Store token in state if needed elsewhere

        // 2. Make the API call to your backend
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/scan_history`, {
          headers: {
            Authorization: `Bearer ${userToken}` // Attach the JWT token
          }
        });

        // 3. Set the fetched history data
        setHistory(response.data);

      } catch (err) {
        console.error("Failed to fetch scan history:", err);
        let errorMessage = "An unexpected error occurred while fetching history.";

        if (axios.isAxiosError(err) && err.response) {
          // Backend returned an error response
          if (err.response.status === 401) {
            errorMessage = err.response.data.detail || "Your session has expired. Please sign in again.";
            navigate('/auth'); // Redirect on unauthorized
          } else {
            errorMessage = err.response.data.detail || `Error: ${err.response.status} - ${err.response.statusText}`;
          }
        } else if (axios.isAxiosError(err) && err.request) {
          // Request was made but no response received
          errorMessage = "Network error: Could not connect to the server.";
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionAndHistory();
    
    // Optional: Listen for auth state changes to re-fetch history if token refreshes or user signs out/in
    // const { data: authListener } = supabase.auth.onAuthStateChange(
      const { data: { subscription: authListener } } = supabase.auth.onAuthStateChange(
        (event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          // If a new session or token, re-fetch history
          if (session?.access_token && session.access_token !== token) {
            fetchSessionAndHistory();
          }
        } else if (event === 'SIGNED_OUT') {
          // Clear history and redirect if signed out
          setHistory([]);
          setToken(null);
          navigate('/auth');
        }
      }
    );

    // Cleanup listener on component unmount
    return () => {
      authListener?.unsubscribe();
    };

  }, [navigate, token]); // Re-run if navigate or token changes

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading history...</span>
        </Spinner>
        <p className="mt-3">Loading scan history...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" onClick={() => navigate('/scanner')}>Go to Scanner</Button>
      </Container>
    );
  }

  return (
    <>
    
    

    <Container className="my-5">
      <h2 className="mb-4 text-center">Your Scan History</h2>
      {history.length === 0 ? (
        <Alert variant="info" className="text-center">
          No scan history found. Start a new scan!
          <div className="mt-3">
            <Button variant="primary" onClick={() => navigate('/scanner')}>Go to Scanner</Button>
          </div>
        </Alert>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {history.map((entry) => (
            <div className="col" key={entry.id}>
              <Card className="h-100 shadow-sm">
                <Card.Header className="card_head text-white">
                  <h5 className="mb-0">{entry.website}</h5>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <strong>Company:</strong> {entry.scan_data.company || 'N/A'} <br />
                    <strong>Scanned On:</strong> {new Date(entry.created_at).toLocaleString()}
                  </Card.Text>
                  <Card.Title className="text-center mt-3">
                    AI Score: <span className="fw-bold text-success">{entry.scan_data.score}/100</span>
                  </Card.Title>
                  
                  {/* <h6 className="mt-4">Reasons:</h6>
                  <ListGroup variant="flush" className="mb-3">
                    {entry.scan_data.reasons.map((reason, idx) => (
                      <ListGroup.Item key={idx}>{reason}</ListGroup.Item>
                    ))}
                  </ListGroup>
                  <h6>Improvements:</h6>
                  <ListGroup variant="flush">
                    {entry.scan_data.improvements.map((imp, idx) => (
                      <ListGroup.Item key={idx} className="list-group-item-success">{imp}</ListGroup.Item>
                    ))}
                  </ListGroup>

                   */}
                </Card.Body>

                <Card.Footer>
                  <div className="row row-cols-1 row-cols-md-2 g-4">
                    <div className='p-2'>
                      <Button className='btn-primary w-100' onClick={() => handleViewDetails(entry)}>View Details</Button>
                    </div>
                    <div className='p-2'>
                      <Button className='btn-secondary w-100' disabled>Export PDF</Button>
                    </div>
                  </div>
                </Card.Footer>

              </Card>
            </div>
          ))}
        </div>
      )}
    </Container>
    


    {/* Details Modal */}
      <Modal 
        show={showDetails} 
        onHide={handleCloseDetails}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Scan Details: {selectedScan?.website}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedScan && (
            <>
              <Row className="mb-3">
                <Col md={6}>
                  <h5>Basic Information</h5>
                  <p><strong>Website:</strong> {selectedScan.website}</p>
                  <p><strong>Company:</strong> {selectedScan.scan_data.company || 'N/A'}</p>
                  <p><strong>Scan Date:</strong> {new Date(selectedScan.created_at).toLocaleString()}</p>
                </Col>
                <Col md={6} className="text-center">
                  <h3>AI Score</h3>
                  <div className="display-4 text-success fw-bold">
                    {selectedScan.scan_data.score}/100
                  </div>
                </Col>
              </Row>

              <hr />

              <h5 className="mt-4">Analysis Results</h5>
              <Row>
                <Col md={6}>
                  <h6 className="text-danger">Potential Issues:</h6>
                  <ListGroup variant="flush" className="mb-3">
                    {selectedScan.scan_data.reasons?.map((reason, idx) => (
                      <ListGroup.Item key={`reason-${idx}`} className="text-danger">
                        {reason}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
                <Col md={6}>
                  <h6 className="text-success">Recommended Improvements:</h6>
                  <ListGroup variant="flush">
                    {selectedScan.scan_data.improvements?.map((imp, idx) => (
                      <ListGroup.Item key={`imp-${idx}`} className="text-success">
                        {imp}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
              </Row>

              {selectedScan.scan_data.additional_details && (
                <>
                  <hr />
                  <h5>Additional Details</h5>
                  <div className="p-3 bg-light rounded">
                    <pre>{JSON.stringify(selectedScan.scan_data.additional_details, null, 2)}</pre>
                  </div>
                </>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


    
    </>
  );
};

export default ScanHistory;