import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Spinner, Alert } from 'react-bootstrap';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import NavBar from './Components/Navbar';

const Account = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // CHANGE PASSWORD
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);


  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        navigate('/auth');
        return;
      }

      setEmail(user.email);
      setFullName(user.user_metadata.full_name || '');
      setLoading(false);
    };

    fetchProfile();
  }, [navigate]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage('');

    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName }
    });

    if (error) {
      alert("Failed to update profile. Please try again.");
    } else {
      setSuccessMessage('Profile updated successfully!');
    }

    setSaving(false);
  };


  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    setChangingPassword(true);

    const { error } = await supabase.auth.updateUser({
        password: newPassword
    });

    if (error) {
        alert("Failed to change password. Please try again.");
    } else {
        alert("Password changed successfully!");
        setNewPassword('');
        setConfirmPassword('');
    }

    setChangingPassword(false);
    };


  return (
    <>
      <NavBar />
      <Container className="my-5">
        <Card className="shadow-lg p-4 rounded-4" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <Card.Body>
            <h2 className="text-center mb-4">My Account</h2>

            {loading ? (
              <div className="text-center">
                <Spinner animation="border" role="status" />
              </div>
            ) : (
              <Form onSubmit={handleSave}>
                <Form.Group className="mb-3">
                  <Form.Label>Email (cannot change)</Form.Label>
                  <Form.Control type="email" value={email} disabled />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100 fw-bold" disabled={saving}>
                  {saving ? <Spinner size="sm" animation="border" className="me-2" /> : null}
                  {saving ? "Saving..." : "Save Changes"}
                </Button>

                {successMessage && (
                  <Alert variant="success" className="mt-3 text-center">
                    {successMessage}
                  </Alert>
                )}



                <hr className="my-4" />
                <h5 className="text-center mb-3">Change Password</h5>

                <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Enter new password" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required={false}
                />
                </Form.Group>

                <Form.Group className="mb-4">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Confirm new password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required={false}
                />
                </Form.Group>

                <Button 
                variant="warning" 
                className="w-100 fw-bold mb-2" 
                onClick={handleChangePassword}
                disabled={changingPassword}
                >
                {changingPassword ? <Spinner size="sm" animation="border" className="me-2" /> : null}
                {changingPassword ? "Changing..." : "Change Password"}
                </Button>
              </Form>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Account;
