import React from 'react';
import clothingStoreLogo from './JK.png';

function Home(props) {
    return (
        <div style={{ textAlign: 'center' }}>
            <img src={clothingStoreLogo} alt="Clothing Store Logo" style={{ width: '200px', height: 'auto' }} />
            <h2>Clothing Store</h2>
            <p>React front-end calls Express REST API to add, list, update, or delete a user, create clothing, etc.</p>
        </div>
    );
}

export default Home;
