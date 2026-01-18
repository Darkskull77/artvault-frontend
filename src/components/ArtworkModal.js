import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ModalBackdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  border-radius: 10px;
  width: 90vw;
  height: 90vh;
  max-width: 1200px; /* Increased max-width */
  display: grid;
  overflow: hidden;

  /* Two-column layout for wider screens */
  @media (min-width: 768px) {
    grid-template-columns: 3fr 2fr;
  }
`;

const ImageContainer = styled.div`
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ArtworkImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain; /* Prevents image stretching */
`;

const DetailsContainer = styled.div`
  padding: 30px;
  overflow-y: auto; /* Makes only this section scrollable */
`;

const ArtworkTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  margin-top: 0;
`;

const DetailText = styled.p`
  font-size: 1.1em;
  line-height: 1.6;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 2em;
  cursor: pointer;
`;

const CommentSection = styled.div`
  padding-top: 30px;
  border-top: 1px solid ${({ theme }) => theme.inputBorder};
  margin-top: 30px;
`;

const CommentInput = styled.input`
  width: calc(100% - 105px); /* Adjusted width */
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: 5px;
  margin-right: 10px;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
`;

const CommentButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.highlight};
  color: ${({ theme }) => theme.buttonText};
  cursor: pointer;
`;

const CommentList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
  text-align: left;
`;

const CommentItem = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.inputBorder};
  padding: 10px 0;
`;

function ArtworkModal({ artwork, onClose }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
        setComments([...comments, newComment]);
        setNewComment('');
    }
  };

  if (!artwork) return null;

  return (
    <AnimatePresence>
      <ModalBackdrop
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ModalContent
          initial={{ y: "-50px", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "50px", opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          <ImageContainer>
            <ArtworkImage src={artwork.imageUrl} alt={artwork.title} />
          </ImageContainer>

          <DetailsContainer>
            <ArtworkTitle>{artwork.title}</ArtworkTitle>
            <DetailText><strong>Price:</strong> ${artwork.price.toLocaleString()}</DetailText>
            <DetailText><strong>Availability:</strong> {artwork.isAvailable ? 'Available' : 'Sold'}</DetailText>
            <DetailText><strong>Location:</strong> {artwork.location}</DetailText>
            
            <CommentSection>
              <h3>Comments</h3>
              <form onSubmit={handleCommentSubmit}>
                  <CommentInput
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                  />
                  <CommentButton type="submit">Submit</CommentButton>
              </form>
              <CommentList>
                  {comments.map((comment, index) => (
                      <CommentItem key={index}>{comment}</CommentItem>
                  ))}
              </CommentList>
            </CommentSection>
          </DetailsContainer>

        </ModalContent>
      </ModalBackdrop>
    </AnimatePresence>
  );
}

export default ArtworkModal;