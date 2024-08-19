import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminPage.css';

const AdminPage = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            const response = await axios.get('/api/rooms');
            setRooms(response.data);
        } catch (error) {
            console.error('Failed to fetch rooms:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/rooms/${id}`);
            fetchRooms(); // Refresh the list after deletion
        } catch (error) {
            console.error('Failed to delete room:', error);
        }
    };

    return (
        <div className="admin-page">
            <h1>Admin Page</h1>
            <div className="room-list">
                {rooms.map((room) => (
                    <div key={room.id} className="room-item">
                        <h3>Room {room.number}</h3>
                        <p>Posted by: {room.username || 'Anonymous'}</p>
                        <img src={`/uploads/${room.image_path}`} alt={`Room ${room.number}`} />
                        <p>{room.comment}</p>
                        <p>Rating: {room.rating}/5</p>
                        <button onClick={() => handleDelete(room.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPage;