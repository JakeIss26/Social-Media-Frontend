import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostComponent({ post }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const getPhotos = async () => {
            try {
                const token = localStorage.getItem('Token');
                const response = await axios.get(`http://127.0.0.1:8000/api/image/getPhotos/${post.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setPhotos(response.data);
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        };
    
        getPhotos();

        return () => {
            setPhotos([]);
        };
    }, [post.id]);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === photos.length - 1 ? 0 : prevSlide + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? photos.length - 1 : prevSlide - 1));
    };

    return (
        <div className="post-card">
            <div className="carousel">
                {photos.length > 0 && (
                    <>
                        <img src={photos[currentSlide].image_path} alt={`Slide ${currentSlide + 1}`} />
                        <button className="prev" onClick={prevSlide}>Previous</button>
                        <button className="next" onClick={nextSlide}>Next</button>
                    </>
                )}
            </div>
            <h3>{post.name}</h3>
            <div className="description">
                {post.description}
            </div>
        </div>
    );
}

export default PostComponent;
