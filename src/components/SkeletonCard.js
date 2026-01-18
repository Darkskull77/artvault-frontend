import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const SkeletonWrapper = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  overflow: hidden;
`;

const SkeletonImage = styled.div`
  width: 100%;
  height: 200px;
  background: #f6f7f8;
  background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-repeat: no-repeat;
  background-size: 800px 200px; 
  animation: ${shimmer} 1.5s linear infinite;
`;

const SkeletonContent = styled.div`
  padding: 15px;
`;

const SkeletonLine = styled.div`
  height: 1em;
  width: ${({ width }) => width || '100%'};
  border-radius: 4px;
  background: #f6f7f8;
  background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-repeat: no-repeat;
  background-size: 800px 100px;
  animation: ${shimmer} 1.5s linear infinite;
  margin-bottom: 10px;
`;

function SkeletonCard() {
  return (
    <SkeletonWrapper>
      <SkeletonImage />
      <SkeletonContent>
        <SkeletonLine width="60%" />
        <SkeletonLine />
        <SkeletonLine />
      </SkeletonContent>
    </SkeletonWrapper>
  );
}

export default SkeletonCard;