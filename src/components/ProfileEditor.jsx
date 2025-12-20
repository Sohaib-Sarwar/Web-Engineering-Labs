import { useState } from 'react';
import { FiUser, FiCalendar, FiEdit3, FiX, FiCheck, FiMail, FiPhone } from 'react-icons/fi';
import './ProfileEditor.css';

const ProfileEditor = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    age: 25,
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900'
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...profile });

  const handleSave = () => {
    setProfile({ ...editedProfile });
    setShowEditModal(false);
  };

  const handleCancel = () => {
    setEditedProfile({ ...profile });
    setShowEditModal(false);
  };

  return (
    <div className="profile-section">
      <div className="profile-card">
        <div className="profile-header">
          <h2>User Profile</h2>
          <button className="btn-edit-profile" onClick={() => setShowEditModal(true)}>
            <FiEdit3 /> Update Profile
          </button>
        </div>

        <div className="profile-grid">
          <div className="profile-info-card">
            <div className="info-icon">
              <FiUser />
            </div>
            <div className="info-content">
              <span className="info-label">Full Name</span>
              <h3>{profile.name}</h3>
            </div>
          </div>

          <div className="profile-info-card">
            <div className="info-icon">
              <FiCalendar />
            </div>
            <div className="info-content">
              <span className="info-label">Age</span>
              <h3>{profile.age} years</h3>
            </div>
          </div>

          <div className="profile-info-card">
            <div className="info-icon">
              <FiMail />
            </div>
            <div className="info-content">
              <span className="info-label">Email</span>
              <h3>{profile.email}</h3>
            </div>
          </div>

          <div className="profile-info-card">
            <div className="info-icon">
              <FiPhone />
            </div>
            <div className="info-content">
              <span className="info-label">Phone</span>
              <h3>{profile.phone}</h3>
            </div>
          </div>
        </div>
      </div>

      {showEditModal && (
        <div className="modal-overlay" onClick={handleCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Update Profile</h2>
              <button className="btn-close" onClick={handleCancel}>
                <FiX />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  id="age"
                  type="number"
                  value={editedProfile.age}
                  onChange={(e) => setEditedProfile({ ...editedProfile, age: e.target.value })}
                  placeholder="Enter your age"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  value={editedProfile.phone}
                  onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                  placeholder="Enter your phone"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-save" onClick={handleSave}>
                <FiCheck /> Save Changes
              </button>
              <button className="btn-cancel" onClick={handleCancel}>
                <FiX /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileEditor;
