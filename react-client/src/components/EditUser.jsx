import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
//
// this component is used to edit a user
function EditUser(props) {
  // Get the studentId param from the URL.
  let { id } = useParams();
  console.log(id)
  let navigate = useNavigate();
  const [user, setStudent] = useState({ _id: '', studentNumber: '', password: '', firstName: '', lastName: '', 
  address: '', city: '', phoneNumber: '', email: '', program: '' });  
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "/api/users/" + id;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setUser(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateUser = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { username: user.username, password: user.password,
      firstName: user.firstName, lastName: user.lastName,
      address: user.address, city: user.city, phoneNumber: user.phoneNumber,
      email: user.email, };
    axios.put(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        navigate('/showuser/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };
  //runs when user enters a field
  const onChange = (e) => {
    e.persist();
    setUser({...user, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
        <Form onSubmit={updateUser}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" id="username" placeholder="Enter Username" value={user.username} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" id="password" placeholder="Enter Password" value={user.password} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> First Name</Form.Label>
            <Form.Control type="text" name="firstName" id="firstName" placeholder="Enter First Name" value={user.firstName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Last Name</Form.Label>
            <Form.Control type="text" name="lastName" id="lastName" placeholder="Enter Last Name" value={user.lastName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
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
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="email" id="email" rows="3" placeholder="Enter Email" value={user.email} onChange={onChange} />
          </Form.Group>
        
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
    </div>
  );
}
//
export default EditUser;
