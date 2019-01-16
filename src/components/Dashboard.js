import React from 'react';
import Day from '../components/Day/Day';

const Dashboard = props => {
  return (
    <Day date={new Date()}></Day>
  );
};

export default Dashboard;