import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import Login from './Login';
import { useNavigate } from 'react-router-dom';

function ListClothes(props) {
  let navigate = useNavigate();

  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "api/api/clothes";

  useEffect(() => {
    const fetchData = async () => {
      axios.get(apiUrl)
        .then(result => {
          setData(result.data);
          setShowLoading(false);
        }).catch((error) => {
          console.log('error in fetchData:', error)
        });
    };
    fetchData();
  }, []);

  const showDetail = (id) => {
    navigate(`/showclothing/${id}`);
  }

  const goToCreateClothing = () => {
    navigate("/createclothing");
  }

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>}
      <ListGroup>
        {data.map((item, idx) => (
          <ListGroup.Item key={idx} action onClick={() => { showDetail(item._id) }}>
            <div>
              <p>Name: {item.name}</p>
              <p>Category: {item.category}</p>
              <p>Price: ${item.price}</p>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <button onClick={goToCreateClothing}>Add Clothing</button>
    </div>
  );
}

export default ListClothes;