import { useState } from 'react';
import { HiXMark, HiUser, HiEnvelope, HiPhone, HiMapPin } from 'react-icons/hi2';
import './EditGuestModal.css';

function EditGuestModal({ isOpen, onClose, guest, onUpdateGuest }) {
  const [formData, setFormData] = useState({
    name: guest.name,
    email: guest.email,
    phone: guest.phone || '',
    address: guest.address || ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateGuest(guest.id, formData);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Guest Details</h2>
          <button onClick={onClose} className="btn-close">
            <HiXMark />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label>
              <HiUser />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter guest name"
            />
          </div>

          <div className="form-group">
            <label>
              <HiEnvelope />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="email@example.com"
            />
          </div>

          <div className="form-group">
            <label>
              <HiPhone />
              <span>Phone Number</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div className="form-group">
            <label>
              <HiMapPin />
              <span>Address</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address (optional)"
              rows="2"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-save">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditGuestModal;
