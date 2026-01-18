import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaArrowUp } from 'react-icons/fa';

const ScrollButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: ${({ theme }) => theme.highlight};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.5em;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) => (isVisible ? 'scale(1)' : 'scale(0)')};
  transition: opacity 0.3s, transform 0.3s;
  z-index: 100;
`;

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <ScrollButton isVisible={isVisible} onClick={scrollToTop}>
      <FaArrowUp />
    </ScrollButton>
  );
}

export default BackToTopButton;