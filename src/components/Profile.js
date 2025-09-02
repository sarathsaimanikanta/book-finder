// src/components/Profile.js
import React, { useState } from 'react';
import { UserIcon, EditIcon, CheckIcon, CancelIcon, HeartIcon, SearchIcon, BookIcon } from './Icons';
import '../styles/Profile.css';

const Profile = ({ wishlistCount, totalSearches }) => {
  const [userInfo, setUserInfo] = useState({
    name: 'Book Lover',
    email: 'booklover@example.com',
    joinDate: 'January 2025',
    favoriteGenre: 'Science Fiction'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(userInfo);

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm(userInfo);
  };

  const handleSave = () => {
    setUserInfo(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(userInfo);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2 className="profile-title">
          <UserIcon size={28} className="profile-title-icon" />
          My Profile
        </h2>
      </div>
      
      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar">
            <UserIcon size={48} className="avatar-icon" />
          </div>
          
          <div className="profile-info">
            {!isEditing ? (
              <>
                <h3 className="profile-name">{userInfo.name}</h3>
                <p className="profile-email">{userInfo.email}</p>
                <p className="profile-detail">
                  <span className="detail-label">Member since:</span> {userInfo.joinDate}
                </p>
                <p className="profile-detail">
                  <span className="detail-label">Favorite genre:</span> {userInfo.favoriteGenre}
                </p>
                <button className="edit-button" onClick={handleEdit}>
                  <EditIcon size={16} />
                  Edit Profile
                </button>
              </>
            ) : (
              <div className="edit-form">
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleInputChange}
                  className="edit-input"
                  placeholder="Name"
                />
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleInputChange}
                  className="edit-input"
                  placeholder="Email"
                />
                <input
                  type="text"
                  name="favoriteGenre"
                  value={editForm.favoriteGenre}
                  onChange={handleInputChange}
                  className="edit-input"
                  placeholder="Favorite Genre"
                />
                <div className="edit-buttons">
                  <button className="save-button" onClick={handleSave}>
                    <CheckIcon size={16} />
                    Save
                  </button>
                  <button className="cancel-button" onClick={handleCancel}>
                    <CancelIcon size={16} />
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="profile-stats">
          <div className="stat-card">
            <HeartIcon size={32} className="stat-icon" />
            <div className="stat-info">
              <h4 className="stat-number">{wishlistCount}</h4>
              <p className="stat-label">Books in Wishlist</p>
            </div>
          </div>
          
          <div className="stat-card">
            <SearchIcon size={32} className="stat-icon" />
            <div className="stat-info">
              <h4 className="stat-number">{totalSearches}</h4>
              <p className="stat-label">Total Searches</p>
            </div>
          </div>
          
          <div className="stat-card">
            <BookIcon size={32} className="stat-icon" />
            <div className="stat-info">
              <h4 className="stat-number">10+</h4>
              <p className="stat-label">Genres Explored</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;