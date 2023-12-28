import { useEffect, useState, Navigate } from "react";
import axios from "axios";
import { Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import ChatPage from './Pages/ChatPage';
import AdminPage from "./Pages/AdminPage";


function App() {
  return (
    <div className="App">
      <Route
        path="/" component={Homepage} exact
      />

      <Route
        path="/otherpage" component={ChatPage} exact
      />

      <Route
        path="/admin" component={AdminPage} exact
      />
    </div>
  );
}

export default App;
