import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ImageGallery.css';

// Use the RENDER_EXTERNAL_URL environment variable
const API_URL = process.env.REACT_APP_API_URL || '';

const ImageGallery = () => {
    const [rooms, setRooms] = useState([]);
    const [sortBy, setSortBy] = useState('number');

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/rooms`);
            setRooms(response.data);
        } catch (error) {
            console.error('Failed to fetch rooms:', error);
        }
    };

    const sortedRooms = [...rooms].sort((a, b) => {
        if (sortBy === 'number') {
            return a.number - b.number;
        } else if (sortBy === 'rating') {
            return b.rating - a.rating;
        }
        return 0;
    });

    return (
        <div className="image-gallery">
            <div className="sort-controls">
                <label>Sort by: </label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="number">Room Number</option>
                    <option value="rating">Rating</option>
                </select>
            </div>
            <div className="room-grid">
                {sortedRooms.map((room) => (
                    <div key={room.id} className="room-item">
                        <h3>Room {room.number}</h3>
                        <img
                            src={`${API_URL}/uploads/${room.image_path}`}
                            alt={`Room ${room.number}`}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
                            }}
                        />
                        <p>{room.comment}</p>
                        <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`star ${star <= room.rating ? 'active' : ''}`}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <p className="posted-by">Posted by: {room.username || 'Anonymous'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
