import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* background-color: ${({ theme }) => theme.body}; */ /* Keep background transparent for LiquidEther */
  position: relative;
  z-index: 1;
`;

const LoginForm = styled.form`
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 350px;
`;

const AppTitle = styled.h1`
  font-family: 'Poppins', sans-serif;
  text-align: center;
  color: ${({ theme }) => theme.text};
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: 5px;
  font-size: 1em;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.highlight};
  color: ${({ theme }) => theme.buttonText};
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.2s;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin: 0;
`;

function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://artvault-backend-atdz.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        toast.success("Login Successful!");
        onLoginSuccess();
      } else {
        setError('Invalid username or password.');
      }
    } catch (err) {
      setError('Failed to connect to the server.');
    }
  };

  return (
    <LoginContainer>
      <AppTitle>ArtVault</AppTitle>
      <LoginForm onSubmit={handleLogin}>
        <h2>Login</h2>
        <div>
          {/* Updated placeholder */}
          <Input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
        </div>
        <div>
          {/* Updated placeholder */}
          <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        </div>
        <Button type="submit">Login</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </LoginForm>
    </LoginContainer>
  );
}

export default LoginPage;