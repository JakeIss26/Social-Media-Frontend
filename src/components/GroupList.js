import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/group-list.css';

function GroupList() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('Token');
                const response = await axios.get('http://127.0.0.1:8000/api/group', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setGroups(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching groups:', error);
                setLoading(false);
            }
        };

        fetchGroups();
    }, []);

    const joinGroup = (groupId) => {
        // Добавьте здесь код для обработки вступления в группу
        console.log(`Joining group ${groupId}`);
    };

    return (
        <div className="group-list">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="group-container">
                    <h2>All Groups</h2>
                    {groups.map(group => (
                        <div key={group.id} className="group-item">
                            <h3>{group.name}</h3>
                            <p>{group.description}</p>
                            <button onClick={() => joinGroup(group.id)}>Join</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default GroupList;
