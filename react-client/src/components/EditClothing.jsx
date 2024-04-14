import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';

// this component is used to edit clothing
function EditClothing(props) {
  //
  let navigate = useNavigate();
  // Get the userId param from the URL.
  let { id } = useParams();
  console.log(id)
  //
  const [clothing, setClothing] = useState({ _id: '', courseCode: '', courseName: '', 
  section: '', semester: '' });  
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "/api/api/clothes/" + id;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setCourse(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateClothing = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { courseCode: clothing.courseCode, courseName: clothing.courseName,
    section: clothing.section, semester: clothing.semester, };
    //mimicks very much REST calls
    axios.put(apiUrl, data)
      .then((result) => {
        console.log('after calling put to update',result.data )
        setShowLoading(false);
        navigate('/showclothing/' + result.data._id)
      }).catch((error) => setShowLoading(false));
  };
  //runs when user enters a field
  const onChange = (e) => {
    e.persist();
    setClothing({...clothing, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
        <Form onSubmit={updateCourse}>
          <Form.Group>
            <Form.Label> Name</Form.Label>
            <Form.Control type="text" name="name" id="name" placeholder="Enter Name" value={clothing.name} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Category</Form.Label>
            <Form.Control type="text" name="category" id="category" placeholder="Enter Category" value={clothing.category} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Price</Form.Label>
            <Form.Control type="number" name="price" id="price" placeholder="Enter Price" value={clothing.price} onChange={onChange} />
          </Form.Group>
        
          <Button variant="primary" type="submit">
            Update Clothing
          </Button>
        </Form>
    </div>
  );
}
//
export default EditClothing;
