import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
//
// this component is used to show a single clothing
function ShowClothing(props) {
  let navigate = useNavigate()
  let {id} = useParams();
  //
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "/api/api/clothes/" + id;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      console.log('results from clothes',result.data);

      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const addClothing = (clothingId) => {
    const apiUrl = `/addClothing/${clothingId}`; 
    // Get the authentication token from cookies
    const token = document.cookie.split('; ').find(row => row.startsWith('token')).split('=')[1];
  
    // Make a POST request to your server to add the course to the user's list
    axios.post(apiUrl, {}, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        // Handle the success response, e.g., update the UI or show a success message
        console.log('Clothing added successfully:', response.data);
      })
      .catch(error => {
        // Handle errors, e.g., show an error message
        console.error('Error adding clothing:', error);
      });
  };

  const editClothing = (id) => {
    navigate('/editclothing/' + id);
    
  };

  const deleteClothing = (id) => {
    setShowLoading(true);
    const clothing = { name: data.name, category: data.category,
    price: data.price, };
    //
    axios.delete(apiUrl, clothing)
      .then((result) => {
        setShowLoading(false);
        navigate('/listclothes')
      }).catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
        <h1>Name: {data.Name}</h1>
        <p>Category: {data.category}</p>
        <p>Price: {data.price}</p>

        <p>
          <Button type="button" variant="success" onClick={() => { addClothing(data._id) }}>Add to My Clothes</Button>&nbsp;
          <Button type="button" variant="primary" onClick={() => { editClothing(data._id) }}>Edit</Button>&nbsp;
          <Button type="button" variant="danger" onClick={() => { deleteClothing(data._id) }}>Delete</Button>
        </p>
    </div>
  );
}

export default ShowClothing;
