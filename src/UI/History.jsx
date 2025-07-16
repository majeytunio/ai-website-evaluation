// src/components/ScanHistory.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, ListGroup, Spinner, Alert, Button, Navbar, Col, Row, Modal } from 'react-bootstrap';
import { supabase } from '../supabaseClient'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';

import './ScanHistory.css';

import NavBar from './Components/Navbar';
import ScanHistory from './ScanHistory';

const History = () => {
  return (
    <>
    <NavBar />
    <ScanHistory />
    </>
  );
};

export default History;