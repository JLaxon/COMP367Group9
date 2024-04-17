import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';

function ShowClothing(props) {
  let navigate = useNavigate();
  let { id } = useParams();

  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = `/api/clothes/${id}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(apiUrl);
        setData(result.data);
        setShowLoading(false);
      } catch (error) {
        console.error('Error fetching clothing:', error);
        setShowLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  const addClothingToCart = () => {
    const apiUrl = `/api/cart/add/${id}`;

    axios.post(apiUrl)
      .then(response => {
        console.log('Clothing added to cart:', response.data);
        // Optionally update UI or show a success message
      })
      .catch(error => {
        console.error('Error adding clothing to cart:', error);
        // Optionally show an error message
      });
  };

  const editClothing = () => {
    navigate(`/editclothing/${id}`);
  };

  const deleteClothing = () => {
    setShowLoading(true);
    axios.delete(apiUrl)
      .then(result => {
        console.log('Clothing deleted:', result.data);
        navigate('/listclothes');
      })
      .catch(error => {
        console.error('Error deleting clothing:', error);
        setShowLoading(false);
      });
  };

  return (
    <div>
      {showLoading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <>
          <h1>Name: {data.name}</h1>
          <p>Category: {data.category}</p>
          <p>Price: {data.price}</p>

          <Button variant="success" onClick={addClothingToCart}>Add to Cart</Button>&nbsp;
          <Button variant="primary" onClick={editClothing}>Edit</Button>&nbsp;
          <Button variant="danger" onClick={deleteClothing}>Delete</Button>
        </>
      )}
    </div>
  );
}

export default ShowClothing;
