import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SkeletonCard from './SkeletonCard';
import ArtworkModal from './ArtworkModal';

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

// --- Styled Components ---
const PageContainer = styled(motion.div)`
  padding: 20px 40px;
`;

const ArtworkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const ArtworkCard = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  transition: transform 0.2s ease-in-out;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ArtworkImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const ArtworkTitle = styled.h4`
  margin: 0;
  padding: 15px;
  text-align: center;
`;

const BackLink = styled(Link)`
  display: inline-block;
  color: ${({ theme }) => theme.highlight};
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

// --- Main Component ---
function ArtistDetailPage() {
    const [artworks, setArtworks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const { artistId } = useParams();

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            fetch(`https://artvault-backend-atdz.onrender.com/api/artists/${artistId}/artworks`)
                .then(res => res.json())
                .then(data => {
                    setArtworks(data);
                    setIsLoading(false);
                });
        }, 1000);
    }, [artistId]);

    return (
        <PageContainer
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
            {/* Ensure this points to the root path */}
            <BackLink to="/">← Back to Artists</BackLink>
            <h2>Artworks</h2>
            <ArtworkGrid>
                {isLoading ? (
                    Array.from({ length: 2 }).map((_, index) => <SkeletonCard key={index} />)
                ) : (
                    artworks.map(art => (
                        <ArtworkCard key={art.id} onClick={() => setSelectedArtwork(art)}>
                            <ArtworkImage src={art.imageUrl} alt={art.title} />
                            <ArtworkTitle>{art.title}</ArtworkTitle>
                        </ArtworkCard>
                    ))
                )}
            </ArtworkGrid>
            <ArtworkModal artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />
        </PageContainer>
    );
}
export default ArtistDetailPage;