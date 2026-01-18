import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet, useLocation } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

// Import Theme files
import { lightTheme, darkTheme } from './themes';

// Import All Components
import LoginPage from './components/LoginPage';
import ArtistListPage from './components/ArtistListPage';
import ArtistDetailPage from './components/ArtistDetailPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import TopHeader from './components/TopHeader';
import GooeyNav from './components/GooeyNav';
import BackToTopButton from './components/BackToTopButton';
import SplashScreen from './components/SplashScreen';
import LiquidEther from './components/LiquidEther';

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s linear;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  }
`;

// Define navigation items for GooeyNav
const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 1;
`;

const AppLayout = ({ onLogout, toggleTheme }) => (
  <ContentContainer>
    <TopHeader onLogout={onLogout} toggleTheme={toggleTheme} />
    <GooeyNav items={navItems} />
    <Outlet />
    <BackToTopButton />
  </ContentContainer>
);

function AppRoutes({ isLoggedIn, isLoadingAuth, handleLogin, handleLogout, toggleTheme }) {
  const location = useLocation();
  const [showingSplash, setShowingSplash] = useState(false);
  const [splashCompleted, setSplashCompleted] = useState(false);

  const triggerLoginAndSplash = () => {
    handleLogin();
    setShowingSplash(true);
    setSplashCompleted(false);
  };

  const handleSplashComplete = () => {
    setShowingSplash(false);
    setSplashCompleted(true);
  };

  if (isLoadingAuth) {
    return null;
  }

  if (isLoggedIn && showingSplash && !splashCompleted) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/login"
          element={!isLoggedIn ? <LoginPage onLoginSuccess={triggerLoginAndSplash} /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={isLoggedIn ? <AppLayout onLogout={handleLogout} toggleTheme={toggleTheme} /> : <Navigate to="/login" />}
        >
          <Route index element={<ArtistListPage />} />
          <Route path="artist/:artistId" element={<ArtistDetailPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  // Change this line to always default to 'light'
  const [theme, setTheme] = useState('light'); // <-- Updated this line

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
    setIsLoadingAuth(false);
    // Optionally, read theme from localStorage *after* initial mount if needed,
    // but the request is to always start light.
    // const savedTheme = localStorage.getItem('theme');
    // if (savedTheme) {
    //   setTheme(savedTheme);
    // }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Still save preference
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    // Optionally remove theme preference on logout if desired
    // localStorage.removeItem('theme');
    // setTheme('light'); // Ensure it goes back to light on logout
  };

  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <BackgroundContainer>
        <LiquidEther
            colors={['#5227FF', '#FF9FFC', '#B19EEF']}
            autoDemo={true}
            autoIntensity={0.5}
        />
      </BackgroundContainer>

      <ToastContainer position="bottom-right" theme={theme} />
      <Router>
        <AppRoutes
          isLoggedIn={isLoggedIn}
          isLoadingAuth={isLoadingAuth}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          toggleTheme={toggleTheme}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;