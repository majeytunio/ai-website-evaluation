// // src/components/SignupForm.jsx

// import React, { useState } from 'react';
// import { supabase } from '../../../supabaseClient';
// import { useNavigate } from 'react-router-dom';

// const SignupForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [company, setCompany] = useState('');
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password
//     });

//     if (error) {
//       alert(error.message);
//       return;
//     }

//     // Optional: Call your FastAPI to create profile
//     await fetch('http://localhost:8000/signup', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         email,
//         password,
//         company_name: company
//       })
//     });

//     alert('Signup complete! Please check your email to confirm.');
//     navigate('/dashboard');
//   };

//   return (
//     <form onSubmit={handleSignup}>
//       <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
//       <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
//       <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company Name" />
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// };

// export default SignupForm;








// src/components/SignupForm.jsx

import React, { useState } from 'react';
import { supabase } from '../../../supabaseClient'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      // Call the backend /signup endpoint to handle both user auth and profile creation
      const response = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          company_name: company,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle errors returned from the FastAPI backend
        setError(result.detail || 'An unexpected error occurred during signup.');
        return;
      }

      // Success message from backend
      setMessage(result.message);

      // Optionally, if your flow allows, navigate to sign-in or a confirmation page
      // It's generally better to let the user confirm email before redirecting to dashboard.
      if (result.message.includes("check your email to confirm")) {
          navigate('/confirm-email-pending'); // A dedicated page for "check your email"
      } else {
          // If for some reason email confirmation is off, and user is ready to sign in
          navigate('/signin'); 
      }

    } catch (fetchError) {
      console.error('Error calling backend /signup:', fetchError);
      setError('Network error or server unavailable. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Sign Up</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
        required
        disabled={loading}
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        required
        disabled={loading}
      />
      <input
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Company Name"
        required
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Signing Up...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default SignupForm;