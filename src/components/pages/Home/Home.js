import React from 'react';
import CreatureList from '../../CreatureList/CreatureList';
import AlertMessages from '../../AlertMessages/AlertMessages';

function Home() {
  return (
    <div>
      <h2>Master Bestiary</h2>
      <CreatureList />

      <AlertMessages />
    </div>
  );
}

export default Home;
