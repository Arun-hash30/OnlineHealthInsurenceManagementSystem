import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    console.log(loginData);
    console.log(JSON.stringify(loginData));
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', loginData);
      console.log(response);
      const { token, role } = response.data;

      // Check if the role is valid
      if (!['customer', 'agent', 'admin'].includes(role)) {
        throw new Error('Unknown role');
      }

      localStorage.setItem('token', token); // Store the token

      // Navigate based on role
      if (role === 'customer') {
        navigate('/customer/dashboard');
      } else if (role === 'agent') {
        navigate('/agent/dashboard');
      } else if (role === 'admin') {
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid credentials or unknown role. Please try again.');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>Email ID:  <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        /></label><br></br>

        <label>Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          /></label><br></br>
        <button type="submit">Login</button>
      </form>
      <div className="register-link">
        <p>Don't have an account?
          <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
}

export default Login;
