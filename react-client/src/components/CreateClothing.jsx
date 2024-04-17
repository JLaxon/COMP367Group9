import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// this component is used to create a new clothing
function CreateClothing(props) {
    //
    let navigate = useNavigate();
    //
    const username = props.screen;
    console.log('props.screen',props.screen)
    const [clothing, setClothing] = useState({ _id: '', name: '', category: '', price: 0 });
    const [showLoading, setShowLoading] = useState(false);
    //
    const apiUrl = "api/api/clothes"
    //
    const saveClothing = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = {name: clothing.name, category: clothing.category, price: clothing.price };
        //
        axios.post(apiUrl, data)
        .then((result) => {
            setShowLoading(false);
            console.log('results from save clothing:',result.data)
            navigate('/showclothing/' + result.data._id)

        }).catch((error) => setShowLoading(false));
    };
    //
    const onChange = (e) => {
        e.persist();   

        setClothing({...clothing, [e.target.name]: e.target.value});

      }
    
    return (
        <div>
        <h2> Create clothing {username} </h2>
        {showLoading && 
            <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
            </Spinner> 
        } 
            <Form onSubmit={saveClothing}>
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
                Save Clothing
              </Button>
            </Form>
        </div>
    );


}
// 
export default CreateClothing;
