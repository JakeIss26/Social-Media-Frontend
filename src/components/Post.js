import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/group.css';

function Post() {
    const [postName, setPostName] = useState('');
    const [photos, setPhotos] = useState([]);
    const navigate = useNavigate();

    const handlePostNameChange = (event) => {
        setPostName(event.target.value);
    };

    const handlePhotosChange = (event) => {
        setPhotos(event.target.files);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const apiEndpointUpload = "http://127.0.0.1:8000/api/image/uploadPhotos";
            const apiEndpointPostCreating = "http://127.0.0.1:8000/api/post";
            const token = localStorage.getItem('Token');

            const formData = new FormData();
            formData.append('name', postName);
            formData.append('user_id', 1);

            for (let i = 0; i < photos.length; i++) {
                formData.append('photos[]', photos[i], photos[i].name);
            }

            const postResult = await axios.post(apiEndpointPostCreating, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            const postId = postResult.data;

            const formDataImages = new FormData();
            formDataImages.append('post_id', postId);

            for (let i = 0; i < photos.length; i++) {
                formDataImages.append('photos[]', photos[i], photos[i].name);
            }

            await axios.post(apiEndpointUpload, formDataImages, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            navigate("/profile"); // Перенаправление на другую страницу

        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="main">
            <div className="group-form">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <h2>Create Post</h2>
                    <div className="input-data">
                        <textarea
                            id="postName"
                            name="postName"
                            value={postName}
                            onChange={handlePostNameChange}
                            placeholder="Enter a comment for the post:"
                        />
                        <input
                            type="file"
                            id="photos"
                            name="photos[]"
                            accept="image/*"
                            placeholder="Post Photo"
                            onChange={handlePhotosChange}
                            multiple
                        />
                        <button id="createPostButton" type="submit">Publish</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Post;