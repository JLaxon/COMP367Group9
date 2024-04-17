import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
//
// This app requires react-bootstrap and bootstrap installed: 
//    npm install react-bootstrap bootstrap
//
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './App.css';
//
import ListUsers from './components/ListUsers';
import CreateClothing from './components/CreateClothing';
import EditUser from './components/EditUser';
import EditClothing from './components/EditClothing';
import CreateUser from './components/CreateUser';
import ShowUser from './components/ShowUser';
import ShowClothing from './components/ShowClothing';
import ListClothes from "./components/ListClothes";

import Home from './components/Home';
import Login from './components/Login';
//
function App() {

  return (
    <Router>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/home">React Client For Clothes App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/home" >Home</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/listusers">List of Users</Nav.Link>
              <Nav.Link as={Link} to="/listclothes">List of Clothes</Nav.Link>
              <Nav.Link as={Link} to="/create">Sign Up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
      <div>
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />          
          <Route path="create" element ={< CreateUser />} />
          <Route path="createclothing" element ={< CreateClothing />} />
          <Route path="login" element= {< Login />}  />
          <Route path="listusers" element= {< ListUsers />}  />
          <Route path="listclothes" element= {< ListClothes />}  />
          <Route path="edit/:id" element= {< EditUser />}  />
          <Route path="show/:id" element= {< ShowUser/>}  />
          <Route path="showclothing/:id" element= {< ShowClothing />}  />
          <Route path="editclothing/:id" element= {< EditClothing />}  />

        </Routes>
      </div>

    </Router>


  );
}

export default App;
