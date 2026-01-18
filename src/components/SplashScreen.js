import React, { useEffect } from 'react';
import styled from 'styled-components';
import SplitText from './SplitText';
import 'react-router-dom';

// Import your logo image
import MyCustomLogo from '../images/my_logo.png'; // <--- Update this path to your logo file

const SplashContainer = styled.div`
  display: flex;
  flex-direction: column; /* Stack logo and text vertically */
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #ffffff; 
  color: #333333; 
  overflow: hidden; 
`;

const LogoImage = styled.img`
  height: 100px; /* Adjust height as needed */
  width: auto;
  margin-bottom: 20px; /* Space between logo and text */
`;

const AnimatedTextContainer = styled.div`
  /* Use clamp for responsive font size */
  font-size: clamp(48px, 15vw, 160px); 
  font-weight: bold;
  line-height: 1;
`;


function SplashScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1500); 

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <SplashContainer>
      {/* Add the logo image here */}
      <LogoImage src={MyCustomLogo} alt="ArtVault Logo" /> 
      
      {/* Keep the animated text below the logo */}
      <AnimatedTextContainer>
        <SplitText
          text="ArtVault"
          tag="h1"
          delay={80}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 50, scale: 0.8 }}
          to={{ opacity: 1, y: 0, scale: 1 }}
          textAlign="center"
        />
      </AnimatedTextContainer>
    </SplashContainer>
  );
}


export default SplashScreen;
