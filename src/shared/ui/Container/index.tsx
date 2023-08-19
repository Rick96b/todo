import React from 'react'
import { Container } from '@mui/material';

interface BaseContainerProps {
    children: React.ReactNode
    className?: string | undefined
}

const BaseContainer: React.FC<BaseContainerProps> = ({children, className}) => {
  return (
    <Container 
      maxWidth="md" 
      className={className} 
      sx={{
        padding: '0 30px',
      }}
    >
      {children}
    </Container>
  )
}

export default BaseContainer;
