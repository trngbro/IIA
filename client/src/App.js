import './App.css';
import { useEffect, useState, Navigate } from "react";
import axios from "axios";
import { Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';


function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = `http://localhost:8080/auth/login/success`;
      console.log(url)
      const { data } = await axios.get(url, { withCredentials: true });
      console.log("Done", data)
      setUser(data.user._json);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="App">
      <Route
        path="/" component={Homepage} exact
      />

      <Route
        path="/otherpage" component={Homepage} exact
      />
    </div>
  );
}

export default App;
