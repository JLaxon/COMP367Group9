import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './login.css'
import axios from 'axios';
import Home from './Home'; // Import the component you want to render after authentication

function Login() {
  const [screen, setScreen] = useState('auth');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const apiUrl = "/api/signin";

  const authenticateUser = async () => {
    try {
      const loginData = { auth: { username, password } }
      const res = await axios.post(apiUrl, loginData);
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  const readCookie = async () => {
    try {
      const res = await axios.get('/api/read_cookie');
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
      }
    } catch (e) {
      setScreen('auth');
      console.log(e);
    }
  };

  useEffect(() => {
    readCookie();
  }, []);

  return (
    <div className="App">
      {screen === 'auth' 
        ? <div>          
            <Form>
              <Form.Group size="lg">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" id="username" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} />
              </Form.Group>
              <Form.Group size="lg">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" name="password" id="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} />
              </Form.Group>
              <Button size="lg" variant="primary" type="Button" onClick={authenticateUser}>
                Login
              </Button>
            </Form>
          </div>
        : <Home />
      }
    </div>
  );
}

export default Login;