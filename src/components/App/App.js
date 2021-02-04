import React from 'react';
import './App.css';
import { HashRouter as Router, Route } from 'react-router-dom';

// CUSTOM COMPONENTS
import AppLayout from '../AppLayout/AppLayout';
import Home from '../pages/Home/Home';
import Details from '../pages/Details/Details';
import Edit from '../pages/Edit/Edit';

function App() {
  return (
    <Router>
      <AppLayout>
        <Route exact path="/" component={Home} />
        <Route exact path="/creature-details/:id">
          <Details />
        </Route>
        <Route exact path="/creature-edit/:id">
          <Edit />
        </Route>
      </AppLayout>
    </Router>
  );
}

export default App;
