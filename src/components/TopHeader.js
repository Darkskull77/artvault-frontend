import React from 'react';
import styled, { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaMoon, FaSun, FaSignOutAlt } from 'react-icons/fa'; // Ensure FaMoon and FaSun are imported
import { Link } from 'react-router-dom';

// Import your logo image
import MyCustomLogo from '../images/my_logo.png'; // Make sure this path is correct

const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.header}; // Use theme.header
  color: ${({ theme }) => theme.text}; // Use theme.text
  padding: 10px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
  position: relative;
  transition: all 0.3s linear; // Ensure transition is applied
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const LogoImage = styled.img`
  height: 40px;
  width: auto;
  /* Adjust filter if needed for dark mode */
  /* filter: ${({ theme }) => (theme.mode === 'dark' ? 'brightness(0.9) contrast(1.2)' : 'none')}; */
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text}; // Use theme text color for icons
  font-size: 1.2em;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  padding: 5px; // Add padding for easier clicking
  display: flex; // Help center icon
  align-items: center; // Help center icon

  &:hover {
    color: ${({ theme }) => theme.highlight};
  }
`;

function TopHeader({ onLogout, toggleTheme }) {
  const navigate = useNavigate();
  const theme = useTheme(); // Get the current theme object

  const handleLogout = () => {
    onLogout();
    // navigate('/login'); // Navigation is handled in App.js now
  };

  return (
    <HeaderContainer>
      <Logo to="/">
        <LogoImage src={MyCustomLogo} alt="ArtVault Logo" />
      </Logo>
      <IconContainer>
        <IconButton onClick={toggleTheme} aria-label="Toggle theme">
          {/* Correctly check theme.mode */}
          {theme.mode === 'light' ? <FaMoon /> : <FaSun />}
        </IconButton>
        <IconButton onClick={handleLogout} aria-label="Logout">
          <FaSignOutAlt />
        </IconButton>
      </IconContainer>
    </HeaderContainer>
  );
}

export default TopHeader;