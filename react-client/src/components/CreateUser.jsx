import React, { useState } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './login.css';

function CreateUser(props) {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    _id: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    phoneNumber: '',
    email: ''
  });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "/api";

  const saveUser = (e) => {
    e.preventDefault();
    setShowLoading(true);
    const data = { ...user };
    axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        navigate('/show/' + result.data._id);
      })
      .catch((error) => {
        setShowLoading(false);
        console.error("Error saving user:", error);
      });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      }
      <Form onSubmit={saveUser}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" id="username" placeholder="Enter Username" value={user.username} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" id="password" placeholder="Enter Password" value={user.password} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="firstName" id="firstName" placeholder="Enter First Name" value={user.firstName} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="lastName" id="lastName" placeholder="Enter Last Name" value={user.lastName} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" name="address" id="address" placeholder="Enter Address" value={user.address} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control type="text" name="city" id="city" placeholder="Enter City" value={user.city} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" name="phoneNumber" id="phoneNumber" placeholder="Enter Phone Number" value={user.phoneNumber} onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" name="email" id="email" rows="3" placeholder="Enter Email" value={user.email} onChange={onChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
}

export default CreateUser;
