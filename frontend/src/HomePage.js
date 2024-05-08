import React, { useEffect, useState } from 'react';
import './css/HomePage.css';

import image1 from './img/image1.png'
import image2 from './img/image2.png'
import image3 from './img/image3.png'
import image4 from './img/image4.png'
import image5 from './img/image5.png'
import image6 from './img/image6.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

    const [name, setName] = useState('')
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;

    useEffect(() =>{
        axios.get('http://localhost:8081/session')
        .then(res => {
            if(res.data.valid){
                setName(res.data.full_name)
            }
        })
        .catch(err => console.log(err))
    }, [])
  return (
        <div className="content" style={{marginTop:'20px'}}>
            <h2>Welcome <span className='username'>{name}</span> to Narbu Grocery</h2>
            <p>Trees can benefit vegans by providing vitamins and D3 that help boost the absorption of certain nutrients.</p>

        
            <div className="grid-container">
                <div className="grid-item">
                    <img src={image1} alt="Image 1" />                
                </div>
                <div className="grid-item">
                    <img src={image2} alt="Image 2" />
                </div>
                <div className="grid-item">
                    <img src={image3} alt="Image 3" />
                </div>
                <div className="grid-item">
                    <img src={image4} alt="Image 4" />
                </div>
                <div className="grid-item">
                    <img src={image5} alt="Image 5" />
                </div>
                <div className="grid-item">
                    <img src={image6} alt="Image 6" />
                </div>
                <div className="grid-item">
                    <img src={image6} alt="Image 6" />
                </div>
                <div className="grid-item">
                    <img src={image6} alt="Image 6" />
                </div>
                <div className="grid-item">
                    <img src={image6} alt="Image 6" />
                </div>
        </div>

    </div>
  );
};

export default HomePage;