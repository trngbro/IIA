import { useEffect, useState, Navigate } from "react";
import axios from "axios";
import { Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import ChatPage from './Pages/ChatPage';


function App() {
  return (
    <div className="App">
      <Route
        path="/" component={Homepage} exact
      />

      <Route
        path="/otherpage" component={ChatPage} exact
      />
    </div>
  );
}

export default App;
