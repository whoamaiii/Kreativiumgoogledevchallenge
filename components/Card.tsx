
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  isHoverable?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', isHoverable = false }) => {
  const hoverClasses = isHoverable ? 'transition-all duration-300 glass-card-hover' : '';
  
  return (
    <div className={`glass-card rounded-xl p-6 ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
