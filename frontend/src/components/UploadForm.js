import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UploadForm.css';

const UploadForm = () => {
    const [number, setNumber] = useState('');
    const [file, setFile] = useState(null);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [username, setUsername] = useState('');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please select an image to upload');
            return;
        }
        const formData = new FormData();
        formData.append('number', number);
        formData.append('image', file);
        formData.append('comment', comment);
        formData.append('rating', rating);
        formData.append('username', username || 'Anonymous');

        try {
            await axios.post('/api/upload', formData);
            alert('Upload successful');
            setNumber('');
            setFile(null);
            setComment('');
            setRating(0);
            setUsername('');
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
    };

    return (
        <form onSubmit={handleSubmit} className="upload-form">
            <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Room Number"
                required
            />
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username (optional)"
            />
            {isMobile ? (
                <div className="mobile-upload-options">
                    <label className="custom-file-upload">
                        <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={handleFileChange}
                        />
                        Click here to take a photo
                    </label>
                    <label className="custom-file-upload">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        Click here to choose a file
                    </label>
                </div>
            ) : (
                <label className="custom-file-upload">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    Click here to upload an image
                </label>
            )}
            {file && <p>Selected file: {file.name}</p>}
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment"
            />
            <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`star ${star <= rating ? 'active' : ''}`}
                        onClick={() => handleStarClick(star)}
                    >
                        ★
                    </span>
                ))}
            </div>
            <button type="submit" className="btn">Upload</button>
        </form>
    );
};

export default UploadForm;