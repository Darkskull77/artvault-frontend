import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SkeletonCard from './SkeletonCard';

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

const SearchBar = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 10px 15px;
  font-size: 1em;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.inputBorder}; // Uses theme context
  background-color: ${({ theme }) => theme.card}; // Uses theme context
  color: ${({ theme }) => theme.text}; // Uses theme context
  margin-bottom: 30px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const ArtistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const ArtistCard = styled(Link)`
  background: ${({ theme }) => theme.card}; // Uses theme context
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  text-decoration: none;
  color: ${({ theme }) => theme.text}; // Uses theme context
  transition: transform 0.2s ease-in-out;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ArtistImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 15px;
`;

const ArtistName = styled.h3`
  font-family: 'Poppins', sans-serif;
  margin-top: 0;
  color: ${({ theme }) => theme.highlight}; // Uses theme context
`;

// --- Main Component ---
function ArtistListPage() {
    const [artists, setArtists] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            fetch('https://artvault-backend-atdz.onrender.com/api/artists')
                .then(res => res.json())
                .then(data => {
                    setArtists(data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Failed to fetch artists:", error);
                    setIsLoading(false);
                });
        }, 1000); // Keep delay for skeleton loaders
    }, []);

    const filteredArtists = artists.filter(artist =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <PageContainer
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
            <h2>Artists</h2> {/* Regular h2 */}
            <SearchBar
                type="text"
                placeholder="Search for an artist..."
                onChange={event => setSearchTerm(event.target.value)}
            />
            <ArtistGrid>
                {isLoading ? (
                    Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />)
                ) : (
                    filteredArtists.map(artist => (
                        <ArtistCard key={artist.id} to={`/artist/${artist.id}`}>
                            <ArtistImage src={artist.profileImageUrl} alt={artist.name} />
                            <CardContent>
                                <ArtistName>{artist.name}</ArtistName>
                                <p>{artist.bio}</p>
                            </CardContent>
                        </ArtistCard>
                    ))
                )}
            </ArtistGrid>
        </PageContainer>
    );
}

export default ArtistListPage;