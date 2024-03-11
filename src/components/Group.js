import React, { useState } from 'react';
import axios from 'axios';
import '../css/group.css';

function Group() {
    const [groupDescription, setGroupDescription] = useState('');
    const [owner, setOwner] = useState('');

    const apiEndpointGroupCreating = "http://127.0.0.1:8000/api/group";

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('description', groupDescription);
        formData.append('owner', owner);

        try {
            const token = localStorage.getItem('Token');
            const response = await axios.post(apiEndpointGroupCreating, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            const dataObject = response.data;
            console.log(dataObject);
            // Redirect logic here
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="main">
            <div className="group-form">
                <form onSubmit={handleSubmit}>
                    <h2>Create Group</h2>
                    <div className="input-data">
                        <textarea
                            id="groupDescription"
                            name="groupDescription"
                            placeholder="Введите описание группы..."
                            value={groupDescription}
                            onChange={(e) => setGroupDescription(e.target.value)}
                        ></textarea>
                        {/* <input
                        type="text"
                        id="owner"
                        name="owner"
                        placeholder="Введите Id владельца группы: "
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                        required
                    /> */}
                        <button id="createPostButton" type="submit">Создать группу</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Group;
