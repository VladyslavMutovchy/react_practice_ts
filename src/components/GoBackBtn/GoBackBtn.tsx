import React from 'react';
import { Link } from 'react-router-dom';

const GoBackBtn: React.FC = () => {
  return (
    <Link to="/" className="btn">
      Go Back
    </Link>
  );
};

export default GoBackBtn;
