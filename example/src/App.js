import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Docs from './docs';

import './App.css';

function App() {
  return (
    <Router>
      <Route path="/docs" component={Docs} />
    </Router>
  );
}

export default App;
