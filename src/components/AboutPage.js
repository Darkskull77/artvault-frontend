import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// --- Framer Motion Animation Variants ---
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const PageContainer = styled(motion.div)`
  padding: 40px;
  max-width: 800px;
  margin: 20px auto;
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  font-family: 'Poppins', sans-serif;
  margin-top: 0;
`;

const TeamList = styled.ul`
    list-style: none;
    padding: 0;
`;

const TeamMember = styled.li`
    margin-bottom: 5px;
`;

function AboutPage() {
  return (
    <PageContainer
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
    >
      <Title>About ArtVault</Title>
      <p>An art gallery management system "ArtVault" developed by Pranav and team.</p>
      <h3>Team Members</h3>
      <TeamList>
        <TeamMember>Pranav N P</TeamMember>
        <TeamMember>Kalidasan M</TeamMember>
        <TeamMember>Vasudev Krishna J L</TeamMember>
        <TeamMember>Shahana Shaji</TeamMember>
      </TeamList>
    </PageContainer>
  );
}

export default AboutPage;